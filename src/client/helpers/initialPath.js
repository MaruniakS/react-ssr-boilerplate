export const wasFetchedInitially = componentPath => {
    const pathIndex = window.INITIALLY_LOADED_PATHS.indexOf(componentPath);
    if (pathIndex < 0) return false;

    window.INITIALLY_LOADED_PATHS.splice(pathIndex, 1);
    return true;
};
