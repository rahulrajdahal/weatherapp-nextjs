'use client';

import React, { useMemo, useState } from 'react';

type TempType = 'C' | 'F';

interface ITemperatureDisplay {
  tempC: number;
  tempF: number;
}
export default function TemperatureDisplay({
  tempC,
  tempF,
}: ITemperatureDisplay) {
  const [type, setType] = useState<TempType>('C');

  const temp = useMemo(() => {
    if (type === 'F') return tempF;

    return tempC;
  }, [tempC, tempF, type]);

  return (
    <h1>
      {temp}°
      <sup className={` align-super text-xl`}>
        <span
          className={`${type === 'C' ? 'text-gray-700' : 'text-gray-400'}`}
          role='button'
          onClick={() => setType('C')}
        >
          C
        </span>
        |
        <span
          role='button'
          className={`${type === 'F' ? 'text-gray-700' : 'text-gray-400'}`}
          onClick={() => setType('F')}
        >
          F
        </span>
      </sup>
    </h1>
  );
}
