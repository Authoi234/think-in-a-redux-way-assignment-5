const store = require("./redux-toolkit/app/store");
const { fetchVideosbyFilter } = require("./redux-toolkit/features/getVideosFromFilter/getVideos");
const { fetchVideo } = require("./redux-toolkit/features/videosSlice/videosSlice");

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(fetchVideo()).unwrap().then((video) => {store.dispatch(fetchVideosbyFilter(video.tags));});