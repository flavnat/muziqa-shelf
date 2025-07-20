import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name: 'songs',
    initialState: {
        songs: [],
        isLoading: false,
        error: null,
        page: 1,
        limit: 10,
        totalPages: 1,
        total: 0
    },
    reducers: {
        getSongsFetch: (state) => {
            state.isLoading = true
        },
        getSongsSuccess: (state, action) => {
            state.isLoading = false
            state.songs = action.payload.data;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.total = action.payload.total;
            state.totalPages = action.payload.totalPages;
        },
        getSongsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        }
    }
})

export const { getSongsFailure, getSongsFetch, getSongsSuccess, setPage } = songSlice.actions

export default songSlice.reducer