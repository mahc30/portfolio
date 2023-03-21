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
