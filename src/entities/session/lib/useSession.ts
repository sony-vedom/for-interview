import { useContext } from 'react'
import { AuthContext } from '../model/context.ts'

export const useSession = () => {
    return useContext(AuthContext)
}
