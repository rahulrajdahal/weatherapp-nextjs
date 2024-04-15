'use client';

import { Pin, Search } from 'meistericons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useCallback } from 'react';
import Input from '../Input/Input';
import Image from 'next/image';
import { pinIcon, searchIcon } from '@/assets/icons';

export default function Navbar() {
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
    <nav className='flex w-full flex-col items-center justify-between  gap-4 md:flex-row  md:px-[12.5%]'>
      <strong className='py-5 text-[32px] font-bold leading-[40px] -tracking-[1.28px] text-white'>
        WeatherApp
      </strong>

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

      <div></div>
    </nav>
  );
}
