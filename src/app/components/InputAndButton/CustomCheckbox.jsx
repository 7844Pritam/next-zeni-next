import React from 'react'

const CustomCheckbox = () => {
  return (
    <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-0"
                  id="rememberMe"
                />
                <label
                  className="ml-2 text-sm"
                  htmlFor="rememberMe"
                >
                  Remember me
                </label>
              </div>
  )
}

export default CustomCheckbox