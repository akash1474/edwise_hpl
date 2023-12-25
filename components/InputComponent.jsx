const InputComponent = ({label}) => {
  return (
    <div className="w-[550px] max-xl:w-[400px] max-2xl:w-[450px] max-lg:w-full">
      <label className='mb-1 block  text-base font-medium text-dark'>
        {label}
      </label>
      <input
        type='text'
        // placeholder='Default Input'
        className='w-full bg-transparent rounded-md border border-stroke dark:border-slate-300 py-[10px] px-5 text-dark-6 outline-none transition focus:border-indigo-500 focus:border-2 active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
      />
    </div>
  )
}

export default InputComponent;