import React, { useState } from 'react'

const CheckBox = ({label,title,name}) => {

  return (
    <div className="group flex flex-col w-[550px] max-xl:w-[400px] max-2xl:w-[450px] max-lg:w-full cursor-pointer">
      <label className='mb-1 block text-base font-medium text-dark'>
        {title}
      </label>
      <div className="flex items-center px-5 py-3 w-full border border-gray-200 rounded-md">
        <input id="default-checkbox" name={name} type="checkbox" value="reserve" className="peer w-5 h-5 text-black  rounded bg-gray-700 border-gray-600"/>
        <label htmlFor="default-checkbox" className="ms-2 text-base font-medium text-gray-900 peer-checked:font-bold">{label}</label>
      </div>
    </div>
  )
}

export default CheckBox 