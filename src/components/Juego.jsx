import React, { useContext } from "react";
import { GlobalStateContext } from "../App";
import { useShortcuts } from "../hooks/useShortcuts";
import { useTelegraph } from "../hooks/useTelegraph";
import './Juego.css'
import { Palabra } from "./Palabra";
import { Shortcut } from "./Shorcut";

export const Juego = () => {
    const {globalState} = useContext(GlobalStateContext);
    useShortcuts();
    useTelegraph();
    return (
        <div className="Juego">
            <Palabra />
            
            {globalState && globalState.telegraphMode && <div className="telegrafo">
                <p>Presiona <span className="blue">Barra Espaciadora</span> para hacer sonar el telégrafo</p>
            </div>}
            {globalState && globalState.showHelp && <div className="shortcuts">
                <Shortcut letter="o" action="mostrar/ocultar ayuda"/>
                <Shortcut letter="i" action="iniciar partida nueva"/>
                <Shortcut letter="1" action="agregar jugador a equipo 1"/>
                <Shortcut letter="2" action="agregar jugador a equipo 2"/>
                <Shortcut letter="n" action="pasar al siguiente jugador"/>
                <Shortcut letter="t" action="activa/desactivar modo telégrafo"/>
                <Shortcut letter="e" action="eliminar jugador"/>
                <Shortcut letter="p" action="cambiar palabra"/>
            </div>}
        </div>
    );
}