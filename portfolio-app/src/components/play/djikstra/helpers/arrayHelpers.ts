export function listToSquareMatrix<T>(list: T[], elementsPerSubArray: number) {
    let matrix: any = [];
    let k;
    for (let i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }
    return matrix;
}

export function listToNxMMatrix<T>(list: T[], n: number, m: number) {
    let matrix: any = [];
    let k = 0;
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < m; j++) {
            row.push(list[k++]);
        }
        matrix.push(row);
    }
    return matrix;
}

export function pushToArrayInterval(arrayToPush: any[], arrayToPop: any[], interval: number) {
    let timer = 0;

    arrayToPop.forEach(item => {
        setTimeout(() => {
            arrayToPush.push(item);
        }, timer += interval)
    })
}

export function pushThenShiftArrayInterval(arrayToWork: any[], arrayToPop: any[], interval: number) {
    pushToArrayInterval(arrayToWork, arrayToPop, interval);
    
    setTimeout(() => {
        shiftArrayInterval(arrayToWork, interval)
    }, arrayToPop.length * interval);
}

export function shiftArrayInterval(arrayToShift: any[], interval: number) {
    let timer = interval;
    arrayToShift.forEach(() => {
        setTimeout(() => {
            arrayToShift.shift();
        }, timer += interval)
    });
}