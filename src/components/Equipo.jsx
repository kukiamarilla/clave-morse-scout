import classNames from "classnames";
import React, { useContext } from "react";
import { GlobalStateContext } from "../App";
import './Equipo.css'

export const Equipo = ({align = 'left', number, integrantes}) => {
    const {globalState, selectPlayer} = useContext(GlobalStateContext);
    
    return (
        <div className="Equipo" style={{textAlign: align}}>
            <h2>Equipo {number}</h2>
            {integrantes && integrantes.map((integrante,index) =>
                <h4 key={index} className={classNames({
                    selected: integrante.selected,
                    won: integrante.won,
                    active: globalState && globalState.activeTeam === parseInt(number) && globalState.activePlayer === index,
                })} onClick={() => selectPlayer(parseInt(number), index)}>{index + 1} - {integrante.name}</h4>
            )}
        </div>
    );
}