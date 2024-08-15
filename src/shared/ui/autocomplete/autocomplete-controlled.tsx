import {Control, Controller} from "react-hook-form";
import {type FC} from "react";
import {AutoCompleteBase, AutocompleteBaseProps} from "./autocomplete-base";

type AutoCompleteControlledProps = {
    fieldName: string
    required?: boolean
    control: Control
}

export const AutoCompleteControlled: FC<AutocompleteBaseProps & AutoCompleteControlledProps> = (props) => {
    const {fieldName, control, required = false, data, ...rest} = props
    return (
        <Controller
            name={fieldName}
            control={control}
            rules={{required: required}}
            render={({field: {onChange}, fieldState: {invalid}}) => {
                return (
                    <AutoCompleteBase
                        {...rest}
                        data={data}
                        onChange={(_: React.SyntheticEvent, val) => {
                            onChange(val)
                        }}
                        textFieldProps={
                            {
                                error: invalid,
                                helperText: invalid ? "Поле обязательно для заполнения" : undefined,
                                required,
                            }
                        }
                    />
                )
            }}
        />
    )
}
