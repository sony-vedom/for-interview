import MyForm, { CrudStore } from 'shared/ui/nested-form/model/store.ts'
import { observer } from 'mobx-react-lite'
import { Box, TableCell, TableRow } from '@mui/material'
import { AppMobXTextInput } from 'shared/ui/app-mobx-text-input'
import { DeleteMobXFormButton } from 'shared/ui/delete-mobx-form-button'
import { EditMobXIconButton } from 'shared/ui/edit-mobx-icon-button'
import { SavedCreatedMobXFormButton } from 'shared/ui/saved-created-mobx-form-button'

interface FieldItemProps<Type extends CrudStore> {
    fieldName: string,
    form: MyForm<Type>
    disabledFormButton: boolean
    entityNameText: string
}

export const FieldItem = observer(
    <Type extends CrudStore>(props: FieldItemProps<Type>) => {
    const { fieldName, form, disabledFormButton, entityNameText } = props
    const field = form.$(fieldName)
    return <TableRow
        key={fieldName}
        sx={{
            '&:last-child td, &:last-child th': {
                border: 0
            }
        }}>
        <TableCell>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 80px',
                gap: 1
            }}>
                <AppMobXTextInput
                    required
                    disabled={!field.isEditMode && !field.name.includes('new') || disabledFormButton}
                    field={field} />
                <Box sx={{
                    display: 'flex'
                }}>
                    {!form.$(fieldName).name.includes('new')
                        ? <>
                            <DeleteMobXFormButton
                                entityNameText={entityNameText}
                                disabled={disabledFormButton || form.isCreatingMode}
                                onClick={form.deleteField(field)} />
                            <EditMobXIconButton
                                disabled={disabledFormButton || form.isCreatingMode}
                                onSetEditMode={() => {
                                    field.setIsEditMode()
                                }}
                                isEditMode={field.isEditMode}
                                onUpdate={form.editField(field)}
                            />
                        </>
                        : <SavedCreatedMobXFormButton
                            onClick={form.createNewPosition(field)}
                            disabled={disabledFormButton}
                        />
                    }
                </Box>
            </Box>
        </TableCell>
    </TableRow>
})