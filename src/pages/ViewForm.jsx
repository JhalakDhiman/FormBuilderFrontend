import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryQuestionDisplay from "../components/core/CategoryQuestionDisplay";
import ClozeQuestionDisplay from "../components/core/ClozeQuestionDisplay";
import ParagraphQuestionDisplay from "../components/core/ParagraphQuestionDisplay";
import toast from "react-hot-toast";


export default function ViewForm() {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const encodedData = searchParams.get("data");
        if (encodedData) {
            try {
                const decoded = decodeURIComponent(encodedData);
                setFormData(JSON.parse(decoded));
            } catch (err) {
                console.error("Failed to decode form data:", err);
            }
        }
    }, [searchParams]);

    if (!formData) {
        return <p className="text-center mt-10 text-gray-500">Loading form...</p>;
    }

    return (
        <div className="w-full h-full bg-richblack-900 text-richblack-50">
            <div className="max-w-3xl mx-auto p-6 space-y-6 bg-richblack-800">
                {/* Form Heading */}
                <div>
                    <h1 className="text-3xl pl-10 font-bold text-blue-200">{formData.formHeading}</h1>
                    {formData.formImage && (
                        <img
                            src={formData.formImage}
                            alt="Form"
                            className="mt-4 max-h-60 w-[90%] mx-auto rounded-lg object-cover shadow-lg"
                        />
                    )}
                </div>

                {/* Category Questions */}
                {formData.categoryQuestions?.length > 0 && (
                    formData?.categoryQuestions?.map((question) => (
                        <CategoryQuestionDisplay question={question} key={question._id} />
                    ))
                )}

                {/* Cloze Questions */}
                {formData.clozeQuestions?.length > 0 && (
                    formData?.clozeQuestions?.map((question) => (
                        <ClozeQuestionDisplay question={question} key={question._id} />
                    ))
                )}

                {/* Paragraph Questions */}
                {formData.paragraphQuestions?.length > 0 && (
                    formData?.paragraphQuestions?.map((question) => (
                        <ParagraphQuestionDisplay paragraph={question} key={question._id} />
                    ))
                )}
                <div onClick={()=>{
                    toast.success("your response has been recorded")
                }}>
                    <button className="text-white w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-[0.99] transition-transform duration-200">
                        Submit
                    </button>
                </div>
            </div>

        </div>
    );
}
