'use client';

/**
 * Props for the FavoritesBar component.
 */
export interface FavoritesBarProps {
  /** Array of bookmarked city names */
  favorites: string[];
  /** Currently active/displayed city name */
  activeCity?: string;
  /** Callback fired when a bookmark chip is clicked */
  onSelectCity: (city: string) => void;
  /** Callback fired when the remove ('x') button on a chip is clicked */
  onRemoveFavorite: (city: string) => void;
  /** Callback fired when the 'Compare Cities' button is clicked */
  onOpenCompare: () => void;
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * FavoritesBar renders a horizontal scrollable row of saved bookmark pills
 * with active city highlighting, instant navigation, removal, and a multi-city compare trigger.
 */
export default function FavoritesBar({
  favorites,
  activeCity,
  onSelectCity,
  onRemoveFavorite,
  onOpenCompare,
  className = '',
}: FavoritesBarProps) {
  if (favorites.length === 0) return null;

  return (
    <div className={`flex items-center justify-between gap-2 sm:gap-3 py-1.5 sm:py-2 w-full ${className}`}>
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0 py-0.5">
        <span className="text-xs font-bold text-white/90 whitespace-nowrap flex items-center gap-1 drop-shadow-xs flex-shrink-0">
          <span>⭐</span> Bookmarks:
        </span>

        {favorites.map((city) => {
          const normalize = (s: string) => s.toLowerCase().trim();
          const activeNorm = normalize(activeCity || '');
          const cityNorm = normalize(city);
          const activeBase = activeNorm.split(',')[0].trim();
          const cityBase = cityNorm.split(',')[0].trim();

          const isActive = Boolean(
            activeCity &&
              (activeNorm === cityNorm ||
                (activeBase === cityBase &&
                  (!activeNorm.includes(',') ||
                    !cityNorm.includes(',') ||
                    activeNorm.includes(cityNorm) ||
                    cityNorm.includes(activeNorm))))
          );

          return (
            <div
              key={city}
              className={`group inline-flex items-center gap-1.5 rounded-full pl-3 pr-2 py-1 text-xs font-medium transition-all backdrop-blur-md whitespace-nowrap shadow-2xs border select-none flex-shrink-0 ${
                isActive
                  ? 'bg-white text-slate-900 font-bold shadow-xs border-white ring-2 ring-white/60'
                  : 'bg-white/20 hover:bg-white/30 text-white border-white/25'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectCity(city)}
                className={`cursor-pointer text-left rounded-md transition-all focus-visible:ring-2 focus-visible:outline-hidden ${
                  isActive ? 'focus-visible:ring-blue-600' : 'focus-visible:ring-white'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {city}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(city);
                }}
                className={`transition-colors p-0.5 rounded-full hover:bg-red-500 hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-hidden ${
                  isActive ? 'text-slate-400' : 'text-white/70'
                }`}
                title={`Remove ${city} from bookmarks`}
                aria-label={`Remove ${city} from bookmarks`}
              >
                <span className="block leading-none text-xs w-3.5 h-3.5 text-center font-bold">
                  ×
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onOpenCompare}
        className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/25 hover:bg-white/40 text-white px-2.5 sm:px-3.5 py-1 text-xs font-bold backdrop-blur-md transition-all shadow-2xs whitespace-nowrap cursor-pointer border border-white/30 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden flex-shrink-0"
        aria-label="Compare cities"
      >
        <span>⚖️</span>
        <span className="hidden sm:inline">Compare Cities</span>
        <span className="inline sm:hidden">Compare</span>
      </button>
    </div>
  );
}
