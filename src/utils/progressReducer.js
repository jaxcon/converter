export const progressReducer = (state, action) => {
    switch (action.type) {
        case "SET_PROGRESS": {
            return new Map(state).set(action.payload.fileId, action.payload.progress);
        }
        case "REMOVE_PROGRESS": {
            const newState = new Map(state);
            newState.delete(action.payload.fileId);
            return newState;
        }
        case "RESET_ALL": {
            return new Map();
        }
        default:
            return state;
    }
};

export const setProgress = (fileId, progress) => ({
    type: "SET_PROGRESS",
    payload: { fileId, progress }
});

export const removeProgress = (fileId) => ({
    type: "REMOVE_PROGRESS",
    payload: { fileId }
});

export const resetAllProgress = () => ({
    type: "RESET_ALL"
});