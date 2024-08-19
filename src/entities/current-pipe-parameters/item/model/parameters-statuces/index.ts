export enum STATUS_CLASS {
    ULTRA = 'Ультра',
    PREMIUM = 'Премиум',
    CLASS_2 = 'Класс 2',
    DEFECT = 'Брак'
}

export enum STATUS_DEFECTS {
    NULLABLE = '-',
    NOT_HAS_DEFECTS = 'ДН',
    NOT_SUITABLE = 'Негодно'
}

export enum STATUS_REPAIR {
    SUITABLE = 'Годно',
    REPAIR = 'Рем',
    GRINDING = 'Шл'
}

export enum STATUS_CARBIDE_SURFACING_COLLAPSE {
    OK = 'ОК',
    NOT_DETECTED = 'НО'
}

export enum STATUS_PIPE {
    NORMAL = 'Действующая',
    REPAIR = 'Ремонт',
    DEFECT = 'Брак'
}

export enum STATUS_VIK {
    NOT_HAS_DEFECTS = STATUS_DEFECTS.NOT_HAS_DEFECTS,
    THREAD_DAMAGE = 'ПР',
    CORROSION = 'Корр',
    THREAD_CORROSION = 'КР',
    END_DAMAGE = 'ПТ',
    SEAL_CORROSION = 'КТ',
    THREAD_AND_SEAL_CORROSION = 'КРиУ',
    COUPLING_SWELLING = 'РМ',
    DIMENSIONS_TOLERANCE_OUT = 'РВД'
}

export enum STATUS_VIK_PIPE {
    NO_DEFECTS = STATUS_DEFECTS.NOT_HAS_DEFECTS,
    WASHING = 'Пром',
    BROKEN = 'Слом'
}