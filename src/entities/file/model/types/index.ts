export interface AppFile {
    id: number,
    created_at: Date
}

export enum BASE_FILE_URLS {
    ANNUAL_MEDICAL_EXAMINATION = 'annual_medical_examination',
    SIMPLE_EDUCATION = 'simple_education',
    QUALIFICATION_EDUCATION = 'qualification_education',
    TOOLS = 'tools',
    CONTRACT = 'contract',
}

export type idNames = 'medical_id' | 'education_id' | 'tools_id' | "contract_id"