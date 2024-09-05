import { Box, Typography } from '@mui/material'
import { SimpleTableWrapper } from 'shared/ui/simple-table-wrapper'
import MyNestedForm, { CrudStore } from 'shared/ui/nested-form/model/store.ts'
import { CreatedMobXFormButton } from 'shared/ui/created-mobx-form-button'
import { FieldItem } from './field-item.tsx'
import { observer } from 'mobx-react-lite'

interface NestedFormModalProps<T extends CrudStore> {
    disabledFormButton: boolean
    headerText: string
    entityNameText: string
    form: MyNestedForm<T>
}

export const NestedForm = observer(
    <Type extends CrudStore>(props: NestedFormModalProps<Type>) => {
        const { form, disabledFormButton, headerText, entityNameText } = props
        return (
               <>
                   <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                       <Typography variant={'h5'}>{headerText}</Typography>
                   </Box>
                   <Box sx={{
                       display: 'flex',
                       justifyContent: 'center'
                   }}>
                       <CreatedMobXFormButton
                           displayName={entityNameText}
                           onClick={() => {
                               form.setIsCreatingMode()
                           }} disabled={disabledFormButton}
                           isCreatingMode={form.isCreatingMode} />
                   </Box>
                   <Box component={'form'} sx={{
                       display: 'grid'
                   }} id={'position-form'} onSubmit={form.onSubmit}>
                       <SimpleTableWrapper sx={{
                           overflow: 'scroll'
                       }}>
                           {
                               Array.from(form.fields).reverse().map(([el, field]) => {
                                   return <FieldItem<Type> key={field.key} entityNameText={entityNameText} fieldName={el} form={form}
                                                           disabledFormButton={disabledFormButton} />
                               })
                           }
                       </SimpleTableWrapper>
                   </Box>
               </>
        )
    }
)
