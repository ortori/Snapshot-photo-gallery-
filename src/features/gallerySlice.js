import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGalleryImages = createAsyncThunk(
  "fetchGalleryImages",
  async ({ searchValue = "views", page, photosPerPage }, thunkAPI) => {
    const res = await axios({
      url: `https://api.pexels.com/v1/search?page=${page}&query=${searchValue}&per_page=${photosPerPage}`,
      method: "GET",
      headers: {
        Authorization:
          "563492ad6f917000010000014520be1892104a76bd8e07a8ce295c02",
      },
    });
    console.log(searchValue, page);
    const data = res.data;
    return data;
  }
);

const initialState = {
  galleryImages: [],
  isLoading: true,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGalleryImages.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchGalleryImages.fulfilled]: (state, action) => {
      state.galleryImages = action.payload.photos;
      state.isLoading = false;
    },
    [fetchGalleryImages.rejected]: (state, action) => {
      state.isLoading = true;
    },
  },
});

export default gallerySlice.reducer;
