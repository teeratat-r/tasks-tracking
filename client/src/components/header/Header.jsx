import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Clock } from 'lucide-react'

const Header = () => {
  const [clock, setClock] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='flex justify-between w-full'>
        <div><span className='text-3xl font-bold tracking-wide text-blue-600'>Calendar Tasks Tracking</span></div>
        <div className='flex items-center gap-4 p-2 text-blue-600 tracking-wider'>
          <div className='flex gap-1 items-center justify-center'>
            <Clock color='red' />
            <span className='text-xl font-semibold'>Today:</span>
          </div>
          <span className='text-xl'>{moment(clock).format('ddd Do MMM YYYY')}</span>
          <span className='text-xl'>{moment(clock).format('LTS')}</span>
        </div>
    </div>
  )
}

export default Header