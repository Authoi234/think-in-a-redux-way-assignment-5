const { createLogger } = require("redux-logger");
const videoReducer = require("../features/videosSlice/videosSlice");
const { configureStore } = require("@reduxjs/toolkit");

const logger = createLogger();

const store = configureStore({
    reducer: {
        video: videoReducer
    },
    middleware: (getDefaultMiddlewares) => 
        getDefaultMiddlewares().concat(logger),
});

module.exports = store;