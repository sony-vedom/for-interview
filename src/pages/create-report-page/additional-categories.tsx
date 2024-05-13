import { type FC, useState } from 'react'
import { ControlSwitch } from 'shared/ui/control-switch'
import { Box, Grow } from '@mui/material'
import { Textarea } from 'shared/ui/textarea'

export const AdditionalCategories: FC = () => {
    const [checked, setChecked] = useState(false)
    const handleChange = () => {
        setChecked((prev) => !prev)
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gap: 1,
                width: '100%',
                alignContent: 'start'
            }}>
            <ControlSwitch
                formControlLabelProps={{
                    label: 'Дополнительные стандарты'
                }}
                switchProps={{
                    checked,
                    onChange: handleChange
                }}
            />
            <Grow in={checked}>
                <Textarea
                    required={checked}
                    placeholder="Впишите дополнительные стандарты"
                    aria-label="additional standarts"
                    minRows={3}
                    maxRows={3}
                />
            </Grow>
        </Box>
    )
}
