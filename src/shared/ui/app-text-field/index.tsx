import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField/TextField'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextField as MuiTextField, useMediaQuery } from '@mui/material'
import { themeConfig } from 'shared/lib/theme'

type AppTextFieldProps = MuiTextFieldProps & {
    input_name: string
}

export const AppTextField: FC<AppTextFieldProps> = (props) => {
    const { input_name, ...rest } = props
    const { register, formState } = useFormContext()
    const matches = useMediaQuery(themeConfig.breakpoints.up('sm'))
    const headerBarHeight = matches ? 65 * 2 : 56
    return (
        <MuiTextField
            {...rest}
            {...register(input_name)}
            onFocus={(event) => {
                const elem = event.target.getBoundingClientRect()
                const { top, bottom } = elem
                const isVisible =
                    top >= headerBarHeight && bottom <= window.innerHeight
                if (!isVisible) {
                    window.scrollTo({
                        top,
                        behavior: 'smooth'
                    })
                }
            }}
            helperText={
                (formState?.errors[input_name]?.message as string) ?? ''
            }
        />
    )
}
