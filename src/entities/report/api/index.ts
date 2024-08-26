import { apiInstance, Pagination, PaginationQuery } from 'shared/api'
import {
    GetReportQuery,
    GetReportQueryFilters
} from './query/get-sbt-rejection-standards.query.ts'
import { preparedQueryParamsForRequest } from 'shared/lib/helpers'
import { Report, ReportCreate, ReportEdit, ReportFinish } from 'entities/report'

const BASE_URL = '/report_sbt/'

export const getReportsList = async (pagination?: PaginationQuery, filters?: GetReportQueryFilters): Promise<Pagination<Report[]>> => {
    const res = await apiInstance.get<Pagination<Report[]>>(`${BASE_URL}`, {
        params: preparedQueryParamsForRequest(pagination, filters)
    })
    return res.data
}

export const createReport = async (body: ReportCreate): Promise<Report> => {
    const res = await apiInstance.post<Report>(`${BASE_URL}`, body)
    return res.data
}

export const getReport = async (params: GetReportQuery): Promise<Report> => {
    const res = await apiInstance.get<Report>(`${BASE_URL}${params.report_id}`)
    return res.data
}

export const editReport = async (params: GetReportQuery & ReportEdit): Promise<Report> => {
    const { report_id, ...rest } = params
    const res = await apiInstance.patch<Report>(`${BASE_URL}${report_id}`, rest)
    return res.data
}

export const deleteReport = async (params: GetReportQuery): Promise<any> => {
    return await apiInstance.delete(`${BASE_URL}${params.report_id}`)
}

export const finishReport = async(params: GetReportQuery & ReportFinish): Promise<Report> => {
    const { report_id, ...rest } = params
    const res = await apiInstance.patch<Report>(`${BASE_URL}finish_report/${report_id}`, rest)
    return res.data
}