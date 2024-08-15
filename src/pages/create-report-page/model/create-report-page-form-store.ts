import { autorun } from "mobx";
import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

export default class CreateReportForm extends Form {
    plugins() {
        return {
            dvr: dvr({ package: validatorjs }),
        };
    }

    setup() {
        return {
            fields: [
                {
                    name: "date_start_detection",
                    label: "Дата начала проведения дефектоскопии",
                    rules: "required",
                    type: "date"
                },
                {
                    name: "location",
                    label: "Расположение",
                    rules: "required",
                },
                {
                    name: "number_order",
                    label: "Заказ наряд №",
                    rules: "required",
                },
                {
                    name: "customer",
                    label: "Заказчик",
                    rules: "required",
                },
                {
                    name: "contract_number",
                    label: "Договор №",
                    rules: "required",
                },
                {
                    name: "application",
                    label: "Заявка",
                    rules: "required",
                },
            ],
        };
    }

    hooks() {
        return {
            onInit(form: Form) {
                autorun(() => form.clearing && console.log("Clearing..."));
                autorun(() => form.resetting && console.log("Resetting..."));
                autorun(() => form.validating && console.log("Validating..."));
                autorun(() => form.submitting && console.log("Submitting..."));
            },
            onSuccess(form: Form) {
                alert("Form is valid! Send the request here.");
                // get field values
                console.log("Form Values!", form.values());
            },
            onError(form: Form) {
                alert("Form has errors!");
                // get all form errors
                console.log("All form errors", form.errors());
            },
        };
    }
}
