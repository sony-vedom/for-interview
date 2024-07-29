import { PipeParameter } from 'entities/default-parameter'

type pipeParametersKeys = keyof Omit<PipeParameter, 'id' | 'name'>
export const displayNamesPipeParameter: {
    [key in pipeParametersKeys]: string
} = {
    pipe_type: 'Тип трубы',
    nominal_pipe_diameter: 'Номинальный диаметр трубы',
    weight: 'Вес (кг)',
    reinforcement: 'Армирование',
    internal_coating: 'Внутреннее покрытие',
    pipe_inner_diameter: 'Внутренний диаметр трубы',
    lock_outside_diameter: 'Наружний диаметр замка',
    lock_inner_diameter: 'Внутренний диаметр замка',
    strength_group: 'Группа прочности',
    size_range: 'Размерный ряд',
    lock_thread: 'Резьба замкового соединения',
    lock_type: 'Тип замка',
    type_shoulder_pad: 'Тип заплечика',
    wall_thickness: 'Толщина стенки (мм)',
    side_square: 'Сторона квадрата (м)',
    sub_pipe_type: 'Подтип трубы'
}