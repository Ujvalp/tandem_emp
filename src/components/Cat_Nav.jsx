import React from 'react'
import { NavLink } from 'react-router-dom'

const Cat_Nav = ({catName, path,fetchSubCatData,catId}) => {
  return (
        <NavLink  onClick={()=>fetchSubCatData(path)} to={`/products/${catId}/${path}`} className="block catNav py-2 px-10 text-center text-sm shadow-md rounded-full border-[1.5px] border-gray-300">{catName}</NavLink>
  )
}

export default Cat_Nav