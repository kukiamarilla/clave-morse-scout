import React from "react";
import './Header.css'
import jotajoti from '../assets/images/jota-joti.png'

export const Header = () => {
    return (
        <div className="header">
            <div className="brand">
                <img src={jotajoti} alt="" />
            </div>
            <div className="title">
                <h1>Clave Morse Scout</h1>
            </div>
            <div className="balance"></div>
        </div>
    );
}