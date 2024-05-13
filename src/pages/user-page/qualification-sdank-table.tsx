import {
    QualificationTable,
    QualificationType
} from 'features/qualification-table'

const mockRowsSDANK = {
    uzk: { displayName: 'УЗК', date: '2024-04-22' },
    vik: { displayName: 'ВИК', date: '2024-04-22' },
    mpd: { displayName: 'МПД', date: '2024-04-22' },
    pvk: { displayName: 'ПВК', date: '2024-04-22' }
}

export const QualificationSDANKTable = () => {
    return (
        <QualificationTable
            type={QualificationType.SDANK}
            rows={mockRowsSDANK}
        />
    )
}
