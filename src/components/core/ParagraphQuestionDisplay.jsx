import React, { useContext, useState } from "react";
import CommonModal from "./CommonModal";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FormContext } from "../../context/FormContext";
import { deleteParagraphQuestion } from "../../apiCalls/calls";
import ParagraphModal from "./ParagraphModal";

const ParagraphQuestionDisplay = ({ edit,paragraph}) => {
  const [answers, setAnswers] = useState({});
  const [openEdit,setOpenEdit] = useState(false)

  const {form} = useContext(FormContext)

  const handleSelect = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleDelete = async()=>{
      await deleteParagraphQuestion({formId:form._id,id:paragraph._id})
    }

  return (
    <div className="p-4 border rounded shadow">
      {/* Paragraph */}
      <h2 className="font-semibold mb-3">Paragraph</h2>
      <p className="mb-6">{paragraph.paragraph}</p>

      {/* Questions */}
      {paragraph.questions.map((q, qIndex) => (
        <div key={q._id || qIndex} className="mb-6">
          <h3 className="font-medium mb-2">
            {qIndex + 1}. {q.statement}
          </h3>

          <div className="space-y-2">
            {q.options.map((opt, oIndex) => {
              const optValue = typeof opt === "object" ? opt.url || opt.src : opt;

              return (
                <label
                  key={oIndex}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={optValue}
                    checked={answers[q._id] === optValue}
                    onChange={() => handleSelect(q._id, optValue)}
                    className="cursor-pointer"
                  />
                  <span>{optValue}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div>
        {
          edit && (
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => { setOpenEdit(true) }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => { handleDelete() }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <MdDelete />
              </button>
            </div>
          )
        }
      </div>
      {
        openEdit && <ParagraphModal edit={paragraph._id} setOpenEdit={setOpenEdit} />
      }
    </div>
  );
};

export default ParagraphQuestionDisplay;
