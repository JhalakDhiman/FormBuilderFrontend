import React, { useContext, useState } from "react";
import { addCategoryQuestion, editCategoryQuestion } from "../../apiCalls/calls";
import { FormContext } from "../../context/FormContext";
import { RxCross2 } from "react-icons/rx";

export default function CategorizeModal({ setCategoryModal,setOpenEdit, edit }) {
  const [heading, setHeading] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const { form } = useContext(FormContext);

  // Add new category
  const addCategory = () => {
    setCategories([...categories, { id: Date.now(), name: "" }]);
  };

  // Update category name
  const updateCategoryName = (id, name) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, name } : cat));
  };

  // Remove category + related items
  const removeCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setItems(items.filter(item => item.categoryId !== id));
  };

  // Add new item
  const addItem = () => {
    setItems([...items, { id: Date.now(), name: "", categoryId: "" }]);
  };

  // Update item name
  const updateItemName = (id, name) => {
    setItems(items.map(item => item.id === id ? { ...item, name } : item));
  };

  // Change item category
  const updateItemCategory = (id, categoryId) => {
    setItems(items.map(item => item.id === id ? { ...item, categoryId } : item));
  };

  // Remove item
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Save final data
  const handleSave = async () => {
    let data = {
      heading,
      categories,
      items,
      formId: form._id
    };
    console.log("Final Data:", data);

    if (edit) {
      data = {
        ...data,
        categoryQuestionId: edit
      }

      await editCategoryQuestion(data)
      setOpenEdit(false);
    }
    else {
      await addCategoryQuestion(data);
      setCategoryModal(false);
    }
  };

  return (

    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="flex flex-col gap-5 bg-richblack-900 rounded-lg p-3 border-[1px] border-richblack-500 ">
        <div className="bg-gray-900 text-richblack-5 p-2 w-full max-w-2xl md:min-w-[400px] lg:min-w-[500px] mx-auto rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create Categorize Question</h2>

            <RxCross2 className="cursor-pointer" onClick={() => {
              if(edit){
                  setOpenEdit(false)
                }
                else{
                  setCategoryModal(false)
                }
            }} />

          </div>

          {/* Heading */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-300">Question Heading:</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-richblack-600 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Categories</h3>
            {categories.map((cat) => (
              <div key={cat.id} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={cat.name}
                  placeholder="Category name"
                  onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md bg-richblack-700 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeCategory(cat.id)}
                  className="px-3 py-2 bg-red-600 text-gray-200 rounded-md hover:bg-red-700"
                >
                  <RxCross2 />
                </button>
              </div>
            ))}
            <button
              onClick={addCategory}
              className="text-white bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-95 transition-transform duration-200"
            >
              + Add Category
            </button>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Items</h3>
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-2 mb-4">
                <input
                  type="text"
                  value={item.name}
                  placeholder="Item name"
                  onChange={(e) => updateItemName(item.id, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md bg-richblack-700 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={item.categoryId}
                  onChange={(e) => updateItemCategory(item.id, e.target.value)}
                  className="px-3 py-2 rounded-md bg-richblack-700 text-richblack-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Category</option>
                  {categories.map(cat => (
                    <option className="text-richblack-100" key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <div
                  onClick={() => removeItem(item.id)}
                  className="px-3 py-2 bg-red-600 text-gray-200 rounded-md hover:bg-red-700"
                >
                  <RxCross2 />
                </div>
              </div>
            ))}
            <button
              onClick={addItem}
              className="text-white bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-95 transition-transform duration-200"
            >
              + Add Item
            </button>
          </div>

          {/* Save */}
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="text-white w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-50 dark:focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:scale-[0.99] transition-transform duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
