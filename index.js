const store = require("./redux-toolkit/app/store");
const { fetchVideo } = require("./redux-toolkit/features/videosSlice/videosSlice");

store.subscribe(() => {
    console.log( store.getState());
});

store.dispatch(fetchVideo());