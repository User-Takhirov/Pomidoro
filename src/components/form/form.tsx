// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { addTask } from "../../Redux/Reducers/products-reducer";

// interface FormValues {
//   text: string;
// }

// export const Form: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
//   const { register, handleSubmit, reset } = useForm<FormValues>();
//   const dispatch = useDispatch();

//   const handleFormSubmit = ({ text }: FormValues) => {
//     dispatch(addTask(text));
//     reset();
//     onSubmit();
//   };

//   return (
//     <form
//       id="taskform"
//       onSubmit={handleSubmit(handleFormSubmit)}
//       className="space-x-2"
//     >
//       <input
//         {...register("text", { required: true })}
//         placeholder="What are you going on?"
//         className="w-full box-border rounded px-6 text-[22px] p-[10px_0px] shadow-none border-none text-[#555] font-bold focus:outline-none"
//       />
//     </form>
//   );
// };
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  text: string;
}

export const Form: React.FC<{ onSubmit: (text: string) => void; initialText?: string }> = ({ onSubmit, initialText }) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>();

  useEffect(() => {
    if (initialText) setValue("text", initialText);
  }, [initialText, setValue]);

  const handleFormSubmit = ({ text }: FormValues) => {
    onSubmit(text);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="taskform" className="space-x-2">
      <input
        {...register("text", { required: true })}
        placeholder="What are you going on?"
        className="w-full box-border rounded px-6 text-[22px] p-[10px_0px] shadow-none border-none text-[#555] font-bold focus:outline-none"
      />
    </form>
  );
};
