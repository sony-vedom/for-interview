import { type FC, type PropsWithChildren } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import Box from '@mui/material/Box'
import { observer } from 'mobx-react-lite'

interface CreateButtonProps {
    createIconText: string,
    handleCreate: () => void,
    disabled?: boolean
}

const CreateButton: FC<Partial<ButtonProps> & CreateButtonProps> = (props) => {
    const { createIconText, handleCreate, disabled, ...rest } = props
    return <>
        <Button
            {...rest}
            size={'medium'}
            variant="contained"
            onClick={handleCreate}
            disabled={disabled}
        >
            {createIconText}
        </Button>
    </>
}

const Wrapper: FC<PropsWithChildren> = observer((props) => {
    const { children } = props
    return <Box sx={{ display: 'flex', gap: '20px', width: '100%' }}>
        {children}
    </Box>
})

export const TableActionsToolbar = {
    Wrapper,
    CreateButton
}
