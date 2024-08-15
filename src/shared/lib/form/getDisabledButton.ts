import { Meta } from 'shared/api'

export const getDisabledButton = (meta: string) => {
    return meta === Meta.DELETING ||
        meta === Meta.SAVING || meta === Meta.EDITING ||
        meta === Meta.LOADING || meta === Meta.FETCHING ||
        meta === Meta.LOADING
}
