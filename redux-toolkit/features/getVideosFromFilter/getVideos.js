const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
    loading: false,
    videos: [],
    error: ""
};

const fetchVideosbyFilter = createAsyncThunk("videos/fetchVideo", async (tags) => {
    const response = await fetch(`http://localhost:9000/videos?${tags.map(tag => `tags_like=${tag}&`)}`);
    const filteredVideos = await response.json();
    return filteredVideos;
})

const filteredVideosSlice = createSlice({
    name: "filteredVideos",
    initialState
});

module.exports = filteredVideosSlice.reducer;