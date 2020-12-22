const pad = (n: number, length: number) => {
    let str = '' + n;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
};

export const timeFormatHelper = (inputSeconds: number) => {
    const minutes = Math.floor(inputSeconds / 60);
    const seconds = inputSeconds % 60;
    return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
};
