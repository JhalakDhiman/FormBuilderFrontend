import React, { useState, useRef, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { FormContext } from "../../context/FormContext";
import { addClozeQuestion, editClozeQuestion } from "../../apiCalls/calls";

const ClozeModal = ({ setClozeModal,setOpenEdit, edit }) => {
  const [statementWithBlanks, setStatementWithBlanks] = useState("");
  const [options, setOptions] = useState([]);
  const contentEditableRef = useRef(null);

  const { setForm, form } = useContext(FormContext);

  const handleUnderlineToggle = () => {
    document.execCommand("underline");
    processUnderlinedWords();
  };

  const processUnderlinedWords = () => {
    const editor = contentEditableRef.current;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editor.innerHTML;

    const underlinedWords = [];
    const uTags = tempDiv.getElementsByTagName("u");

    for (let i = 0; i < uTags.length; i++) {
      // Get all words inside <u> and split on spaces
      const words = uTags[i].textContent.trim().split(/\s+/);

      words.forEach(word => {
        if (word && !underlinedWords.includes(word)) {
          underlinedWords.push(word);
        }
      });
    }

    const text = tempDiv.textContent;
    let processedStatement = text;

    underlinedWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, "g");
      processedStatement = processedStatement.replace(regex, "_____");
    });

    setOptions(underlinedWords); // Now correctly an array of strings
    setStatementWithBlanks(processedStatement);
  };


  const removeOption = (wordToRemove) => {
    const editor = contentEditableRef.current;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editor.innerHTML;

    const uTags = tempDiv.getElementsByTagName("u");
    for (let i = uTags.length - 1; i >= 0; i--) {
      if (uTags[i].textContent.trim() === wordToRemove) {
        const textNode = document.createTextNode(uTags[i].textContent);
        uTags[i].parentNode.replaceChild(textNode, uTags[i]);
      }
    }

    editor.innerHTML = tempDiv.innerHTML;
    processUnderlinedWords();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setForm((prev) => ({
      ...prev,
      clozeQuestions: [
        ...prev.clozeQuestions,
        {
          statement: statementWithBlanks,
          options: [...options],
          form: form._id
        }
      ]
    }));

    if (edit) {
      await editClozeQuestion({ statement: statementWithBlanks, options: options, clozeQuestionId: edit });
      setOpenEdit(false);
    }
    else {
      await addClozeQuestion({ statement: statementWithBlanks, options: options, form: form._id });
      setClozeModal(false);
    }
  };

  return (

    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="flex flex-col gap-5 bg-richblack-900 rounded-lg p-3 border-[1px] border-richblack-500 ">
        <div className="max-w-2xl w-full md:min-w-[400px] lg:min-w-[500px] mx-auto p-4 shadow-md rounded-lg text-richblack-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold mb-4">Create Cloze Type Question</h2>
            <div
              onClick={() => {
                if(edit){
                  setOpenEdit(false)
                }
                else{
                  setClozeModal(false)
                }
              }
              }
              className="flex justify-end text-richblack-25 text-[20px] cursor-pointer mb-4">
              <RxCross2 />
            </div>
          </div>
          <form onSubmit={handleSubmit}>

            <label className="block mb-2 font-semibold text-blue-300">
              Underline Words to Convert into Blanks
            </label>

            <div className="border border-richblack-600 p-2 rounded-lg min-h-[100px] mb-2" contentEditable ref={contentEditableRef} onInput={processUnderlinedWords}></div>
            <button
              type="button"
              className="text-white bg-gradient-to-r mt-3 from-blue-100 via-blue-300 to-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-[0.99] transition-transform duration-200"
              onClick={() => {
                handleUnderlineToggle();
              }}>
              Underline Selected Text
            </button>

            <div className="mb-4 flex flex-col gap-3 mt-5">
              <label className="block font-semibold">Converted Statement:</label>
              <p className="border border-richblack-600 p-2 rounded-lg min-h-[40px]">{statementWithBlanks}</p>
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Options:</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="bg-blue-300 text-richblack-900 px-3 py-1 rounded-lg flex items-center gap-2"
                  >
                    {option}
                    <button
                      type="button"
                      onClick={() => removeOption(option)}
                      className="text-red-500 font-bold hover:text-red-700"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="text-white w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-[0.99] transition-transform duration-200">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClozeModal;
