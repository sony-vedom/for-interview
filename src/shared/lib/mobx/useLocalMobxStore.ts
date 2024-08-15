import { useRef } from "react";

export const useMobXLocalStore = <T>(creator: () => T): T => {
    const container = useRef<null | T>(null);

    if (container.current === null) {
        container.current = creator();
    }

    return container.current;
};
