import React from 'react'
import ClozeModal from './ClozeModal'
import ParagraphModal from './ParagraphModal'
import CategorizeModal from './CategorizeModal'

const CommonModal = ({questionType,setQuestionType,edit}) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="flex flex-col gap-5 bg-richblack-900 rounded-lg p-3 border-[1px] border-richblack-500 ">
            
        </div>
    </div>
  )
}

export default CommonModal
