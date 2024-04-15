'use client';

import { pinIcon, searchIcon } from '@/assets/icons';
import Image from 'next/image';
import React, { useCallback } from 'react';
import Input from '../Input/Input';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (value: string | number) => {
    router.push(pathname + '?' + createQueryString('q', value as string));
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

  return (
    <div className='flex items-center justify-between self-center rounded-[10px] border border-[#C3D0DD] bg-white p-3'>
      <span className='flex items-center gap-1'>
        <Image
          src={searchIcon}
          alt='search'
          width={24}
          height={24}
          className='h-6 w-6'
        />
        <Input
          type='search'
          value={searchParams.get('q') ?? ''}
          onChange={handleSearch}
          className='border-none bg-transparent outline-none'
          placeholder='Search for a location'
        />
      </span>

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
