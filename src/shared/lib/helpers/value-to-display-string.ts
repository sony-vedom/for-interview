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
            return value || 'Не указано'
        }
        default: {
            return value || 'Не указано'
        }
    }
}
