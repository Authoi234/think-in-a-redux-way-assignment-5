const { createLogger } = require("redux-logger");
const videoReducer = require("../features/videosSlice/videosSlice");
const filteredVideosReducer = require("../features/getVideosFromFilter/getVideos");
const { configureStore } = require("@reduxjs/toolkit");

const logger = createLogger();

const store = configureStore({
    reducer: {
        video: videoReducer,
        filteredVideos: filteredVideosReducer
    },
    middleware: (getDefaultMiddlewares) => 
        getDefaultMiddlewares()
    .concat(logger),
});

module.exports = store;