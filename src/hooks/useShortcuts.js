import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../App";

export const useShortcuts = () => {
    const {
        globalState,
        setShowHelp,
        refreshWord,
        restartState,
        addTeam1Player,
        addTeam2Player,
        nextPlayer,
        removeSelectedPlayer,
        setTelegraphMode,
    } = useContext(GlobalStateContext);
    const { pressingShift } = globalState ?? {pressingShift: false};
    
    const procedures = {
        o: () => {
            setShowHelp(!globalState.showHelp);
        },
        p: refreshWord,
        i: () => {
            const conf = window.confirm("Estás seguro de reiniciar el juego? Se perderá todo el progreso y los equipos");
            if(conf) restartState()
        },
        "!": () => {
            const nombre = window.prompt("Nombre del jugador");
            if (nombre) {
                addTeam1Player(nombre);
            }
        },
        "@": () => {
            const nombre = window.prompt("Nombre del jugador");
            if (nombre) {
                addTeam2Player(nombre);
            }
        },
        "n": nextPlayer,
        "e": () => {
            const conf = window.confirm("Estás seguro de eliminar el jugador seleccionado?");
            if(conf) removeSelectedPlayer();
        },
        "t": () => {
            setTelegraphMode(!globalState.telegraphMode);
        }


    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!pressingShift) return;
            if(e.key.toLowerCase() in procedures) {
                procedures[e.key.toLowerCase()]();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [globalState]);
}