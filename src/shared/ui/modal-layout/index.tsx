import type { FC, PropsWithChildren } from 'react'
import { ModalProps } from 'shared/lib/modal'
import { observer } from 'mobx-react-lite'
import { Box, CardContent, IconButton, LinearProgress, Modal, Tooltip } from '@mui/material'
import { CardLayout, CardStatus } from 'shared/ui/card-layout'
import CloseIcon from '@mui/icons-material/Close'

export const ModalLayout: FC<PropsWithChildren<ModalProps & { isLoading?: boolean }>> = observer((props) => {
    const { handleModal, isOpen, children, isLoading } = props
    return (
        <>
            <Modal open={isOpen} onClose={handleModal}>
                <>
                    <CardLayout minHeight={'50px'} minWidth={'50px'} status={CardStatus.SUCCESS} cardProps={{
                        sx: {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: 400,
                            width: 'calc(100vw - 32px)'
                        }
                    }}>
                        <Box sx={{
                            height: 3
                        }}>
                            {isLoading && <LinearProgress />}
                        </Box>
                        <CardContent sx={{
                            display: 'grid',
                            gap: 2,
                            maxHeight: '800px',
                            overflow: 'auto',
                            alignContent: 'start',
                            height: 'calc(100vh - 32px)',
                        }}>
                            <Tooltip title={'Закрыть'}>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleModal}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500]
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                            {children}
                        </CardContent>
                    </CardLayout>
                </>
            </Modal>
        </>
    )
})