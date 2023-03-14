export function listToMatrix<T>(list: T[], elementsPerSubArray: number) {
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