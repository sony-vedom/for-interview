import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import MyForm, { BEGIN_FIELDS } from 'shared/ui/nested-form/model/store.ts'
import { getDisabledButton } from 'shared/lib/form'
import { NestedForm } from 'shared/ui/nested-form'
import { ModalLayout } from 'shared/ui/modal-layout'
import { ModalProps } from 'shared/lib/modal'
import {
    NameTypeQualificationEducationListStore,
    NameTypeQualificationEducationStore
} from 'entities/qualification-education/name-type'

export const ModalCreateEducations: FC<{
    modal: ModalProps,
    nameTypeQualificationEducationStore: NameTypeQualificationEducationStore,
    nameTypeSimpleEducationListStore: NameTypeQualificationEducationListStore
}> = observer((props) => {
    const {
        nameTypeQualificationEducationStore,
        nameTypeSimpleEducationListStore
    } = props
    const formStore = new MyForm({
        fields: nameTypeSimpleEducationListStore.list?.map(({ name, id }) => ({
            name: `${BEGIN_FIELDS}${id}`,
            label: 'Тип обучения',
            value: name,
            isEditMode: false,
            id: id
        }))
    }, {}, nameTypeQualificationEducationStore)
    const disabledFormButton = getDisabledButton(nameTypeQualificationEducationStore.meta) || getDisabledButton(nameTypeSimpleEducationListStore.meta)
    return (
        <ModalLayout {...props.modal}>
            <NestedForm form={formStore}
                        disabledFormButton={disabledFormButton}
                        headerText={'Типы обучения'}
                        entityNameText={'тип обучения'} />
        </ModalLayout>
    )
})
