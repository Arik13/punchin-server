const httpError = (code, text) => {
    const error = new Error(text);
    error.statusCode = code;
    return error;
}

exports.httpError = httpError;