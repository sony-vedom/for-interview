import { AutoCompleteControlled } from 'shared/ui/autocomplete'
import { useFormContext } from 'react-hook-form'
import { Box } from '@mui/material'
import { maxWidth } from 'pages/create-report-page/ui'

export const ToolsFields = () => {
    const { control } = useFormContext()
    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    width: '100%',
                    gap: 2,
                    justifySelf: 'center',
                    alignContent: 'start',
                    gridTemplateColumns: {
                        md: `repeat(3, 1fr)`
                    },
                    '& .MuiInputBase-root': {
                        maxWidth
                    }
                }}>
                <AutoCompleteControlled
                    data={[{
                        id: 1,
                        name: 'Вид'
                    }]}
                    required
                    control={control}
                    fieldName={'kind_tools'}
                    label={'Вид'}
                />
                <AutoCompleteControlled
                    data={[{
                        id: 1,
                        name: 'Марка'
                    }]}
                    required
                    control={control}
                    fieldName={'type_tools'}
                    label={'Марка'} />
                <AutoCompleteControlled
                    data={[{
                        id: 1,
                        name: '22110081'
                    }]}
                    required
                    control={control}
                    fieldName={'factory_number'}
                    label={'Заводской номер'} />
            </Box>
            {/*<ToolCard/>*/}
        </>
    )
}