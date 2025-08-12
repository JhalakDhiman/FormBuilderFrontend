import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { addParagraphQuestion, editParagraphQuestion } from "../../apiCalls/calls";
import { FormContext } from "../../context/FormContext";
import { RxCross2 } from "react-icons/rx";

export default function ParagraphModal({ setParagraphModal,setOpenEdit, edit }) {
    const { register, handleSubmit, setValue } = useForm();

    const { form } = useContext(FormContext)
    const [questions, setQuestions] = useState([
        { statement: "", options: [{ value: "", type: "text" }] }
    ]);

    const handleAddQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            { statement: "", options: [{ value: "", type: "text" }] }
        ]);
    };

    const handleRemoveQuestion = (qIndex) => {
        setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
    };

    const handleAddOption = (qIndex) => {
        setQuestions((prev) =>
            prev.map((q, i) =>
                i === qIndex
                    ? { ...q, options: [...q.options, { value: "", type: "text" }] }
                    : q
            )
        );
    };

    const handleRemoveOption = (qIndex, oIndex) => {
        setQuestions((prev) =>
            prev.map((q, i) =>
                i === qIndex
                    ? { ...q, options: q.options.filter((_, j) => j !== oIndex) }
                    : q
            )
        );
    };

    // Handle file upload and convert to URL
    const handleImageUpload = (e, qIndex, oIndex) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file); // temporary preview URL
            setValue(`option-${qIndex}-${oIndex}`, url); // set in form data
            setQuestions((prev) =>
                prev.map((q, i) =>
                    i === qIndex
                        ? {
                            ...q,
                            options: q.options.map((opt, j) =>
                                j === oIndex ? { ...opt, value: url } : opt
                            )
                        }
                        : q
                )
            );
        }
    };

    const handleTypeChange = (qIndex, oIndex, newType) => {
        setQuestions((prev) =>
            prev.map((q, i) =>
                i === qIndex
                    ? {
                        ...q,
                        options: q.options.map((opt, j) =>
                            j === oIndex ? { ...opt, type: newType, value: "" } : opt
                        )
                    }
                    : q
            )
        );
        setValue(`option-${qIndex}-${oIndex}`, "");
    };

    const handleFormSubmit = async (data) => {
        const finalData = {
            paragraph: data.paragraph,
            questions: questions.map((q, qIndex) => ({
                statement: data[`statement-${qIndex}`],
                options: q.options.map((_, oIndex) => data[`option-${qIndex}-${oIndex}`])
            }))
        };
        console.log("Final Data:", finalData);

        if (edit) {
            await editParagraphQuestion({ paragraph: finalData.paragraph, questions: finalData.questions, paragraphQuestionId: edit })
            setOpenEdit(false);
        }
        else {
            await addParagraphQuestion({ paragraph: finalData.paragraph, questions: finalData.questions, formId: form._id });
            setParagraphModal(false);
        }
    };


    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="flex flex-col gap-5 bg-richblack-900 rounded-lg p-3 border-[1px] border-richblack-500 ">
                <div className="px-3 bg-richblack-900 text-richblack-5 md:min-w-[400px] lg:min-w-[500px] rounded-lg shadow-lg w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Create Paragraph Question</h2>
                        <RxCross2 className="cursor-pointer" onClick={() => { 
                            if(edit){
                                setOpenEdit(false)
                                }
                                else{
                                setParagraphModal(false)
                                }
                            }} />
                    </div>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                        {/* Paragraph Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Paragraph</label>
                            <textarea
                                {...register("paragraph", { required: true })}
                                className="w-full border border-richblack-600 rounded-lg p-2 bg-richblack-800"
                                rows={4}
                                placeholder="Enter the paragraph here..."
                            />
                        </div>

                        {/* Questions */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Questions</h3>
                            {questions.map((question, qIndex) => (
                                <div key={qIndex} className="border border-richblack-600 p-4 rounded-lg mb-4 bg-gray-50">
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="font-medium">Question {qIndex + 1}</label>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveQuestion(qIndex)}
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <input
                                        {...register(`statement-${qIndex}`, { required: true })}
                                        placeholder="Enter question statement"
                                        className="w-full border border-richblack-600 rounded-lg p-2 mb-3 bg-richblack-800   "
                                    />

                                    {/* Options */}
                                    <div>
                                        {question.options.map((option, oIndex) => (
                                            <div key={oIndex} className="flex gap-2 mb-2 items-center">
                                                <select
                                                    {...register(`type-${qIndex}-${oIndex}`)}
                                                    value={option.type}
                                                    onChange={(e) =>
                                                        handleTypeChange(qIndex, oIndex, e.target.value)
                                                    }
                                                    className="border border-richblack-600 rounded p-1 bg-richblack-800"
                                                >
                                                    <option value="text">Text</option>
                                                    <option value="image">Image</option>
                                                </select>

                                                {option.type === "image" ? (
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <label className="bg-gray-200 px-3 py-1 rounded cursor-pointer">
                                                            Choose File
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleImageUpload(e, qIndex, oIndex)}
                                                                className="hidden bg-richblack-800"
                                                            />
                                                        </label>
                                                        <span className="text-sm text-gray-600 bg-richblack-800">
                                                            {option.value ? option.value.split("/").pop() : "No file chosen"}
                                                        </span>
                                                    </div>

                                                ) : (
                                                    <input
                                                        {...register(`option-${qIndex}-${oIndex}`, { required: true })}
                                                        value={option.value}
                                                        onChange={(e) =>
                                                            setQuestions((prev) =>
                                                                prev.map((q, i) =>
                                                                    i === qIndex
                                                                        ? {
                                                                            ...q,
                                                                            options: q.options.map((opt, j) =>
                                                                                j === oIndex
                                                                                    ? { ...opt, value: e.target.value }
                                                                                    : opt
                                                                            )
                                                                        }
                                                                        : q
                                                                )
                                                            )
                                                        }
                                                        placeholder="Enter text or image URL"
                                                        className="flex-1 border border-richblack-600 rounded-lg p-2 bg-richblack-800"
                                                    />
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveOption(qIndex, oIndex)}
                                                    className="text-red-500"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => handleAddOption(qIndex)}
                                            className="text-blue-500 text-sm mt-2"
                                        >
                                            + Add Option
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="text-green-500 text-sm mt-2"
                            >
                                + Add Question
                            </button>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="text-white w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-[0.99] transition-transform duration-200"
                            >
                                Save Paragraph Question
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
