import { Navigate, Outlet } from 'react-router-dom'
import { navItemType } from 'shared/lib/navigation'
import { ROUTES, ROUTES_PARAMS } from 'shared/config/routes'
import EngineeringIcon from '@mui/icons-material/Engineering'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'

const base: navItemType[] = [
    {
        path: ROUTES.DOCUMENTS,
        element: <Outlet />,
        displayName: 'Документы',
        children: [
            {
                index: true,
                lazy: async () => {
                    let { DocumentsPage } = await import(
                        'pages/documents-page'
                        )
                    return { Component: DocumentsPage }
                }
            },
            {
                displayName: 'Отчеты по комплектам труб',
                children: [
                    {
                        displayName: 'Отчеты по СБТ',
                        path: ROUTES.SBT,
                        lazy: async () => {
                            let { SbtReportPage } = await import(
                                'pages/reports-page'
                                )
                            return { Component: SbtReportPage }
                        }
                    },
                    {
                        displayName: 'Отчеты по ТБТ',
                        path: ROUTES.TBT,
                        element: (
                            <>
                                Отчет по ТБТ
                            </>
                        )
                    },
                    {
                        displayName: 'Отчеты по УБТ',
                        path: ROUTES.UBT,
                        element: (
                            <>
                                Отчет по УБТ
                            </>
                        )
                    }
                ]
            },
            {
                displayName: 'Договоры',
                path: ROUTES.CONTRACTS,
                lazy: async () => {
                    let { ContractPage } = await import(
                        'pages/contract-page'
                        )
                    return { Component: ContractPage }
                }
            }
        ]
    },
    {
        path: ROUTES.TOOLS,
        displayName: 'Оборудование',
        lazy: async () => {
            let { ToolsPage } = await import(
                'pages/tools-page'
                )
            return { Component: ToolsPage }
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    let { ToolsIndexPage } = await import(
                        'pages/tools-page'
                        )
                    return { Component: ToolsIndexPage }
                }
            },
            {
                path: ROUTES.KIND_TOOLS,
                displayName: 'Виды оборудования',
                lazy: async () => {
                    let { KindToolsPage } = await import(
                        'pages/tools-page'
                        )
                    return { Component: KindToolsPage }
                }
            },
            {
                path: ROUTES.TYPE_TOOLS,
                displayName: 'Типы оборудования',
                lazy: async () => {
                    let { TypeToolsPage } = await import(
                        'pages/tools-page'
                        )
                    return { Component: TypeToolsPage }
                }
            }
        ]
    },
    {
        path: ROUTES.USERS,
        displayName: 'Сотрудники',
        children: [
            {
                index: true,
                lazy: async () => {
                    let { UsersPage } = await import(
                        'pages/users-page'
                        )
                    return { Component: UsersPage }
                }
            }
        ]
    },
    {
        path: ROUTES.CONSUMERS,
        displayName: 'Заказчики',
        children: [
            {
                index: true,
                lazy: async () => {
                    let { ConsumerPage } = await import(
                        'pages/consumer-page'
                        )
                    return { Component: ConsumerPage }
                }
            }
        ]
    },
    {
        path: ROUTES.DIRECTORY,
        element: <Outlet />,
        displayName: 'Справочники',
        children: [
            {
                index: true,
                lazy: async () => {
                    let { DirectoryPage } = await import(
                        'pages/directory-page'
                        )
                    return { Component: DirectoryPage }
                }
            },
            {
                displayName: 'Нормы отбраковки',
                children: [
                    {
                        displayName: 'Нормы отбраковки СБТ',
                        path: ROUTES.SBT_REJECTION_STANDARDS,
                        lazy: async () => {
                            let { SbtRejectionStandardPage } = await import(
                                'pages/sbt-rejection-standard-page'
                                )
                            return { Component: SbtRejectionStandardPage }
                        }
                    }
                ]
            },
            {
                displayName: 'Стандарты и процедуры',
                path: ROUTES.STANDARDS_PROCEDURES_SBT,
                lazy: async () => {
                    let { StandardsProceduresSbtPage } = await import(
                        'pages/standards-procedures-sbt-page'
                        )
                    return { Component: StandardsProceduresSbtPage }
                }
            }
        ]
    }
]

const userChildren: navItemType[] = [
    { index: true, element: <Navigate to={`${ROUTES.SPECIALIZED_EDUCATION}`} /> },
    {
        path: ROUTES.SPECIALIZED_EDUCATION,
        displayName: 'Целевые обученности',
        icon: <EngineeringIcon />,
        lazy: async () => {
            let { QualificationEducationPage } = await import(
                'pages/qualification-education'
                )
            return { Component: QualificationEducationPage }
        },
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.ASNT} />
            },
            {
                path: ROUTES.ASNT,
                lazy: async () => {
                    let { AsntPage } = await import(
                        'pages/qualification-education'
                        )
                    return { Component: AsntPage }
                }
            },
            {
                path: ROUTES.SDANK,
                lazy: async () => {
                    let { SdankPage } = await import(
                        'pages/qualification-education'
                        )
                    return { Component: SdankPage }
                }
            }
        ]
    },
    {
        path: ROUTES.NON_SPECIALIZED_EDUCATION,
        displayName: 'Нецелевые обученности',
        icon: <ChecklistRtlIcon />,
        lazy: async () => {
            let { SimpleEducationPage } = await import(
                'pages/simple-education'
                )
            return { Component: SimpleEducationPage }
        }
    },
    {
        path: ROUTES.MEDICAL_EXAMINATION,
        displayName: 'Медицинская комиссия',
        icon: <LocalHospitalIcon />,
        lazy: async () => {
            let { MedicalExaminationPage } = await import(
                'pages/medical-examination'
                )
            return { Component: MedicalExaminationPage }
        }
    }
]

const profile: navItemType[] = [
    {
        path: ROUTES.PROFILE,
        displayName: 'Профиль',
        lazy: async () => {
            let { ProfilePage } = await import('pages/user-page')
            return { Component: ProfilePage }
        },
        children: userChildren
    }
]

const user: navItemType[] = [
    {
        path: `${ROUTES.USERS}/:${ROUTES_PARAMS.userId}`,
        children: userChildren,
        lazy: async () => {
            let { UserPage } = await import(
                'pages/user-page'
                )
            return { Component: UserPage }
        }
    }
]

const createReport: navItemType[] = [
    {
        path: ROUTES.CREATE_REPORT,
        displayName: 'Начало создания отчета',
        lazy: async () => {
            let { CreateReportPage } = await import(
                'pages/create-report-page'
                )
            return { Component: CreateReportPage }
        },
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.SBT} />
            },
            {
                path: ROUTES.SBT,
                lazy: async () => {
                    let { CreateReportPageItem } = await import(
                        'pages/create-report-page'
                        )
                    return { Component: CreateReportPageItem }
                }
            }

        ]

    }
]

const report: navItemType[] = [
    {
        path: `${ROUTES.REPORT}/:${ROUTES_PARAMS.reportId}`,
        displayName: 'Отчет',
        lazy: async () => {
            let { ReportOnePage } = await import(
                'pages/report-one-page'
                )
            return { Component: ReportOnePage }
        }
    }
]

export const navigationConfig = {
    base,
    profile,
    user,
    createReport,
    report
}
