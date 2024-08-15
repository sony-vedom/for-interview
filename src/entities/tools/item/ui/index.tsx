import { type FC } from 'react'
import { CardLayout, CardStatus } from 'shared/ui/card-layout'
import { Box, CardContent } from '@mui/material'
import { AppAvatar } from 'shared/ui/app-avatar'

export const ToolCard: FC = () => {
    return (
        <CardLayout cardProps={{
            sx: {
                width: "100%"
            }
        }} status={CardStatus.SUCCESS} minHeight={'426px'}
                    minWidth={'500px'}>
            <CardContent sx={{
                display: 'grid',
                gap: 5,
                gridTemplateColumns: "60px 1fr 1fr 1fr"
            }}>
                <div>
                    <AppAvatar sx={{
                        width: "60px",
                        height: "60px"
                    }}>sdjkf</AppAvatar>
                </div>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    Штангенциркуль ШЦ-I-0-250 №22110081
                </Box>
                <Box sx={{display: "flex", alignItems: "center"}}>Дата калибровки: 21.03.2010</Box>
                <Box sx={{display: "flex", alignItems: "center"}}>Следующая дата калибровки: 21.03.2011</Box>
                {/*<div>*/}
                {/*    <div><b>Вид:</b> Штангенциркуль</div>*/}
                {/*    <div>Марка: ШЦ-I-0-250</div>*/}
                {/*    <div>Заводской номер: 22110081</div>*/}
                {/*</div>*/}
                {/*<Box>*/}
                {/*    /!*<div>Категория для СБТ: 3</div>*!/*/}
                {/*    /!*<div>Категория для ТБТ и УБТ: 3-5</div>*!/*/}
                {/*    <div>Дата калибровки: 21.03.2010</div>*/}
                {/*    <div>Следующая дата калибровки: 21.03.2011</div>*/}
                {/*</Box>*/}
                {/*<Box>*/}
                {/*    <div>Дата калибровки: 21.03.2010</div>*/}
                {/*    <div>Следующая дата калибровки: 21.03.2011</div>*/}
                {/*</Box>*/}

            </CardContent>
        </CardLayout>
    )
}