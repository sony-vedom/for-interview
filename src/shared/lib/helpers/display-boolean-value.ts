export const displayBooleanValue = (value: boolean) => {
    return ({
                trueString,
                falseString
            }: {
        trueString: string
        falseString: string
    }) => {
        return value ? trueString : falseString
    }
}