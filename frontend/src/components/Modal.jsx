import React, { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable";
import { getThemeProps } from "@material-ui/styles";

const modal = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '150px',
    left: '150px'
}

const Modal = ({ children, open, handleClose }) => {

    useEffect(() => {
        if (open)
            document.addEventListener("click", handleClick)

    }, [open])

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            return;
        }
        else {
            handleClose()
            document.removeEventListener("click", handleClick);

        }
    }


    const node = useRef();
    return (
        <div ref={node}>
            <Draggable>
                <div style={modal}
                >
                    {open && children}
                </div>
            </Draggable >
        </div>
    )

}

export default Modal