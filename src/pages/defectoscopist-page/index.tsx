import { UserCard } from 'entities/user/item'
import { QualificationASNTTable } from './qualification-asnt-table.tsx'
import { QualificationSDANKTable } from './qualification-sdank-table.tsx'

export const DefectoscopistPage = () => {
    return (
        <UserCard
            name='Иванов Иван Иванович'
            position='Дефектоскопист'
            qualificationASNTComponent={QualificationASNTTable}
            qualificationSDANKComponent={QualificationSDANKTable}
        />
    )
}
