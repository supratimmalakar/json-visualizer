export const isValidJson = (code) => {
    try {
        const parsedCode = JSON.parse(code);
        return typeof parsedCode === 'object';
    } catch (error) {
        return false;
    }
};