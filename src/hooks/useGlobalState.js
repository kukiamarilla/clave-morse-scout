import { useEffect, useState } from "react";
import { newWord } from "../helpers/newWord";

export const useGlobalState = (dependencies) => {

    const [globalState, setGlobalState] = useState();
    
    const initialState = {
        word: 'aaaaaa',
        team1: [],
        team2: [],
        showHelp: true,
        showResponse: true,
        telegraphMode: false,
        teamEditMode: false,
        activeTeam: 2,
        activePlayer: -1,
        lastPlayer: -1,
        pressingShift: false,
    }

    const initializeState = () => {
        const state = JSON.parse(localStorage.getItem('claveMorseScout'));
        if (state) {
            setGlobalState(state);
            return;
        }
        setGlobalState(initialState);
        localStorage.setItem('claveMorseScout', JSON.stringify(initialState));
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Shift') {
                setGlobalState((state) => ({
                    ...state,
                    pressingShift: true,
                }))
            }
        }
        const handleKeyUp = (e) => {
            if (e.key === 'Shift') {
                setGlobalState((state) => ({
                    ...state,
                    pressingShift: false,
                }))
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    }, []);
    useEffect(() => {
        initializeState();
    }, [])

    const restartState = () => {
        setGlobalState(initialState);
        localStorage.setItem('claveMorseScout', JSON.stringify(initialState));
    }

    const setShowHelp = (value) => {
        setGlobalState({...globalState, showHelp: value});
        localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, showHelp: value}));
    }

    const setShowResponse = (value) => {
        setGlobalState({...globalState, showResponse: value});
        localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, showResponse: value}));
    }

    const setTelegraphMode = (value) => {
        setGlobalState({...globalState, telegraphMode: value});
        localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, telegraphMode: value}));
    }

    const setTeamEditMode = (value) => {
        setGlobalState({...globalState, teamEditMode: value});
        localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, teamEditMode: value}));
    }

    const nextPlayer = () => {
        if(globalState.team1.length === 0 || globalState.team2.length === 0) return;
        if(!globalState.team1.some(player => !player.won) || !globalState.team2.some(player => !player.won)) {
            alert("Todos los jugadores de un equipo han ganado. Reinicia el juego para empezar de nuevo");
            return;
        }
        let nextTeam;
        let nextPlayer
        nextTeam = globalState.activeTeam === 1 ? 2 : 1;
        nextPlayer = globalState.lastPlayer + 1;
        nextPlayer = nextPlayer % globalState[`team${nextTeam}`].length;
        while(globalState[`team${nextTeam}`][nextPlayer].won) {
            nextPlayer++;
            nextPlayer = nextPlayer % globalState[`team${nextTeam}`].length;
        }
        const word = newWord()
        setGlobalState({...globalState, activeTeam: nextTeam, activePlayer: nextPlayer, lastPlayer: globalState.activePlayer, word: word});
    }

    const addTeam1Player = (name) => {
        const player = {
            name,
            won: false,
            selected: false,
        }
        setGlobalState({...globalState, team1: [...globalState.team1, player]});
        localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, team1: [...globalState.team1, player]}));
    }

    const addTeam2Player = (name) => {
        const player = {
            name,
            won: false,
            selected: false,
        }
        setGlobalState({...globalState, team2: [...globalState.team2, player]});
        localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, team2: [...globalState.team2, player]}));
    }

    const removeSelectedPlayer= () => {
        const team1 = globalState.team1.filter(player => !player.selected);
        const team2 = globalState.team2.filter(player => !player.selected);
        setGlobalState({...globalState, team1, team2});
        localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, team1, team2}));
    }

    // it has to unselect all players and select the one clicked
    const selectPlayer = (team, index) => {
        const team1 = globalState.team1.map((player, i) => {
            return {
                ...player,
                selected: false,
            }
        });
        const team2 = globalState.team2.map((player, i) => {
            return {
                ...player,
                selected: false,
            }
        });
        if(team === 1){
            team1[index].selected = true;
        } else {
            team2[index].selected = true;
        }
        setGlobalState({...globalState, team1, team2});
        localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, team1, team2}));
        
    }
   
    const winActivePlayer = () => {
        if(globalState.activePlayer === -1) return;
        if(globalState.activeTeam === 1){
            const team1 = globalState.team1.map((player, i) => {
                if(i === globalState.activePlayer) player.won = true;
                return player;
            })
            setGlobalState({...globalState, team1});
            localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, team1}));
        } else {
            const team2 = globalState.team2.map((player, i) => {
                if(i === globalState.activePlayer) player.won = true;
                return player;
            })
            setGlobalState({...globalState, team2});
            localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, team2}));
        }
    }

    const refreshWord = () => {
        const word = newWord();
        setGlobalState({...globalState, word});
        localStorage.setItem('claveMorseScout', JSON.stringify({...globalState, word}));
    }

    return {
        globalState,
        restartState,
        setShowHelp,
        setShowResponse,
        setTelegraphMode,
        setTeamEditMode,
        nextPlayer,
        addTeam1Player,
        addTeam2Player,
        selectPlayer,
        removeSelectedPlayer,
        winActivePlayer,
        refreshWord,
        initializeState,
    }


}