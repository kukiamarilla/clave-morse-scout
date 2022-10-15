import React from "react";
import './Shorcut.css'

export const Shortcut = ({letter, action}) => {
    return (
        <div className="Shortcut">
            <div className="tecla"><span>shift</span></div>
            <span>+</span>
            <div className="tecla"><span>{letter}</span></div>
            <span>:&nbsp;&nbsp;</span>
            <span>{action}</span>
        </div>
    );
}