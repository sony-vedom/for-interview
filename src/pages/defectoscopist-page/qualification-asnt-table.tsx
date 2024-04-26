import {
    QualificationTable,
    QualificationType,
} from 'features/qualification-table'

const mockRowsASNT = {
    ut: { displayName: 'UT', date: '2024-04-22' },
    mt: { displayName: 'MT', date: '2024-04-22' },
    emi: { displayName: 'EMI', date: '2024-04-22' },
    vt: { displayName: 'VT', date: '2024-04-22' },
    pt: { displayName: 'PT', date: '2024-04-22' },
}

export const QualificationASNTTable = () => {
    return (
        <QualificationTable type={QualificationType.ASNT} rows={mockRowsASNT} />
    )
}
