import React from 'react'

export const Code_Verify_2 = () => {
  return (
    <>
      <div className='flex justify-between mt-4'>
        <div className='space-y-4'>
          <h1 className='text-gray-400'>Purchase Amount</h1>
          <p className='font-medium'>₹ 2131312</p>
        </div>
        <div className='text-right space-y-4'>
          <h1 className='text-gray-400'>Discount</h1>
          <p className='font-medium'>40%    </p>
        </div>
      </div>

      <p className='text-gray-800 font-semibold text-center mt-12 mb-2'>Code :</p>
      <input type="text" name="code" id="code" className='w-full h-10 text-center text-green-600 border-2 border-gray-300 rounded-md px-2' />
    </>
  )
}
