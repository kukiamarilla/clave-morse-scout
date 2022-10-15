import { useContext, useEffect } from "react"
import { GlobalStateContext } from "../App";

export const useTelegraph = () => {
    const {globalState } = useContext(GlobalStateContext);
    const {telegraphMode} = globalState ?? {telegraphMode: false};

    useEffect(() => {
        
        let oscillator;
        const handleKeyDown = (e) => {
            if(e.repeat) return;
            if (!telegraphMode) return;
            if (e.key === ' ') {
                console.log("E")
                const context = new AudioContext();
                oscillator = context.createOscillator();
                oscillator.type = "sine";
                oscillator.frequency.value = 800;
                oscillator.connect(context.destination);
                oscillator.start(); 
            }
        }
        const handleKeyUp = (e) => {
            if (!telegraphMode) return;
            if (e.key === ' ') {
                console.log("P")
                e.preventDefault();
                oscillator.stop();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [telegraphMode])
}