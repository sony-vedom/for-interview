import { Field, Form } from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'
import { FieldConstructor } from 'mobx-react-form/lib/models/FieldInterface'
import { ReportCreate, ReportStore } from 'entities/report'
import { SessionStore } from 'entities/session/model/store'
import { Tool, ToolStore } from 'entities/tools/item'
import { getPipeTypeFromRouter } from 'pages/create-report-page/lib'
import { ROUTES } from 'shared/config/routes'

export class MyField extends Field {
    constructor(props: FieldConstructor) {
        super(props)
    }
}

export default class CreateReportForm extends Form {
    //@ts-ignore
    private _reportStore: ReportStore
    //@ts-ignore
    public _sessionStore: SessionStore
    //@ts-ignore
    public _toolStore: ToolStore

    plugins() {
        return {
            dvr: dvr({ package: validatorjs })
        }
    }

    constructor(setup: any, formConfig: any = {},
                reportStore: ReportStore, sessionStore: SessionStore, toolsStore: ToolStore) {
        super(setup, formConfig)
        this._reportStore = reportStore
        this._sessionStore = sessionStore
        this._toolStore = toolsStore
    }

    makeField(props: any) {
        return new MyField(props)
    }

    setup() {
        return {
            fields: [
                {
                    name: 'user',
                    label: 'Инспектор',
                    rules: 'required',
                    type: 'date'
                },
                {
                    name: 'user',
                    label: 'Инспектор',
                    rules: 'required',
                    type: 'date'
                },
                {
                    name: 'date_start_detection',
                    label: 'Дата начала проведения дефектоскопии',
                    rules: 'required',
                    type: 'date'
                },
                {
                    name: 'location',
                    label: 'Расположение',
                    rules: 'required'
                },
                {
                    name: 'number_order',
                    label: 'Заказ наряд №',
                    rules: 'required'
                },
                {
                    // для customer
                    name: 'consumers',
                    label: 'Заказчик',
                    rules: 'required'
                },
                {
                    // для contract_number
                    name: 'contract_numbers',
                    label: 'Договор №',
                    rules: 'required',
                    disabled: true
                },
                {
                    name: 'application',
                    label: 'Заявка',
                    rules: 'required'
                },
                {
                    name: 'kit_number',
                    label: 'Номер комплекта',
                    rules: 'required'
                },
                {
                    // для parameter_id
                    name: 'parameter',
                    label: 'Заводские параметры',
                    rules: 'required'
                },
                {
                    name: 'kit_state',
                    label: 'Состояние',
                    rules: 'required',
                    value: 'Бывший в употреблении'
                },
                // для standards_procedures_id
                {
                    name: 'standards_procedures',
                    label: 'Стандарты',
                    rules: 'required',
                    value: 1
                },
                {
                    name: 'tools',
                    fields: []
                }
            ]
        }
    }

    hooks() {
        return {
            async onSuccess(form: CreateReportForm) {
                const values = form.values()
                const prepareValues = {
                    date_start_detection: values.date_start_detection,
                    customer: values.consumers.name,
                    location: values.location,
                    contract_number: values.contract_numbers.name,
                    number_order: values.number_order,
                    kit_number: values.kit_number,
                    standards_procedures_id: values.standards_procedures.id,
                    user_id: values.user.id,
                    parameter_id: values.parameter.id,
                    application: values.parameter.application,
                    condition: values.kit_state
                } as ReportCreate
                const res = await form._reportStore.create(prepareValues)
                if (values.tools && res?.id) {
                    const preparedVal = Object.values(values.tools)

                    return await Promise.all(preparedVal.map(async (el) => {
                        return await form._toolStore.lockOrUnlockTools((el as Tool).id, {
                            in_active_report: true,
                            sbt_report_id: res.id
                        })()
                    })).then(() => {
                        const pipeType = getPipeTypeFromRouter()
                        window.location.href = `${window.location.origin}${ROUTES.DOCUMENTS}/${pipeType}`
                    })
                }

            },
            onError(_: CreateReportForm) {
                // get all form errors
                // console.log('All form errors', form.errors())
            }
        }
    }
}
