import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteAllTasks,
  editTask,
} from "../../../Redux/Reducers/products-reducer";
import { Form } from "../../form";
import { CheckIcon } from "../../../assets/icon/check-icon";
import { EditDotsIcon } from "../../../assets/icon/edit-dots-icon";
import { ThreeDotsIcon } from "../../../assets/icon/threeDots-icon";

export const Tasks = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state?.items?.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFormSubmit = (text: string) => {
    if (editingTask) {
      dispatch(editTask({ id: editingTask.id, newText: text }));
      setEditingTask(null);
    } else {
      dispatch(addTask(text));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <h3 className="text-white text-[18px] font-[300] font-sans break-words text-center">
          Time to focus!
        </h3>
        <div className="w-[480px] mt-[20px] mx-auto mb-[42px]">
          <div className="flex justify-between items-center border-b-2 border-white/60 pb-[14px]">
            <p className="text-[18px] font-bold break-words">Tasks</p>
            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                tabIndex={0}
                className="flex items-center justify-center text-center rounded cursor-pointer opacity-90 bg-white/20 shadow-none ml-[10px] text-[13px] p-[8px] min-w-auto border-none text-white"
              >
                <ThreeDotsIcon />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white shadow-lg rounded-lg py-2 text-gray-700 z-10">
                  {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Clear finished tasks
                  </button> */}
                  <button
                    onClick={() => dispatch(deleteAllTasks())}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Clear All tasks
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="box-border w-full h-[64px] bg-black/10 rounded-lg flex justify-center items-center cursor-pointer opacity-80 mt-[12px] border-2 border-dashed border-white/40"
          >
            Add Task
          </div>

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
              <div className="bg-white pt-6 rounded-lg w-[400px]">
                <Form
                  onSubmit={handleFormSubmit}
                  initialText={editingTask?.text}
                />
                <div className="flex justify-end items-center bg-[#efefef] p-[14px_20px] text-right rounded-b-lg">
                  <button
                    className="mr-2 px-4 py-2 bg-gray-300 rounded cursor-pointer"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    form="taskform"
                    className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                    type="submit"
                  >
                    {editingTask ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 w-[476px]">
        {tasks?.map((task: any) => (
          <div
            key={task.id}
            className="w-full bg-white shadow-md rounded cursor-pointer mt-2 text-left text-[16px] box-border border-transparent"
          >
            <div
              onClick={() => setSelectedTaskId(task.id)}
              className={`flex justify-between items-center py-[18px] break-words px-[14px] ${
                selectedTaskId === task.id
                  ? "border-blue-400 border-l-8"
                  : "border-transparent"
              }`}
            >
              <div className="w-[26px] mr-[10px]">
                <CheckIcon />
              </div>
              <p className="text-[#555] font-bold w-[85%] overflow-hidden flex items-center leading-[1.5em]">
                {task.text}
              </p>
              <div
                onClick={() => {
                  setEditingTask(task);
                  setIsModalOpen(true);
                }}
                className="cursor-pointer text-center flex justify-center border border-gray-300 rounded-md px-1 py-0.5 bg-white w-5 text-gray-400"
              >
                <EditDotsIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
