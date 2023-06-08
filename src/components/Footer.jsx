import React from 'react'
import img from '../assets/images/crafted.svg'

const Footer = () => {
    return (
        <div className='min-w-full max-h-[300px] flex justify-center bg-[#15213A]'>
            <div className='max-w-[920px] w-full min-h-full px-8 py-20 flex flex-col items-center justify-center gap-12'>
                <img src={img} alt="" />
                <p className='text-white text-center font-semibold'>We are a new kid on the block, eager to learn.All ideas and suggestions are welcome.</p>
            </div>
        </div>
    )
}

export default Footer