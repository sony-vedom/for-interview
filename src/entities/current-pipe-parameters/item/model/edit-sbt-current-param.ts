import {
    ISbtCoupling,
    ISbtNipple,
    ISbtPipeBody
} from 'entities/current-pipe-parameters/item/model/sbt-current-param.ts'
import {
    IEditBasePipeCurrentParam
} from 'entities/current-pipe-parameters/item/model/base-type'

type OmitParametersNippleAndCoupling =
    | 'condition_lock_connection'
    | 'lock_connection_class'

export interface IEditSbtNipple
    extends Partial<Omit<ISbtNipple, OmitParametersNippleAndCoupling>> {}

export interface IEditSbtCoupling
    extends Partial<Omit<ISbtCoupling, OmitParametersNippleAndCoupling>> {}

export interface IEditSbtPipeBody
    extends Partial<Omit<ISbtPipeBody, 'pipe_body_class'>> {}

export interface IEditCurrentSbtParams
    extends Required<IEditBasePipeCurrentParam<IEditSbtPipeBody, IEditSbtNipple, IEditSbtCoupling>> {
}
