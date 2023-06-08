import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Category_Items = ({data}) => {
const navigate = useNavigate();

    return (
        <Link to={`/products/${data.cate_name}/${data.cate_uid}`}  className='flex flex-col items-center gap-4 shadow-md rounded-lg cursor-pointer font-medium py-2'>
            <div className='w-[100px] h-[100px] rounded-full overflow-hidden border flex justify-center items-center'>
                <img src={data.cate_img}alt="img" className='duration-200 hover:scale-125' />
            </div>

            <p>{data.cate_name}</p>
        </Link>
    )
}

export default Category_Items