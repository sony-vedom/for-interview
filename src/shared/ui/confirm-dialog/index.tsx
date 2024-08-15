import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import React, {FC} from "react";

export interface ConfirmationDialogRawProps {
    onConfirm: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    open: boolean;
    onClose: () => void;
    dialogText: string
}


export const ConfirmDialog: FC<ConfirmationDialogRawProps> = (props) => {
    const {onClose, onConfirm, open, dialogText} = props;

    const handleCancel = () => {
        onClose()
    };
    const handleOk = () => {
        onClose()
        onConfirm()
    };
    return (
        <Dialog
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    maxHeight: 435,
                },
                "& .MuiDialog-container": {
                    alignItems: 'flex-start',
                    verticalAlign: 'top',
                }
            }}
            maxWidth="xs"
            open={open}
        >
            <DialogContent dividers>
                {dialogText}
            </DialogContent>
            <DialogActions>
                <Button autoFocus color="error" sx={{width: "90px", height: "34px", fontSize: "14px"}}
                        variant={"outlined"} onClick={handleCancel}>
                    Отмена
                </Button>
                <Button onClick={handleOk} sx={{width: "72px", height: "34px", fontSize: "14px"}}
                        variant={"contained"}>Да</Button>
            </DialogActions>
        </Dialog>
    );
}