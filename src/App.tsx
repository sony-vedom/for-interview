import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
    QualificationTable,
    QualificationType,
} from 'features/qualification-table'
import { DefectoscopistCard } from 'entities/defectoscopist/card'

import './App.css'

const mockRowsASNT = {
    ut: { displayName: 'UT', date: '2024-04-22' },
    mt: { displayName: 'MT', date: '2024-04-22' },
    emi: { displayName: 'EMI', date: '2024-04-22' },
    vt: { displayName: 'VT', date: '2024-04-22' },
    pt: { displayName: 'PT', date: '2024-04-22' },
}

const mockRowsSDANK = {
    uzk: { displayName: 'УЗК', date: '2024-04-22' },
    vshs: { displayName: 'ВШС', date: '2024-04-22' },
    mpd: { displayName: 'МПД', date: '2024-04-22' },
    pvk: { displayName: 'ПВК', date: '2024-04-22' },
}

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#89cec4',
        },
        secondary: {
            main: '#de547b',
        },
    },
})

const QualificationASNTTable = () => {
    return (
        <QualificationTable type={QualificationType.ASNT} rows={mockRowsASNT} />
    )
}

const QualificationSDANKTable = () => {
    return (
        <QualificationTable
            type={QualificationType.SDANK}
            rows={mockRowsSDANK}
        />
    )
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <DefectoscopistCard
                name='Иванов Иван Иванович'
                position='Дефектоскопист'
                qualificationASNTComponent={QualificationASNTTable}
                qualificationSDANKComponent={QualificationSDANKTable}
            />
        </ThemeProvider>
    )
}

export default App
