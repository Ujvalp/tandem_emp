import React, { useState } from 'react'

export const Code_Verify_1 = () => {

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor="text" className='text-lg font-medium'>Phone Number</label>
            <input type="text" name="code" id="code" className='h-10 w-[250px] px-2 rounded-md border-[2px] border-gray-300' />
        </div>
    )
}
