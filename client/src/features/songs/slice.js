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
        total: 0,
        isAddingSong: false,
        isEditingSong: false,
        isDeletingSong: false,
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
        },

        addSongFetch: (state) => {
            state.isAddingSong = true;
        },
        addSongSuccess: (state, action) => {
            state.isAddingSong = false;
            state.songs.unshift(action.payload);
            state.total += 1;
            state.totalPages = Math.ceil(state.total / state.limit);
        },
        addSongFailure: (state, action) => {
            state.isAddingSong = false;
            state.error = action.payload;
        },
        editSongFetch: (state) => {
            state.isEditingSong = true;
        },
        editSongSuccess: (state, action) => {
            state.isEditingSong = false;
            const index = state.songs.findIndex(song => song._id === action.payload._id);
            if (index !== -1) {
                state.songs[index] = action.payload;
            }
        },
        editSongFailure: (state, action) => {
            state.isEditingSong = false;
            state.error = action.payload;
        },
        deleteSongFetch: (state) => {
            state.isDeletingSong = true;
        },
        deleteSongSuccess: (state, action) => {
            state.isDeletingSong = false;
            state.songs = state.songs.filter(song => song._id !== action.payload);
            state.total -= 1;
            state.totalPages = Math.ceil(state.total / state.limit);
        },
        deleteSongFailure: (state, action) => {
            state.isDeletingSong = false;
            state.error = action.payload;
        },

    }
})

export const {
    getSongsFailure,
    getSongsFetch,
    getSongsSuccess,
    setPage,
    addSongFetch,
    addSongSuccess,
    addSongFailure,
    editSongFetch,
    editSongSuccess,
    editSongFailure,
    deleteSongFetch,
    deleteSongSuccess,
    deleteSongFailure } = songSlice.actions

export default songSlice.reducer