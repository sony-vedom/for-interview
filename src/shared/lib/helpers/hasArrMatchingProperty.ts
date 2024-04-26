type hasArrMatchingPropertyArgs = <T extends object>(
    arr: T[],
    searchProperty: keyof T,
    whereSearch: string | Array<string | number>
) => boolean

export const hasArrMatchingProperty: hasArrMatchingPropertyArgs = (
    arr,
    searchProperty,
    whereSearch
) => {
    if (!arr.length) {
        return true
    }
    return arr.some((el) => {
        if (typeof whereSearch === 'string') {
            return whereSearch.includes(`${el[searchProperty]}`)
        }
        return whereSearch
            .map((el) => `${el}`)
            .includes(`${el[searchProperty]}`)
    })
}
