import { ROUTES } from 'shared/config/routes'
import { KIND_QUALIFICATION_EDUCATION } from 'entities/qualification-education/kind/@x'

export const getQualificationEducationUrlParams = () => {
    if (window.location.href.includes(ROUTES.ASNT)) {
        return KIND_QUALIFICATION_EDUCATION.ASNT
    }
    if (window.location.href.includes(ROUTES.SDANK)) {
        return KIND_QUALIFICATION_EDUCATION.SDANK
    }
    return KIND_QUALIFICATION_EDUCATION.ASNT
}