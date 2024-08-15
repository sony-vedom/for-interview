import {type FC, type PropsWithChildren} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { observer } from 'mobx-react-lite'

const CreateButton: FC<{
    createIconText: string,
    handleCreate: () => void,
    disabled?: boolean
}> = (props) => {
    const {createIconText, handleCreate, disabled} = props
    return <>
        <Button
            size={"medium"}
            variant="contained"
            onClick={handleCreate}
            disabled={disabled}
        >
            {createIconText}
        </Button>
    </>
}

const Wrapper: FC<PropsWithChildren> = observer((props) => {
    const {children} = props
    return <Box sx={{display: 'flex', gap: '20px', width: "100%"}}>
        {children}
    </Box>
})

export const TableActionsToolbar = {
    Wrapper,
    CreateButton
}
