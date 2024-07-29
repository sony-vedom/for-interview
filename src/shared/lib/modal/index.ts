import {useState} from "react";

export const useModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return {
        isOpen,
        handleModal: (value?: boolean) => {
            setIsOpen(typeof value === "boolean" ? value : !isOpen)
        }
    }
}
