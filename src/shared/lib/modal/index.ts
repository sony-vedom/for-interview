import {useState} from "react";

export const useModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return {
        isOpen,
        handleModal: () => {
            setIsOpen((prevState) => !prevState)
        }
    }
}

export interface ModalProps {
    isOpen: boolean,
    handleModal: () => void
}
