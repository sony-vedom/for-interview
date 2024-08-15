import { useEffect } from 'react'

export interface LifeCycledModel {
    init: (pagination?: any, filters?: any) => void;
    destroy: () => void;
}

export const useLifecycledModelEffect = <M extends LifeCycledModel>(model: M) => {
    useEffect(() => {
        model?.init()
        return () => model?.destroy()
    }, [])
}
