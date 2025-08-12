import { useContext, useEffect, useState } from 'react'
import { FormContext } from '../context/FormContext';
import ClozeQuestionDisplay from '../components/core/ClozeQuestionDisplay';
import { getFormData } from '../apiCalls/calls';
import ParagraphQuestionDisplay from '../components/core/ParagraphQuestionDisplay';
import CategoryQuestionDisplay from '../components/core/CategoryQuestionDisplay';
import LinkModal from '../components/core/LinkModal';
import { FaChevronDown } from "react-icons/fa";
import { UserContext } from '../context/UserContext';
import ClozeModal from '../components/core/ClozeModal';
import CategorizeModal from '../components/core/CategorizeModal';
import ParagraphModal from '../components/core/ParagraphModal';

const CreateForm = () => {

  const [questionType, setQuestionType] = useState("");
  const [formData, setFormData] = useState();
  const { form } = useContext(FormContext);
  const [linkModal, setLinkModal] = useState(false);
  const [addedQuestion, setAddedQuestion] = useState(false);
  const {user} = useContext(UserContext)

  const [clozeModal,setClozeModal] = useState(false);
  const [paragraphModal,setParagraphModal] = useState(false);
  const [categoryModal,setCategoryModal] = useState(false);

  const fetchFormData = async () => {
    const res = await getFormData(form?._id);
    setFormData(res);
  }

  const changeHandler = (val)=>{
    if(val==="cloze"){
      setClozeModal(true)
      setParagraphModal(false);
      setCategoryModal(false);
    }
    else if(val==="categorize"){
      setCategoryModal(true)
      setClozeModal(false)
      setParagraphModal(false);
    }
    else if(val==="paragraph"){
      setParagraphModal(true)
      setCategoryModal(false)
      setClozeModal(false)
    }
  }

  useEffect(() => {
    fetchFormData();
  }, [])

  return (
    <div className='w-full h-full min-w-screen min-h-screen bg-richblack-900 flex flex-col gap-6 items-center justify-center'>

      <div className='w-full max-w-3xl flex flex-col gap-3 p-6 rounded-lg shadow-lg'>
        <h1 className='text-richblack-5 text-2xl font-bold mb-6'>You Can Add Questions For The Form Here : </h1>

        <div className='bg-richblack-800 border border-richblack-600 rounded-lg m-2 mx-4 p-2 text-richblack-50 flex flex-col gap-3'>
          <p className=' text-blue-200 '>Instructions for adding questions : </p>
          <ul className='list-decimal pl-6 space-y-2 font-semibold text-[13px]'>
            <li>Select the desired question type: <strong>Cloze</strong>, <strong>Paragraph</strong>, or <strong>Category</strong>.</li>
            <li>Fill in all required fields for the selected question type:
              <ul className='list-decimal pl-6'>
                <li><strong>Cloze:</strong> Provide a statement with blanks and at least 2 options for each blank.</li>
                <li><strong>Paragraph:</strong> Enter the paragraph text, then add at least one question with multiple options (text or images).</li>
                <li><strong>Category:</strong> Add a heading, define categories, and assign items to each category.</li>
              </ul>
            </li>
            <li>Use the <strong>Edit</strong> button to modify any existing question without deleting it.</li>
            <li>Use the <strong>Delete</strong> button to permanently remove a question from the form.</li>
            <li>Ensure all options are correct before saving — deleted questions cannot be recovered.</li>
            <li>Refresh the page to see the new added question</li>
            <li>Click <strong>Save</strong> after adding or editing to apply changes to the form.</li>
          </ul>
        </div>

        <div className='flex items-center text-blue-200 justify-between my-4'>
          <label className='font-semibold'>Select The Type Of Question You Want To Add : </label>
          <select
            className='p-2 rounded-lg bg-richblack-800 text-white cursor-pointer'
            value={questionType}
            onChange={(e) => changeHandler(e.target.value)}
          >
            <option value="">Select Question Type</option>
            <option value="categorize">Categorize</option>
            <option value="cloze">Cloze</option>
            <option value="paragraph">Paragraph</option>
          </select>
        </div>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-[0.99] transition-transform duration-200"
          onClick={() => {
            setLinkModal(true)
          }}>
          Create Form
        </button>


        <div className='flex justify-between items-center mt-5 mb-16'>
          <p className='text-blue-200 font-semibold'>You Can View The Questions For Editing And Deleting</p>
          <button
            type="button"
            className="text-white w-[200px] flex gap-1 items-center bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-[0.97] transition-transform duration-200"
            onClick={() => {
              setAddedQuestion(!(addedQuestion))
            }}>
            {
              !addedQuestion?(<span>Show</span>):(<span>Hide</span>)
            }
             {" "}Questions{" "}<span className={`ml-2 ${addedQuestion?"rotate-180":""} transition-all duration-400`}><FaChevronDown/></span> 
          </button>
        </div>

        {
          addedQuestion && (
            <>
              <div className='text-blue-300 italic'>Please refresh once</div>
              <div>
                {
                  formData?.clozeQuestions?.length > 0 && <div>
                    <h1 className='text-white text-2xl mb-4'>Cloze Questions:</h1>
                    <ul className='list-decimal pl-5'>
                      {formData.clozeQuestions.map((question, index) => (
                        <li key={index} className='text-richblack-200 mb-2'>
                          <ClozeQuestionDisplay question={question} edit={question._id}/>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>

              <div>
                {
                  formData?.paragraphQuestions?.length > 0 && <div>
                    <h1 className='text-white text-2xl mb-4'>Paragraph Questions:</h1>
                    <ul className='list-decimal pl-5'>
                      {formData.paragraphQuestions.map((paragraph, index) => (
                        <li key={index} className='text-richblack-200 mb-2'>
                          <ParagraphQuestionDisplay paragraph={paragraph} edit={paragraph._id}/>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>

              <div>
                {
                  formData?.categoryQuestions?.length > 0 && <div>
                    <h1 className='text-white text-2xl mb-4'>Category Questions:</h1>
                    <ul className='list-decimal pl-5'>
                      {formData.categoryQuestions.map((question, index) => (
                        <li key={index} className='text-richblack-200 mb-2'>
                          <CategoryQuestionDisplay question={question} edit={question._id}/>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>
            </>
          )
        }

        <div>
          {
            clozeModal && <ClozeModal setClozeModal={setClozeModal} />
          }
        </div>
        <div>
          {
            categoryModal && <CategorizeModal setCategoryModal={setCategoryModal} />
          }
        </div>
        <div>
          {
            paragraphModal && <ParagraphModal setParagraphModal={setParagraphModal} />
          }
        </div>
        <div>
          {
            linkModal && <LinkModal setLinkModal={setLinkModal} data={formData} />
          }
        </div>
      </div>
    </div>
  )
}

export default CreateForm
