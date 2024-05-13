import { AppTextField } from 'shared/ui/app-text-field'
import { type FC } from 'react'

export const ApplicationNumberField: FC = () => {
    return <AppTextField
        required
        input_name={'application_number'}
        label={'Номер заявки'}
    />
}
