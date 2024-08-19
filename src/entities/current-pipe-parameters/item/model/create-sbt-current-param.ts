import {
    ISbtCoupling,
    ISbtNipple,
    ISbtPipeBody
} from 'entities/current-pipe-parameters/item/model/sbt-current-param.ts'
import { ICreateBasePipeCurrentParam } from 'entities/current-pipe-parameters/item/model/base-type'

type OmitParametersNippleAndCoupling =
    | 'condition_lock_connection'
    | 'lock_connection_class'

export interface ICreateSbtNipple
    extends Omit<ISbtNipple, OmitParametersNippleAndCoupling> {}

export interface ICreateSbtCoupling
    extends Omit<ISbtCoupling, OmitParametersNippleAndCoupling> {}

export interface ICreateSbtPipeBody
    extends Omit<ISbtPipeBody, 'body_class'> {}

export interface ICreateCurrentSbtParams
    extends ICreateBasePipeCurrentParam<ICreateSbtPipeBody, ICreateSbtNipple, ICreateSbtCoupling> {
    minimum_wall_thickness_ultra: number
    minimum_wall_thickness_premium: number
    minimum_wall_thickness_class_2: number
}
