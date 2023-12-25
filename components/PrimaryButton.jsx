import React from 'react'

const  PrimaryButton = ({title}) => {
  return (
    <button className='bg-indigo-500 max-sm:text-sm max-sm:font-medium max-sm:px-4  rounded-full inline-flex items-center justify-center py-1.5 px-7 text-center text-base font-medium text-white hover:bg-indigo-700  disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'>
    {title}
    </button>
  )
}

export default PrimaryButton 