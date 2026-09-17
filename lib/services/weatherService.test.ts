import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { weatherService } from './weatherService';

describe('weatherService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('API Key handling', () => {
    it('throws an error if no API key is defined in environment', async () => {
      delete process.env.WEATHER_API_KEY;

      await expect(weatherService.getForecast('Kathmandu')).rejects.toThrow(
        /Weather API key is not configured/
      );
    });

    it('uses WEATHER_API_KEY when present', async () => {
      process.env.WEATHER_API_KEY = 'test-secret-key';
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          location: { name: 'Kathmandu', country: 'Nepal' },
          current: { temp_c: 20, last_updated_epoch: 1000 },
          forecast: { forecastday: [] },
        }),
      });
      global.fetch = mockFetch;

      await weatherService.getForecast('Kathmandu');
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('key=test-secret-key'),
        expect.any(Object)
      );
    });
  });

  describe('getForecast', () => {
    beforeEach(() => {
      process.env.WEATHER_API_KEY = 'valid-key';
    });

    it('does not retry 4xx client errors', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({
          error: { message: 'No matching location found.' },
        }),
      });
      global.fetch = mockFetch;

      await expect(weatherService.getForecast('InvalidCityXYZ')).rejects.toThrow(
        'No matching location found.'
      );
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('retries transient 5xx errors and succeeds if next attempt is ok', async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          json: async () => ({}),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({
            location: { name: 'Kathmandu' },
            current: { temp_c: 20, last_updated_epoch: 1000 },
            forecast: { forecastday: [] },
          }),
        });
      global.fetch = mockFetch;

      const data = await weatherService.getForecast('Kathmandu');
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(data.currentLocation.name).toBe('Kathmandu');
    });

    it('throws error when API returns an error response', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({
          error: { message: 'No matching location found.' },
        }),
      });

      await expect(weatherService.getForecast('InvalidCityXYZ')).rejects.toThrow(
        'No matching location found.'
      );
    });

    it('parses weather forecast, rolling 24h hours, daily forecast, astronomy, and alerts', async () => {
      const mockApiResponse = {
        location: {
          name: 'Douglas',
          region: 'Douglas',
          country: 'Isle of Man',
          lat: 54.15,
          lon: -4.48,
          tz_id: 'Europe/Isle_of_Man',
          localtime: '2026-09-17 12:00',
          localtime_epoch: 1726574400,
        },
        current: {
          last_updated: '2026-09-17 12:00',
          last_updated_epoch: 1726574400,
          temp_c: 18,
          temp_f: 64.4,
          humidity: 72,
          wind_kph: 15,
          condition: { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/116.png' },
          air_quality: { 'us-epa-index': 1 },
        },
        forecast: {
          forecastday: [
            {
              date: '2026-09-17',
              date_epoch: 1726531200,
              day: {
                maxtemp_c: 20,
                mintemp_c: 12,
                condition: { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/116.png' },
              },
              astro: {
                sunrise: '06:50 AM',
                sunset: '07:20 PM',
                moon_phase: 'First Quarter',
              },
              hour: [
                {
                  time: '2026-09-17 11:00',
                  time_epoch: 1726570800,
                  temp_c: 17,
                  condition: { text: 'Partly cloudy' },
                },
                {
                  time: '2026-09-17 12:00',
                  time_epoch: 1726574400,
                  temp_c: 18,
                  condition: { text: 'Partly cloudy' },
                },
                {
                  time: '2026-09-17 13:00',
                  time_epoch: 1726578000,
                  temp_c: 19,
                  condition: { text: 'Sunny' },
                },
              ],
            },
          ],
        },
        alerts: {
          alert: [
            {
              headline: 'High Wind Warning',
              severity: 'Moderate',
              event: 'Wind Advisory',
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      });

      const result = await weatherService.getForecast('Douglas, Isle of Man');

      expect(result.currentLocation.name).toBe('Douglas');
      expect(result.currentLocation.country).toBe('Isle of Man');
      expect(result.currentForecast.temp_c).toBe(18);
      expect(result.forecast.length).toBeGreaterThan(0);
      expect(result.dailyForecast.length).toBe(1);
      expect(result.astronomy?.sunrise).toBe('06:50 AM');
      expect(result.alerts?.length).toBe(1);
      expect(result.alerts?.[0].headline).toBe('High Wind Warning');
    });
  });


  describe('searchLocations', () => {
    beforeEach(() => {
      process.env.WEATHER_API_KEY = 'valid-key';
    });

    it('formats location suggestions with region and country', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            id: 1,
            name: 'Douglas',
            region: 'Douglas',
            country: 'Isle of Man',
            lat: 54.15,
            lon: -4.48,
          },
          {
            id: 2,
            name: 'Douglasville',
            region: 'Georgia',
            country: 'United States of America',
            lat: 33.75,
            lon: -84.74,
          },
        ],
      });

      const suggestions = await weatherService.searchLocations('Douglas');
      expect(suggestions).toHaveLength(2);
      expect(suggestions[0].name).toBe('Douglas, Douglas, Isle of Man');
      expect(suggestions[1].name).toBe('Douglasville, Georgia, United States of America');
    });

    it('returns empty array when response is not an array', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ unexpected: true }),
      });

      const suggestions = await weatherService.searchLocations('Test');
      expect(suggestions).toEqual([]);
    });

    it('formats location suggestions when region is omitted', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            id: 3,
            name: 'Singapore',
            country: 'Singapore',
            lat: 1.29,
            lon: 103.85,
          },
        ],
      });

      const suggestions = await weatherService.searchLocations('Singapore');
      expect(suggestions).toHaveLength(1);
      expect(suggestions[0].name).toBe('Singapore, Singapore');
    });

    it('throws fallback error when search request fails without error message', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        json: async () => ({}),
      });

      await expect(weatherService.searchLocations('BadGateway')).rejects.toThrow(
        'Failed to search location (HTTP 502)'
      );
    });
  });
});
