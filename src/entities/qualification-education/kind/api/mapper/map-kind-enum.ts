import { KIND_QUALIFICATION_EDUCATION_DTO } from 'entities/qualification-education/kind/api'
import { KIND_QUALIFICATION_EDUCATION } from 'entities/qualification-education/kind/model/types'

export const mapKindEducation = (dto: KIND_QUALIFICATION_EDUCATION_DTO): KIND_QUALIFICATION_EDUCATION => {
    switch (dto) {
        case KIND_QUALIFICATION_EDUCATION_DTO.ASNT: {
            return KIND_QUALIFICATION_EDUCATION.ASNT
        }
        case KIND_QUALIFICATION_EDUCATION_DTO.SDANK: {
            return KIND_QUALIFICATION_EDUCATION.SDANK
        }
        default: {
            return KIND_QUALIFICATION_EDUCATION.SDANK
        }
    }
}

export const mapKindEducationFromModel = (dto: KIND_QUALIFICATION_EDUCATION): KIND_QUALIFICATION_EDUCATION_DTO => {
    switch (dto) {
        case KIND_QUALIFICATION_EDUCATION.ASNT: {
            return KIND_QUALIFICATION_EDUCATION_DTO.ASNT
        }
        case KIND_QUALIFICATION_EDUCATION.SDANK: {
            return KIND_QUALIFICATION_EDUCATION_DTO.SDANK
        }
        default: {
            return KIND_QUALIFICATION_EDUCATION_DTO.SDANK
        }
    }
}