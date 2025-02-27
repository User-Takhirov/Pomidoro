import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskType {
  id: number;
  text: string;
}

interface TasksState {
  items: TaskType[];
}

const initialState: TasksState = {
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.items.push({ id: Date.now(), text: action.payload });
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    deleteAllTasks: (state) => {
      state.items = [];
    },
    editTask: (
      state,
      action: PayloadAction<{ id: number; newText: string }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.text = action.payload.newText;
      }
    },
  },
});

export const { addTask, deleteTask, editTask, deleteAllTasks } =
  itemsSlice.actions;
export default itemsSlice.reducer;
