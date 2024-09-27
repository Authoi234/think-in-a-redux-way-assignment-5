const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// inital State
const initialState = {
    loading: false,
    videos: [],
    error: ""
};

// create async thunk
const fetchVideo = createAsyncThunk("videos/fetchVideo", async () => {
    const response = await fetch("http://localhost:9000/videos");
    const video = await response.json();
    console.log(video);
    return video;
})

const videosSlice = createSlice({
    name: "videos",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideo.pending, (state, action) => {
            state.loading = true;
            state.videos = [];
            state.error = ""
        });
        builder.addCase(fetchVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
            state.error = ""
        });
        builder.addCase(fetchVideo.rejected, (state, action) => {
            state.loading = false;
            state.videos = [];
            state.error = action.payload
        });
    },
});

module.exports = videosSlice.reducer;
module.exports.fetchVideo = fetchVideo;