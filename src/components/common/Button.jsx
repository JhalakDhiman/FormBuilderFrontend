import React from 'react'

const Button = ({text}) => {
  return (
    <div>
      <button type="button" className="text-white bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-95 transition-transform duration-200">
        {text}
      </button>
    </div>
  )
}

export default Button
