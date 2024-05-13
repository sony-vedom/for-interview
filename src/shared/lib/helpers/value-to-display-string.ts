import { displayBooleanValue } from './display-boolean-value.ts'

export const valueToDisplayString = (
    value: number | boolean | string | null | undefined,
    booleanDisplayValues?: {
        trueString: string
        falseString: string
    }
): number | string => {
    switch (typeof value) {
        case 'boolean': {
            return displayBooleanValue(value)(
                booleanDisplayValues ?? {
                    trueString: 'Есть',
                    falseString: 'Нет'
                }
            )
        }
        case 'string': {
            //@ts-ignore
            return value ?? 'Не указано'
        }
        default: {
            //@ts-ignore
            return value ?? 'Не указано'
        }
    }
}
