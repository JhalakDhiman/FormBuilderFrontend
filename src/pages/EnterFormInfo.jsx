import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { addForm } from "../apiCalls/calls";
import { FormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";

const EnterFormInfo = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState(null);

    const {setForm} = useContext(FormContext);
    const navigate = useNavigate();

    const submitHandler = async(data) => {
        console.log("Form Data:", data);
        const formData = new FormData();
        formData.append("formHeading", data.formHeading);
        formData.append("formImage", data.formImage[0]);

        const res = await addForm(formData);
        await setForm(res.data);
        localStorage.setItem("form", JSON.stringify(res.data));
        navigate("/create-form");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="w-screen h-screen bg-richblack-900 flex items-center justify-center">
            <div className="w-6/12 h-full mx-auto mt-10 p-6 shadow-md rounded">
                <h2 className="text-2xl text-richblack-5 font-bold mb-6">Form Builder</h2>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                    {/* Form Heading */}
                    <div>
                        <label className="block text-sm font-medium text-richblack-200 mb-1">Form Heading</label>
                        <input
                            type="text"
                            {...register("formHeading", { required: "Heading is required" })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none bg-richblack-700 text-richblack-5 focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter form heading"
                        />
                        {errors.formHeading && <p className="text-red-500 text-sm mt-1">{errors.formHeading.message}</p>}
                    </div>

                    {/* Form Image Upload */}
                    <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-richblack-200 mb-1">Form Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("formImage", { required: "Image is required" })}
                            onChange={handleImageChange}
                            className="w-full text-richblack-5"
                        />
                        {errors.formImage && <p className="text-sm text-pink-700 mt-1">{errors.formImage.message}</p>}

                        {/* Image Preview */}
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="mt-4 h-[300px] rounded border object-cover" />
                        )}
                    </div>

                    {/* Submit */}
                    <button type="submit" class="text-white bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                         Next
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EnterFormInfo;
