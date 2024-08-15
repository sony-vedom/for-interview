export const conditions = <T>(searchCondition: T, data: Array<[T, any]>) => {
    return data.find(([condition, _]) => condition === searchCondition)?.[1] ?? null
}
