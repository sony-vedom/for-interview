import { AppTextField } from 'shared/ui/app-text-field'

export const KitNumberField = () => {
    return (
        <AppTextField
            required
            input_name={'kit_number'}
            label={'Номер комплекта'}
        />
    )
}
