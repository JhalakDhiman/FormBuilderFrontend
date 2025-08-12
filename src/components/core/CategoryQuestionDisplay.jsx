import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FormContext } from "../../context/FormContext";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteCategoryQuestion } from "../../apiCalls/calls";
import CategorizeModal from "./CategorizeModal";

export default function CategoryQuestionDisplay({edit ,question}) {
    const [options, setOptions] = useState([]);
    const [categories, setCategories] = useState({});
    const { form } = useContext(FormContext);
    const [openEdit , setOpenEdit] = useState(false);

    useEffect(() => {
        if (!question) return;

        // Prepare all options
        const allOptions = question.categories.flatMap(cat =>
            cat.options.map(opt => ({
                id: `${cat._id}-${opt}`,
                name: opt,
                categoryId: null
            }))
        );
        setOptions(allOptions);

        // Prepare empty categories
        const categoryMap = {};
        question.categories.forEach(cat => {
            categoryMap[cat._id] = [];
        });
        setCategories(categoryMap);

    }, [question]); // only run when `question` changes


    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        let newOptions = [...options];
        let newCategories = { ...categories };

        // Moving from pool to category
        if (source.droppableId === "options" && destination.droppableId !== "options") {
            const movedItem = newOptions[source.index];
            newOptions.splice(source.index, 1);

            newCategories[destination.droppableId] = [
                ...newCategories[destination.droppableId],
                movedItem
            ];
        }

        // Moving between categories
        if (source.droppableId !== "options" && destination.droppableId !== "options") {
            const [movedItem] = newCategories[source.droppableId].splice(source.index, 1);
            newCategories[destination.droppableId].splice(destination.index, 0, movedItem);
        }

        // Moving from category back to pool
        if (source.droppableId !== "options" && destination.droppableId === "options") {
            const [movedItem] = newCategories[source.droppableId].splice(source.index, 1);
            newOptions.splice(destination.index, 0, movedItem);
        }

        setOptions(newOptions);
        setCategories(newCategories);

        // Log the user's categorized answers
        logUserResponse(newCategories);
    };

    // Helper to log the user’s current answer state
    const logUserResponse = (categoriesState) => {
        const response = {
            formId: form?._id || null,
            questionId: question?._id || null,
            answers: {}
        };

        question.categories.forEach(cat => {
            response.answers[cat.categoryName] = categoriesState[cat._id].map(opt => opt.name);
        });

        console.log("User Response:", response);
    };

    const handleDelete = async() =>{
        await deleteCategoryQuestion({formId:form._id,categoryQuestionId:question._id})
    }


    if (!question) return <div className="p-4 text-gray-500">Loading...</div>;

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">{question.statement}</h2>

            <DragDropContext onDragEnd={onDragEnd}>
                {/* Options Pool */}
                <Droppable droppableId="options" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex gap-3 p-3 min-h-[60px] border-2 border-dashed border-gray-300 rounded-lg bg-richblack-800 shadow-sm"
                        >
                            {options.map((opt, index) => (
                                <Draggable key={opt.id} draggableId={opt.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm cursor-grab hover:bg-gray-100"
                                        >
                                            {opt.name}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {question.categories.map((cat) => (
                        <Droppable key={cat._id} droppableId={cat._id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 min-h-[150px] shadow-sm"
                                >
                                    <h4 className="text-lg font-medium mb-3 text-center text-gray-700">
                                        {cat.categoryName}
                                    </h4>
                                    {categories[cat._id]?.map((opt, index) => (
                                        <Draggable key={opt.id} draggableId={opt.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="px-4 py-2 mb-2 bg-richblack-800 border border-gray-300 rounded-md shadow-sm cursor-grab hover:bg-gray-100"
                                                >
                                                    {opt.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

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
        openEdit && <CategorizeModal edit={question._id} setOpenEdit={setOpenEdit} />
      }
        </div>
    );
}
