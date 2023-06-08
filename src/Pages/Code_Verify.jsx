import React, { useState } from 'react'
import { Code_Verify_1 } from '../components/Code_Verify_1'
import { Code_Verify_2 } from '../components/Code_Verify_2'

const Code_Verify = () => {

    const [page, setPage] = useState(0)

    const FormTitles = ["Code Verification", "Purchase Details"]

    const PageDisplay = () => {
        if (page === 0) {
            return <Code_Verify_1 />
        } else if (page === 1) {
            return <Code_Verify_2 />
        }
    }

    return (
        <div className='min-w-full min-h-[calc(100vh-80px)] flex justify-center'>
            <div className='max-w-[1180px] w-full min-h-full px-8 py-5 flex flex-col gap-5'>
                <section className='flex justify-between'>
                    <h1 className='text-xl font-medium ml-8 text-gray-500'>Store Name : Hello World  </h1>
                    <h1 className='text-xl font-medium ml-8 text-gray-500'>Total Sales : $ 250000  </h1>
                </section>

                <section className='flex w-full h-full justify-center items-center'>
                    <div className='form w-fit h-fit rounded-lg py-20 px-16 border-2 border-gray-300'>
                        <div className='container space-y-12'>
                            <div className="header text-center">
                                <h1 className='text-lg font-medium text-gray-500'>{FormTitles[page]}</h1>
                            </div>
                            <div className="body">{PageDisplay()}</div>
                            <div className="footer space-x-2 w-full flex justify-center ">
                                <button
                                    type='button'
                                    hidden={page == 0}
                                    onClick={() => { setPage((currPage) => currPage - 1) }}
                                    className=' py-2 w-[150px]  font-semibold border-2 border-black hover:border-gray-400'
                                >
                                    Prev
                                </button>
                                {
                                    page == 1 ?
                                        <button
                                            type="submit"
                                            className='bg-black py-2 w-[150px] text-white font-semibold border-2 border-black hover:border-gray-400'
                                        >
                                            Submit
                                        </button>
                                        :
                                        <button
                                            type="button"
                                            onClick={() => { setPage((currPage) => currPage + 1) }}
                                            className='bg-black py-2 w-[150px] text-white font-semibold border-2 border-black hover:border-gray-400'
                                        >
                                            Next
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Code_Verify