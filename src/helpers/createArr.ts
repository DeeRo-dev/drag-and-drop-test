export function createConsecutiveArrayAsync(length: number, interval: number, callback: any) {
    return new Promise((resolve) => {
        let arr: number[] = [];
        let i = 1;

        let intervalId = setInterval(() => {
            if (i <= length) {
                arr.push(i);
                callback(arr);
                i++;
            } else {
                clearInterval(intervalId);
                resolve(arr);
            }
        }, interval);
    });
}

export function createConsecutiveArray(length: number): number[] {
    let arr: number[] | undefined = [];
    
    for (let i = 1; i <= length; i++) {
        setTimeout(() => {
            arr.push(i)
        }, 500);
    }

    return arr;
}