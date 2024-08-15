import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { KIND_QUALIFICATION_EDUCATION } from 'entities/qualification-education/kind'
import { FC, MouseEvent } from 'react'
import { ROUTES } from 'shared/config/routes'

export const NavigationQualificationEducation: FC<{
    value?: string | null, onChange: (_: MouseEvent<HTMLElement>,
                              newAlignment: KIND_QUALIFICATION_EDUCATION | null) => void
}> = (props) => {
    const { value, onChange } = props
    return <ToggleButtonGroup
        value={value}
        exclusive
        onChange={onChange}
    >
        <ToggleButton value={ROUTES.ASNT} aria-label={KIND_QUALIFICATION_EDUCATION.ASNT}>
            {KIND_QUALIFICATION_EDUCATION.ASNT}
        </ToggleButton>
        <ToggleButton value={ROUTES.SDANK} aria-label={KIND_QUALIFICATION_EDUCATION.SDANK}>
            {KIND_QUALIFICATION_EDUCATION.SDANK}
        </ToggleButton>
    </ToggleButtonGroup>
}