import { Box } from '@mui/material'
import { maxWidth } from 'pages/create-report-page/ui'
import { AutoCompleteControlled } from 'shared/ui/autocomplete'
import { useFormContext } from 'react-hook-form'

export const StandartFields = () => {
    const { control } = useFormContext()
    return (
        <Box
            sx={{
                display: 'grid',
                maxWidth,
                gap: 2,
                justifySelf: 'center',
                width: '100%',
                alignContent: 'start'
            }}>
            <AutoCompleteControlled
                data={[{
                    id: 1,
                    name: 'Категория 1 DS-1 что-то там'
                }]}
                required
                control={control}
                fieldName={'categories'}
                label={'Категория'} />
        </Box>
    )
}
