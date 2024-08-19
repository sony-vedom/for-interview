import {
    STATUS_CARBIDE_SURFACING_COLLAPSE, STATUS_CLASS,
    STATUS_DEFECTS, STATUS_REPAIR, STATUS_VIK
} from '../../../model/parameters-statuces'

class ProtoNippleAndCoupling {
    outer_diameter: number
    chamfer_diameter: number
    key_installation_location: number

    constructor(builder: {
        outer_diameter: number
        chamfer_diameter: number
        key_installation_location: number
    }) {
        this.outer_diameter = builder.outer_diameter
        this.chamfer_diameter = builder.chamfer_diameter
        this.key_installation_location = builder.key_installation_location
    }
}

export class NippleAndCouplingBuilder {
    outer_diameter: number
    chamfer_diameter: number
    key_installation_location: number
    carbide_surfacing?: `${STATUS_CARBIDE_SURFACING_COLLAPSE}`
    magnet?: `${STATUS_DEFECTS}`
    vik?: `${STATUS_VIK}`
    condition_lock_connection?: `${STATUS_REPAIR}`
    lock_connection_class?: `${STATUS_CLASS}`

    constructor(builder: {
        outer_diameter: number
        chamfer_diameter: number
        key_installation_location: number
    }) {
        const item = new ProtoNippleAndCoupling(builder)
        this.outer_diameter = item.outer_diameter
        this.chamfer_diameter = item.chamfer_diameter
        this.key_installation_location = item.key_installation_location
    }

    addCarbideSurfacing(carbide_surfacing: typeof this.carbide_surfacing) {
        this.carbide_surfacing = carbide_surfacing
        return this
    }

    addMagnet(magnet: typeof this.magnet) {
        this.magnet = magnet
        return this
    }

    addVik(vik: typeof this.vik) {
        this.vik = vik
        return this
    }

    addConditionLockConnection(
        condition_lock_connection: typeof this.condition_lock_connection
    ) {
        this.condition_lock_connection = condition_lock_connection
        return this
    }

    addLockConnectionClass(
        lock_connection_class: typeof this.lock_connection_class
    ) {
        this.lock_connection_class = lock_connection_class
        return this
    }

    build() {
        throw new Error(`В ${this.constructor.name} нельзя вызвать этот метод`)
    }
}

export class CouplingBuilder extends NippleAndCouplingBuilder {
    thrust_shoulder_width?: number
    diameter_cone_recess?: number
    depth_cone_recess?: number

    constructor(builder: {
        outer_diameter: number
        chamfer_diameter: number
        key_installation_location: number
    }) {
        super(builder)
    }

    addThrustSholderWidth(
        thrust_shoulder_width: typeof this.thrust_shoulder_width
    ) {
        this.thrust_shoulder_width = thrust_shoulder_width
        return this
    }

    addDiameterConeReccess(
        diameter_cone_recess: typeof this.diameter_cone_recess
    ) {
        this.diameter_cone_recess = diameter_cone_recess
        return this
    }

    addDepthCodeRecess(depth_cone_recess: typeof this.depth_cone_recess) {
        this.depth_cone_recess = depth_cone_recess
        return this
    }

    build() {
        return this
    }
}

export class NippleBuilder extends NippleAndCouplingBuilder {
    thread_length?: number
    inner_diameter?: number

    constructor(builder: {
        outer_diameter: number
        chamfer_diameter: number
        key_installation_location: number
    }) {
        super(builder)
    }

    addThreadLength(thread_length: number) {
        this.thread_length = thread_length
        return this
    }

    addInnerDiameter(inner_diameter: number) {
        this.inner_diameter = inner_diameter
        return this
    }

    build() {
        return this
    }
}

