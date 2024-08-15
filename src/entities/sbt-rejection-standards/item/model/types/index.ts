import { ThreadLockingConnection } from 'entities/sbt-rejection-standards/thread-locking-connection/@x'

export interface KindPipeStandarts {
    minimum_outer_diameter: number
    maximum_inner_diameter: number
    min_chamfer_diameter: number
    min_width_thrust_shoulder: number
}

export enum StrengthGroup {
    E = "E",
    G = "G",
    S = "S",
    X = "X"
}

export interface SbtRejectionStandards {
    id: number

    lock_thread: ThreadLockingConnection

    nominal_pipe_diameter: number
    wall_thickness: number
    strength_group: string

    ultra: KindPipeStandarts
    premium: KindPipeStandarts
    class_2: KindPipeStandarts

    minimum_length_key_installation_location: {
        nipple: number
        coupling: number
    }

    max_chamfer_diameter: number
    maximum_boring: number
}

export interface SbtRejectionStandardsEdit extends Partial<Omit<SbtRejectionStandards, 'id' | 'lock_thread'>> {
    lock_thread_id: number
}


export interface SbtRejectionStandardsCreate extends Omit<SbtRejectionStandards, 'id' | 'lock_thread'> {
    lock_thread_id: number
}
