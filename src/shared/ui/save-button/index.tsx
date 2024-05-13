import SaveIcon from '@mui/icons-material/Save'
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'
import { FC } from 'react'

export const SaveButton: FC<LoadingButtonProps> = (props) => {
    return (
        <LoadingButton
            variant="contained"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            type={'submit'}
            {...props}>
            Сохранить
        </LoadingButton>
    )
}
