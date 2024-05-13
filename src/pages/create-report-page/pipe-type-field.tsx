import { FC } from 'react'
import { AppTextField } from 'shared/ui/app-text-field'

export const PipeTypeField: FC = () => {
    return <AppTextField
        required
        input_name={'pipe_type'}
        label={'Тип труб'}
    />
}