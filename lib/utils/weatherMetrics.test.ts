import { describe, expect, it } from 'vitest';
import { getAqiCategory, getUvCategory } from './weatherMetrics';

describe('weatherMetrics utilities', () => {
  describe('getAqiCategory', () => {
    it('returns Good for EPA index 1', () => {
      const res = getAqiCategory(1);
      expect(res.label).toBe('Good');
      expect(res.color).toBe('#15803d');
      expect(res.bgColor).toBe('#dcfce7');
      expect(res.description).toContain('satisfactory');
    });

    it('returns Moderate for EPA index 2', () => {
      const res = getAqiCategory(2);
      expect(res.label).toBe('Moderate');
      expect(res.color).toBe('#ca8a04');
    });

    it('returns Unhealthy for Sensitive Groups for EPA index 3', () => {
      const res = getAqiCategory(3);
      expect(res.label).toBe('Unhealthy for Sensitive Groups');
      expect(res.color).toBe('#d97706');
    });

    it('returns Unhealthy for EPA index 4', () => {
      const res = getAqiCategory(4);
      expect(res.label).toBe('Unhealthy');
      expect(res.color).toBe('#dc2626');
    });

    it('returns Very Unhealthy for EPA index 5', () => {
      const res = getAqiCategory(5);
      expect(res.label).toBe('Very Unhealthy');
      expect(res.color).toBe('#7c3aed');
    });

    it('returns Hazardous for EPA index 6', () => {
      const res = getAqiCategory(6);
      expect(res.label).toBe('Hazardous');
      expect(res.color).toBe('#831843');
    });

    it('returns default fallback for undefined or unknown index', () => {
      const res = getAqiCategory();
      expect(res.label).toBe('Moderate');
      expect(res.color).toBe('#4b5563');

      const resUnknown = getAqiCategory(99);
      expect(resUnknown.label).toBe('Moderate');
    });
  });

  describe('getUvCategory', () => {
    it('returns Low for UV index <= 2', () => {
      const res0 = getUvCategory(0);
      expect(res0.label).toBe('Low');
      expect(res0.color).toBe('#16a34a');
      expect(res0.textColor).toBe('#ffffff');

      const res2 = getUvCategory(2);
      expect(res2.label).toBe('Low');
      expect(res2.textColor).toBe('#ffffff');
    });

    it('returns Moderate for UV index between 3 and 5', () => {
      const res3 = getUvCategory(3);
      expect(res3.label).toBe('Moderate');
      expect(res3.color).toBe('#eab308');
      expect(res3.textColor).toBe('#0f172a');

      const res5 = getUvCategory(5);
      expect(res5.label).toBe('Moderate');
      expect(res5.textColor).toBe('#0f172a');
    });

    it('returns High for UV index between 6 and 7', () => {
      const res6 = getUvCategory(6);
      expect(res6.label).toBe('High');
      expect(res6.color).toBe('#ea580c');
      expect(res6.textColor).toBe('#ffffff');

      const res7 = getUvCategory(7);
      expect(res7.label).toBe('High');
      expect(res7.textColor).toBe('#ffffff');
    });

    it('returns Very High for UV index between 8 and 10', () => {
      const res8 = getUvCategory(8);
      expect(res8.label).toBe('Very High');
      expect(res8.color).toBe('#dc2626');
      expect(res8.textColor).toBe('#ffffff');

      const res10 = getUvCategory(10);
      expect(res10.label).toBe('Very High');
      expect(res10.textColor).toBe('#ffffff');
    });

    it('returns Extreme for UV index > 10', () => {
      const res11 = getUvCategory(11);
      expect(res11.label).toBe('Extreme');
      expect(res11.color).toBe('#7c3aed');
      expect(res11.textColor).toBe('#ffffff');
      expect(res11.advice).toContain('precautions');
    });

    it('defaults undefined to Low', () => {
      const res = getUvCategory(undefined);
      expect(res.label).toBe('Low');
      expect(res.color).toBe('#16a34a');
      expect(res.textColor).toBe('#ffffff');
    });
  });
});
