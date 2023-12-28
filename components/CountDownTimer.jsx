"use client";
import { useEffect, useState } from 'react';

const CountDownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) return { days: 0,hours: 0,minutes: 0,seconds: 0};

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <section className="border w-4/5 max-sm:w-[calc(100vw-50px)] border-slate-200 py-5 px-10 max-sm:px-5 grid place-items-start max-w-[500px]">
      <p className="text-3xl w-full font-black text-center mb-5">Count Down</p>
      <div className="flex flex-row items-center justify-around w-full">
        <div className="flex flex-col w-full">
          <p className="text-5xl font-black p-1 w-full text-center max-md:text-4xl">{timeRemaining.days}</p>
          <p className="text-base text-slate-700 w-full text-center">Days</p>
        </div>
        <p className="text-4xl font-black text-slate-700 p-1 w-full text-center px-2 self-start">:</p>
        <div className="flex flex-col w-full">
          <p className="text-5xl font-black p-1 w-full text-center max-md:text-4xl">{timeRemaining.hours}</p>
          <p className="text-base text-slate-700 w-full text-center">Hours</p>
        </div>
        <p className="text-4xl font-black text-slate-700 p-1 w-full text-center px-2 self-start">:</p>
        <div className="flex flex-col w-full">
          <p className="text-5xl font-black p-1 w-full text-center max-md:text-4xl">{timeRemaining.minutes}</p>
          <p className="text-base text-slate-700 w-full text-center">Minutes</p>
        </div>
        <p className="text-4xl font-black text-slate-700 p-1 w-full text-center px-2 self-start">:</p>
        <div className="flex flex-col w-full">
          <p className="text-5xl font-black p-1 w-full text-center text-indigo-500 max-md:text-4xl">{timeRemaining.seconds}</p>
          <p className="text-base text-slate-700 w-full text-center">Seconds</p>
        </div>
      </div>
    </section>
  );
};

export default CountDownTimer;