
export const isSubset = (fullSet, candidateSet) => {
    
    return Object.entries(candidateSet).every(([key,value])=>fullSet[key] === value);
}

