export const parseNameAndPath = (input) => {
    const paths = input.split("/");
    let appName = paths[paths.length - 1];
    const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));
    if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
        appName = paths.slice(indexOfDelimiter).join("/");
    }
    const path = paths.filter((p) => !p.startsWith("@")).join("/");
    return [appName, path];
};
