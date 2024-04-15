'use client';

import { pinIcon, searchIcon } from '@/assets/icons';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../Input/Input';

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

  const handleSearch = useCallback(
    async (value: string | number) => {
      if (value !== '') {
        const resp = await fetch(
          `https://api.weatherapi.com/v1/search.json?q=${value}&key=${process.env.NEXT_PUBLIC_WEATHER_APIKEY}`
        );

        const respJson = await resp.json();

        if (respJson.error) {
          return toast.error(respJson.error.message);
        }

        setSuggestions((prev) => ({
          isOpen: true,
          suggestions: respJson.map(
            (res: {
              id: number;
              region: string;
              name: string;
              country: string;
              url: string;
            }) => ({
              id: res.id,
              name: res.region
                ? `${res.name},${res.region},${res.country}`
                : `${res.name},${res.country}`,
              url: res.url,
            })
          ),
        }));
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

  const handleSuggestionOnClick = (name: string) => {
    router.push(pathname + '?' + createQueryString('q', name));
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
            debounce={800}
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
                  onClick={() => handleSuggestionOnClick(suggestion.url)}
                  className='hover:bg-grey-300 whitespace-nowrap rounded-sm bg-white
                px-4 hover:cursor-pointer'
                >
                  <p>{suggestion.name}</p>
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
