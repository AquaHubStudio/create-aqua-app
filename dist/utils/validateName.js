export const validateAppName = (name) => {
    if (/^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name)) {
        return true;
    }
    else {
        return "Application must be named lowercase | alphanumeric | - / _ / @";
    }
};
