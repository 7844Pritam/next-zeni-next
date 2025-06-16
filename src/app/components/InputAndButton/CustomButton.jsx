import React from 'react'

const CustomButton = ({type,disabled,text}) => {
  return (
    <button
    type={type}
    disabled={disabled}
    
    className="w-full py-2 text-white transition-all duration-300 ease-in-out rounded-lg bg-teal-500 hover:bg-orange-500"
  >
    {text}
  </button>  )
}

export default CustomButton