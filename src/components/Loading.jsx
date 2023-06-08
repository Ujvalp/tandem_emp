import React from 'react'
import ReactLoading from 'react-loading';

const Loading = (props) => {
  return (
    <div className={`absolute z-50 w-screen h-screen bg-gray-100/50 flex justify-center items-center ${props.class}`}>
        <ReactLoading type={"spin"} color={"blue"} />
    </div>
  )
}

export default Loading