import { FC } from 'react'
import { AppTextField } from 'shared/ui/app-text-field'

export const ParametersNameField: FC = () => {
    return <AppTextField
        required
        input_name={'parameters_name'}
        label={'Параметры комплекта'}
    />
}