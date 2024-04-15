import { Pin, Search } from 'meistericons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useCallback } from 'react';
import Input from '../Input/Input';
import Image from 'next/image';
import { pinIcon, searchIcon } from '@/assets/icons';
import SearchInput from '../SearchInput/SearchInput';

export default function Navbar() {
  return (
    <nav className='flex w-full flex-col items-center justify-between  gap-4 md:flex-row  md:px-[12.5%]'>
      <a
        href='/'
        className='py-5 text-[32px] font-bold leading-[40px] -tracking-[1.28px] text-white'
      >
        WeatherApp
      </a>

      <SearchInput />

      <div></div>
    </nav>
  );
}
