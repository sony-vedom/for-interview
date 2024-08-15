import { action, extendObservable, observable, runInAction } from 'mobx'
import { Field, Form } from 'mobx-react-form'
import { FieldConstructor } from 'mobx-react-form/lib/models/FieldInterface'
import React from 'react'

export const BEGIN_FIELDS = 'begin_fields_'

export class MyField extends Field {
    isEditMode: boolean = false

    constructor(props: FieldConstructor) {
        super(props)
        extendObservable(this, {
            isEditMode: this.isEditMode,
            setIsEditMode: this.setIsEditMode
        }, {
            isEditMode: observable,
            setIsEditMode: action
        })
    }

    setIsEditMode() {
        this.isEditMode = !this.isEditMode
    }
}

export interface CrudStore {
    create: (...args: any[]) => Promise<void>;
    delete: (...args: any[]) => Promise<void>;
    edit: (...args: any[]) => Promise<void>;
}

export default class MyForm<T extends CrudStore> extends Form {
    _crudStore: CrudStore | null = null
    isCreatingMode: boolean = false

    constructor(setup: any, formConfig: any = {}, crudStore: T) {
        super(setup, formConfig)
        extendObservable(this, {
            isCreatingMode: this.isCreatingMode,
            setIsCreatingMode: this.setIsCreatingMode,
            createNewPosition: this.createNewPosition,
            deleteField: this.deleteField,
            editField: this.editField
        }, {
            isCreatingMode: observable,
            setIsCreatingMode: action,
            createNewPosition: action,
            deleteField: action,
            editField: action
        })
        this._crudStore = crudStore
    }

    setIsCreatingMode() {
        if (!this.isCreatingMode) {
            runInAction(() => {
                this.add({ key: 'new', value: '', label: 'Новое поле' })
                this.isCreatingMode = !this.isCreatingMode
            })
        } else {
            runInAction(() => {
                this.del('new')
                this.isCreatingMode = !this.isCreatingMode
            })
        }
    }

    createNewPosition(field: Field) {
        return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => field.onSubmit(e, {
            onSuccess: (field: Field) => {
                this._crudStore?.create({
                    name: field.value
                })
            },
            onError: () => {

            }
        })
    }

    deleteField(field: Field) {
        return (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => field.onSubmit(e, {
            onSuccess: (field: Field) => {
                this._crudStore?.delete(field.name.slice(BEGIN_FIELDS.length, field.name.length))
            },
            onError: () => {

            }
        })
    }

    editField(field: MyField) {
        return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => field.onSubmit(e, {
            onSuccess: (field: MyField) => {
                this._crudStore?.edit(field.name.slice(BEGIN_FIELDS.length, field.name.length), {
                    name: field.value
                }).then(() => {
                    field.setIsEditMode()
                })
            },
            onError: () => {

            }
        })
    }

    makeField(props: any) {
        return new MyField(props)
    }
}
