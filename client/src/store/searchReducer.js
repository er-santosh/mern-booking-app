import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  date: [],
  options: {},
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchData(state, action) {
      const { startDate, endDate, key } = action.payload.date[0];

      state.destination = action.payload.destination;
      state.date = [
        {
          startDate: startDate.toLocaleString(),
          endDate: endDate.toLocaleString(),
          key,
        },
      ];
      state.options = action.payload.options;
    },
  },
});

export const { addSearchData } = searchSlice.actions;

export default searchSlice.reducer;
