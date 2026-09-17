import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FAVORITES,
  addFavoriteEntry,
  isFavoriteMatch,
  migrateLegacyFavorites,
  normalizeCity,
  removeFavoriteEntry,
} from './useFavorites';

describe('useFavorites domain logic', () => {
  describe('DEFAULT_FAVORITES', () => {
    it('includes "Douglas, Isle of Man" by default instead of ambiguous "Douglas"', () => {
      expect(DEFAULT_FAVORITES).toContain('Douglas, Isle of Man');
      expect(DEFAULT_FAVORITES).not.toContain('Douglas');
    });
  });

  describe('migrateLegacyFavorites', () => {
    it('migrates legacy "Douglas" entries to "Douglas, Isle of Man"', () => {
      const legacy = ['Bhaktapur', 'Auckland', 'Douglas', 'Canberra'];
      const migrated = migrateLegacyFavorites(legacy);
      expect(migrated).toEqual([
        'Bhaktapur',
        'Auckland',
        'Douglas, Isle of Man',
        'Canberra',
      ]);
    });

    it('preserves already qualified or other cities untouched', () => {
      const current = ['Douglas, Isle of Man', 'Tokyo, Japan', 'London'];
      expect(migrateLegacyFavorites(current)).toEqual(current);
    });
  });

  describe('isFavoriteMatch', () => {
    const favorites = ['Bhaktapur', 'Auckland', 'Douglas, Isle of Man', 'Canberra'];

    it('matches exact favorite city names', () => {
      expect(isFavoriteMatch(favorites, 'Douglas, Isle of Man')).toBe(true);
      expect(isFavoriteMatch(favorites, 'Bhaktapur')).toBe(true);
      expect(isFavoriteMatch(favorites, 'Auckland')).toBe(true);
    });

    it('matches case-insensitively and with trimmed whitespace', () => {
      expect(isFavoriteMatch(favorites, '  douglas, isle of man  ')).toBe(true);
      expect(isFavoriteMatch(favorites, 'AUCKLAND')).toBe(true);
    });

    it('matches when city and country are passed separately', () => {
      expect(isFavoriteMatch(favorites, 'Douglas', 'Isle of Man')).toBe(true);
      expect(isFavoriteMatch(favorites, 'Douglas', 'isle of man')).toBe(true);
    });

    it('CRITICAL: NEVER matches "Douglasville" when favorite is "Douglas, Isle of Man"', () => {
      expect(isFavoriteMatch(favorites, 'Douglasville')).toBe(false);
      expect(isFavoriteMatch(favorites, 'Douglasville, USA')).toBe(false);
      expect(isFavoriteMatch(favorites, 'Douglasville', 'United States of America')).toBe(false);
    });

    it('does not match "Douglas" when country differs (e.g. Douglas, USA)', () => {
      expect(isFavoriteMatch(favorites, 'Douglas', 'United States of America')).toBe(false);
    });

    it('returns false for undefined or empty input', () => {
      expect(isFavoriteMatch(favorites, undefined)).toBe(false);
      expect(isFavoriteMatch(favorites, null)).toBe(false);
      expect(isFavoriteMatch(favorites, '')).toBe(false);
    });
  });

  describe('addFavoriteEntry', () => {
    const initial = ['Auckland', 'Canberra'];

    it('adds a new city with country when specified', () => {
      const result = addFavoriteEntry(initial, 'Douglas', 'Isle of Man');
      expect(result).toContain('Douglas, Isle of Man');
      expect(result).toHaveLength(3);
    });

    it('prevents adding duplicates', () => {
      const result1 = addFavoriteEntry(initial, 'Auckland');
      expect(result1).toEqual(initial);

      const withDouglas = ['Douglas, Isle of Man'];
      const result2 = addFavoriteEntry(withDouglas, 'Douglas', 'Isle of Man');
      expect(result2).toEqual(withDouglas);
    });

    it('ignores empty or whitespace-only additions', () => {
      expect(addFavoriteEntry(initial, '   ')).toEqual(initial);
    });
  });

  describe('removeFavoriteEntry', () => {
    const list = ['Bhaktapur', 'Douglas, Isle of Man', 'Canberra'];

    it('removes matching city by full string', () => {
      const updated = removeFavoriteEntry(list, 'Douglas, Isle of Man');
      expect(updated).not.toContain('Douglas, Isle of Man');
      expect(updated).toHaveLength(2);
    });

    it('removes matching city case-insensitively', () => {
      const updated = removeFavoriteEntry(list, 'bhaktapur');
      expect(updated).not.toContain('Bhaktapur');
      expect(updated).toHaveLength(2);
    });

    it('CRITICAL: removing "Douglasville" does NOT remove "Douglas, Isle of Man"', () => {
      const updated = removeFavoriteEntry(list, 'Douglasville');
      expect(updated).toContain('Douglas, Isle of Man');
      expect(updated).toEqual(list);
    });

    it('does not remove city when city names match but countries differ', () => {
      const listWithLondon = ['London, UK'];
      const updated = removeFavoriteEntry(listWithLondon, 'London, Canada');
      expect(updated).toEqual(['London, UK']);
    });

    it('removes qualified favorite when unqualified base name is supplied', () => {
      const listWithLondon = ['London, UK'];
      const updated = removeFavoriteEntry(listWithLondon, 'London');
      expect(updated).toEqual([]);
    });
  });
});
