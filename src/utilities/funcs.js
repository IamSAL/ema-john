import { useMemo } from 'react'
export const useComponentWillMount = (func) => {
    useMemo(func, [])// eslint-disable-line react-hooks/exhaustive-deps
}
export function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export const filterDuplicates = (arr) => {
    return [...new Set(arr.map(prod => JSON.stringify(prod)))].map(prod => JSON.parse(prod))
}