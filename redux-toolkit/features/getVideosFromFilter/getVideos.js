const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
    loading: false,
    videos: [],
    error: ""
};

// create async thunk
const fetchVideosbyFilter = createAsyncThunk("filteredVideos/fetchVideosbyFilter", async (tags) => {
    const queryString = tags.reduce((queryString, currentTag) => {
        if (!queryString) {
            queryString += `tags_like=${currentTag}`;
        }
        else {
            queryString += `&tags_like=${currentTag}`;
        }
        return queryString;
    }, "");
    const response = await fetch(`http://localhost:9000/videos?${queryString}`);
    const filteredVideos = await response.json();
    const sortedVideos = filteredVideos.sort((a,b) => {
        if (parseFloat(a.views) < parseFloat(b.views)) return 1;
        if (parseFloat(a.views) > parseFloat(b.views)) return -1;
        return 0;
    })
    return sortedVideos;
})

const filteredVideosSlice = createSlice({
    name: "filteredVideos",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideosbyFilter.pending, (state, action) => {
            state.loading = true;
            state.videos = [];
            state.error = ""
        });
        builder.addCase(fetchVideosbyFilter.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
            state.error = "";
        });
        builder.addCase(fetchVideosbyFilter.rejected, (state, action) => {
            state.loading = false;
            state.videos = [];
            state.error = action.payload;
        });
    },
});

module.exports = filteredVideosSlice.reducer;
module.exports.fetchVideosbyFilter = fetchVideosbyFilter;