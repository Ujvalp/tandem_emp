import React from 'react'
import { NavLink } from 'react-router-dom'

const Cat_NavSaved = ({name,cate_uid, saveCatToLocalStorage}) => {
  return (
        <NavLink onClick={()=>saveCatToLocalStorage(cate_uid)} className="block catNav py-2 px-10 text-center text-sm shadow-md rounded-full border-[1.5px] border-gray-300">{name}</NavLink>
  )
}

export default Cat_NavSaved