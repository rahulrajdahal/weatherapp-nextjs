'use client';

import { pinIcon, searchIcon } from '@/assets/icons';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import Input from '../Input/Input';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [suggestions, setSuggestions] = useState({
    isOpen: false,
    suggestions: [],
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (suggestions.suggestions.length > 0) {
      setSuggestions((prev) => ({ ...prev, isOpen: true }));
    }
  }, [suggestions.suggestions.length]);

  const handleSearch = useCallback(
    async (value: string | number) => {
      if (value !== '') {
        const resp = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?types=place%2Cpostcode%2Caddress&limit=5&access_token=${process.env.NEXT_PUBLIC_MAPBOX_APIKEY}`
        );

        const data = await resp.json();
        let temp: any = [];
        data.features.map((feature: any) => {
          temp.push(feature);
        });

        setSuggestions((prev) => ({ ...prev, suggestions: temp }));
        router.push(pathname + '?' + createQueryString('q', value as string));
      }
    },
    [createQueryString, pathname, router]
  );

  const handleLocate = () => {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            router.push(
              pathname +
                '?' +
                createQueryString('q', `${latitude},${longitude}`)
            );
          });
        } else {
          alert('Allow location to enable locate.');
        }
      });
    }
  };

  const handleSuggestionOnClick = (place_name: string) => {
    router.push(pathname + '?' + createQueryString('q', place_name));
    setSuggestions((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className='flex items-center justify-between self-center rounded-[10px] border border-[#C3D0DD] bg-white p-3'>
      <div className='flex items-center gap-1'>
        <Image
          src={searchIcon}
          alt='search'
          width={24}
          height={24}
          className='h-6 w-6'
        />
        <span className='relative'>
          <Input
            type='search'
            value={searchParams.get('q') ?? ''}
            onChange={handleSearch}
            className='border-none bg-transparent outline-none'
            placeholder='Search for a location'
          />
          {suggestions.isOpen && (
            <ul className='absolute top-10 z-10 rounded-md bg-white py-2 shadow-md'>
              {suggestions.suggestions.map((suggestion: any) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionOnClick(suggestion.place_name)}
                  className='hover:bg-grey-300 whitespace-nowrap rounded-sm bg-white
                px-4 hover:cursor-pointer'
                >
                  <p>{suggestion.place_name}</p>
                </li>
              ))}
            </ul>
          )}
        </span>
      </div>

      <button
        onClick={handleLocate}
        className='flex items-center text-base font-medium leading-6 -tracking-[1.28px] text-[#4169E1] underline'
      >
        Locate{' '}
        <Image
          src={pinIcon}
          alt='search'
          width={24}
          height={24}
          className='h-6 w-6'
        />
      </button>
    </div>
  );
}
