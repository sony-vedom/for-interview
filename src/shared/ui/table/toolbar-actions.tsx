import {type FC, type PropsWithChildren} from "react";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";

const CreateButton: FC<{
    createIconText: string,
    handleCreate: () => void,
}> = (props) => {
    const {createIconText, handleCreate} = props
    return <>
        <Button
            size={"medium"}
            variant="contained"
            onClick={handleCreate}
        >
            {createIconText}
        </Button>
    </>
}

const Wrapper: FC<PropsWithChildren> = (props) => {
    const {children} = props
    return <Box sx={{display: 'flex', gap: '20px', width: "100%"}}>
        {children}
    </Box>
}

export const TableActionsToolbar = {
    Wrapper,
    CreateButton
}
