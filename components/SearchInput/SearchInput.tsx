'use client';

import { pinIcon, searchIcon } from '@/assets/icons';
import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from '..';

type Suggestion = { id: number; name: string };

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = async (value: string | number) => {
    if (value !== '') {
      setIsOpen(true);

      const resp = await fetch(
        `https://api.weatherapi.com/v1/search.json?q=${value}&key=${process.env.NEXT_PUBLIC_WEATHER_APIKEY}`
      );

      const respJson = await resp.json();

      if (respJson.error) {
        return toast.error(respJson.error.message);
      }

      setSuggestions(
        respJson.map(
          (res: {
            id: number;
            region: string;
            name: string;
            country: string;
          }) => ({
            id: res.id,
            name: res.region
              ? `${res.name},${res.region},${res.country}`
              : `${res.name},${res.country}`,
          })
        )
      );
    }
  };

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
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <Input
              type='search'
              debounce={800}
              value={searchParams.get('q') ?? ''}
              onChangeValue={handleSearch}
              className='w-full border-none bg-transparent outline-none'
              placeholder='Search for a location'
            />
          </Popover.Trigger>

          {suggestions.length > 0 ? (
            <Popover.Portal>
              <Popover.Content
                align='start'
                alignOffset={-40}
                sideOffset={10}
                className='min-w-80 flex flex-col items-start gap-2 rounded-md bg-white py-2 shadow-md'
              >
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionOnClick(suggestion.name)}
                    className='hover:bg-grey-300 hover:cursor-pointer whitespace-nowrap
                rounded-sm border-none text-left bg-white w-full px-4 py-1 outline-none hover:bg-green-200'
                  >
                    {suggestion.name}
                  </button>
                ))}
              </Popover.Content>
            </Popover.Portal>
          ) : null}
        </Popover.Root>
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
