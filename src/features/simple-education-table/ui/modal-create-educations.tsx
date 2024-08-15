import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import MyForm, { BEGIN_FIELDS } from 'shared/ui/nested-form/model/store.ts'
import { getDisabledButton } from 'shared/lib/form'
import { NestedForm } from 'shared/ui/nested-form'
import { ModalLayout } from 'shared/ui/modal-layout'
import { ModalProps } from 'shared/lib/modal'
import {
    TypeSimpleEducationListStore,
    TypeSimpleEducationStore
} from 'entities/simple-education/type'

export const ModalCreateEducations: FC<{
    modal: ModalProps,
    typesSimpleEducationStore: TypeSimpleEducationStore,
    typesSimpleEducationListStore: TypeSimpleEducationListStore
}> = observer((props) => {
    const {
        typesSimpleEducationStore,
        typesSimpleEducationListStore
    } = props
    const formStore = new MyForm({
        fields: typesSimpleEducationListStore.list?.map(({ name, id }) => ({
            name: `${BEGIN_FIELDS}${id}`,
            label: 'Вид обучения',
            value: name,
            isEditMode: false,
            id: id
        }))
    }, {}, typesSimpleEducationStore)
    const disabledFormButton = getDisabledButton(typesSimpleEducationStore.meta) || getDisabledButton(typesSimpleEducationListStore.meta)
    return <ModalLayout {...props.modal}>
        <NestedForm form={formStore} disabledFormButton={disabledFormButton}
                    headerText={'Виды обучения'}
                    entityNameText={'вид обучения'} />
    </ModalLayout>
})
