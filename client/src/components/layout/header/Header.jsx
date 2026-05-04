import React, { useEffect, useState } from 'react'
import moment from 'moment';

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
        <div><span className='text-3xl font-bold tracking-wide text-blue-600'>Tasks Tracking</span></div>
        <div className='flex items-center gap-4 p-2 text-gray-600 tracking-wider'>
          <span className='text-xl'>{moment(clock).format('ddd Do MMM YYYY')}</span>
          <span className='text-xl'>{moment(clock).format('HH:mm:ss')}</span>
        </div>
    </div>
  )
}

export default Header