export function shuffle<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

export const convertSecToMinSec = (durationInSec: number) => {
    // Hours, minutes and seconds
    const hrs = ~~(durationInSec / 3600);
    const mins = ~~((durationInSec % 3600) / 60);
    const secs = ~~durationInSec % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = '';

    if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;

    return ret;
};
