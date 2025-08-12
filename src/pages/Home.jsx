import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import { TypeAnimation } from 'react-type-animation'

const Home = () => {
  return (
    <div className='w-screen h-screen bg-richblack-900 flex flex-col gap-10 justify-center items-center'>
      <div className='text-blue-200 italic font-semibold text-[20px] md:text-[30px] lg:text-[30px]'>
        <TypeAnimation
          sequence={["Hello let's build your form together", 1000, ""]}
          repeat={Infinity}
          cursor={true}
          style={
            {
              whiteSpace: "pre-line",
              display: "block",
            }
          }
          omitDeletionAnimation={true}
        ></TypeAnimation>
      </div>
      <Link to='/enter-form-info'>
          <Button text="Create Form" />
      </Link>
    </div>
  )
}

export default Home
