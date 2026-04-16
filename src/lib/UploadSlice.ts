import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ImportRecord {
  id: string;
  name: string;
  count: number;
  date: string;
  status: string;
}

interface UploadState {
  listName: string;
  importHistory: ImportRecord[];
}

const initialState: UploadState = {
  listName: '',
  importHistory: [],
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setGlobalListName: (state, action: PayloadAction<string>) => {
      state.listName = action.payload;
    },

    completeImport: (state, action: PayloadAction<ImportRecord>) => {
      state.importHistory.unshift(action.payload);
      state.listName = '';
    },
  },
});

export const { setGlobalListName, completeImport } = uploadSlice.actions;
export default uploadSlice.reducer;