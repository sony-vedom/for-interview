import { type FC } from 'react'
import { AppTextField } from 'shared/ui/app-text-field'

export const KitStateField: FC = () => {
    return <AppTextField
        required
        input_name={'kit_state'}
        label={'Состояние'}
    />
}
