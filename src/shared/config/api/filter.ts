export type filterString = 'eq' | 'ne' | 'in' | 'not_in' | 'gt' | 'ge' | 'lt' | 'le'

export type Filters<T> = { key: keyof T, value: T[keyof T], filterString?: filterString }[]

export function filtersSerialize<T>(arg: Filters<T>) {
    return arg.reduce((acc, el) => {
        if (el.filterString) {
            acc[`${el.key as string}[${el.filterString}]`] = el.value
            return acc
        }
        acc[el.key as string] = el.value
        return acc
    }, {} as unknown as Record<string, any>)
}
