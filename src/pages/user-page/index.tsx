import { UserCard } from 'entities/user/item'
import { QualificationASNTTable } from './qualification-asnt-table.tsx'
import { QualificationSDANKTable } from './qualification-sdank-table.tsx'

export const UserPage = () => {
    return (
        <UserCard
            user={{
                firstName: "Иван",
                secondName: "Иванович",
                lastName: "Иванов",
                photoUrl: null,
                position: "Дефектоскопист",
                birthday: '1990-01-20',
            }}
            qualificationASNTComponent={<QualificationASNTTable/>}
            qualificationSDANKComponent={<QualificationSDANKTable/>}
        />
    )
}
