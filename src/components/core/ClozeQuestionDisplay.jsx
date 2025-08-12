import React,{ useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FormContext } from "../../context/FormContext";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ClozeModal from "./ClozeModal";
import { deleteClozeQuestion } from "../../apiCalls/calls";

export default function ClozeQuestionDisplay({edit, question }) {
  const { form } = useContext(FormContext);

  const [options, setOptions] = useState([]);
  const [blanks, setBlanks] = useState([]);

  const [openEdit,setOpenEdit] = useState(false);

  // Prepare options + blanks on load
  useEffect(() => {
    if (!question) return;

    setOptions(
      question.options.map((opt, i) => ({
        id: `opt-${i}`,
        name: opt
      }))
    );

    // Count blanks from "____"
    const blankCount = (question.statement.match(/____/g) || []).length;
    const blankState = {};
    for (let i = 0; i < blankCount; i++) {
      blankState[`blank-${i}`] = null;
    }
    setBlanks(blankState);
  }, [question]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    let newOptions = [...options];
    let newBlanks = { ...blanks };

    // From options → blank
    if (source.droppableId === "options" && destination.droppableId.startsWith("blank")) {
      if (newBlanks[destination.droppableId]) return; // blank already filled

      const [movedItem] = newOptions.splice(source.index, 1);
      newBlanks[destination.droppableId] = movedItem;
    }

    // From blank → options
    if (source.droppableId.startsWith("blank") && destination.droppableId === "options") {
      const movedItem = newBlanks[source.droppableId];
      newBlanks[source.droppableId] = null;
      newOptions.splice(destination.index, 0, movedItem);
    }

    setOptions(newOptions);
    setBlanks(newBlanks);

    logUserResponse(newBlanks);
  };

  const logUserResponse = (blanksState) => {
    // Check if all blanks are filled
    const allFilled = Object.values(blanksState).every(Boolean);
    if (!allFilled) return;

    // Replace blanks in statement with user choices
    let sentence = question.statement;
    Object.keys(blanksState).forEach((blankKey) => {
      const choice = blanksState[blankKey]?.name || "_____";
      sentence = sentence.replace("_____", choice);
    });

    const response = {
      formId: form?._id || null,
      questionId: question?._id || null,
      sentence
    };

    console.log("User Response:", response);
  };

  const handleDelete = async()=>{
    await deleteClozeQuestion({formId:form._id,id:question._id})
  }

  if (!question) return <div>Loading...</div>;

  return (
    <div>
      <div className="p-4 border rounded-lg bg-richblack-800 shadow">
        <DragDropContext onDragEnd={onDragEnd}>
          <p className="mb-4 text-lg font-medium text-gray-800 flex flex-wrap items-center gap-2">
            {question.statement.split("_____").map((part, i, arr) => (
              <React.Fragment key={i}>
                {/* Render normal text part */}
                {part && <span>{part}</span>}

                {/* Render blank only between parts */}
                {i < arr.length - 1 && (
                  <Droppable droppableId={`blank-${i}`} direction="horizontal">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-w-[100px] min-h-[40px] border-b-2 border-dashed border-gray-400 flex items-center justify-center"
                      >
                        {blanks[`blank-${i}`] && (
                          <Draggable
                            draggableId={blanks[`blank-${i}`].id}
                            index={0}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="px-3 py-1 bg-gray-100 rounded shadow cursor-grab"
                              >
                                {blanks[`blank-${i}`].name}
                              </div>
                            )}
                          </Draggable>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </React.Fragment>
            ))}
          </p>


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
        </DragDropContext>
      </div>
      <div>
        {
          edit && (
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {setOpenEdit(true)}}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => {handleDelete()}}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <MdDelete />
              </button>
            </div>
          )
        }
      </div>
      {
        openEdit  && <ClozeModal edit={question._id} setOpenEdit={setOpenEdit}/>
      }
    </div>
  );
}
