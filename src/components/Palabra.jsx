import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../App";
import { LetterCard } from "./LetterCard";
import './Palabra.css'


export const Palabra = () => {
    const {globalState, winActivePlayer} = useContext(GlobalStateContext);
    const [word, setWord] = useState("");
    const [letters, setLetters] = useState([]);
    const [letterSelected, setLetterSelected] = useState(null);
    const [spotCounter, setSpotCounter] = useState(0);

    useEffect(() => {
        if(globalState) 
            setWord(globalState.word);
    }, [globalState]);

    useEffect(() => {
        if(word) {
            const letters = word.split("").map((letter, index) => ({
                letter,
                spoted: false,
                failed: false,
                selected: false,
            }));
            setLetters(letters);
        }
        setSpotCounter(0);
    }, [word]);


    const select = (index) => {
        if(letters[index].spoted || letters[index].failed) return;
        const lett = letters.map((letter, i) => {
            if(i === index) {
                return {
                    ...letter,
                    selected: true,
                }
            }else {
                return {
                    ...letter,
                    selected: false,
                }
            }
        });
        setLetters(lett);
        setLetterSelected(index);
        document.removeEventListener("keydown", handleKeyDown);
    }

    const spot = (index) => {
        if(letters[index].spoted || letters[index].failed) return;
        const lett = letters.map((letter, i) => {
            if(i === index) {
                return {
                    ...letter,
                    spoted: true,
                    selected: false,
                }
            }else {
                return {
                    ...letter,
                    selected: false,
                }
            }
        });
        setLetters(lett);
        setLetterSelected(null);
        setSpotCounter(spotCounter + 1);
        document.removeEventListener("keydown", handleKeyDown);
    }
    const fail = (index) => {
        if(letters[index].spoted || letters[index].failed) return;
        const lett = letters.map((letter, i) => {
            if(i === index) {
                return {
                    ...letter,
                    failed: true,
                    selected: false,
                }
            }else {
                return {
                    ...letter,
                    selected: false,
                }
            }
        });
        setLetters(lett);
        setLetterSelected(null);
        document.removeEventListener("keydown", handleKeyDown);
    }

    const handleKeyDown = (e) => {
        if(e.key.length > 1) return;
        if(e.key.toLowerCase() < "a" || e.key.toLowerCase() > "z") return;
        if(e.key.toLowerCase() === letters[letterSelected].letter.toLowerCase())
            spot(letterSelected);
        else
            fail(letterSelected);
    }

    useEffect(() => {
        if(letterSelected === null) return;
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [letterSelected]);

    useEffect(() => {
        if(spotCounter === 6) {
            alert("Ganaste!");
            winActivePlayer();
        }
    }, [spotCounter])
    return (
        <>
            <div className="palabra">
                {letters.map((letter, index) => 
                    <h1 key={index} className={classNames({spoted: letter.spoted, failed: letter.failed})}>{letter.letter.toUpperCase()}</h1>
                )}
            </div>
            <div className="morse">
                {letters.map((letter, index) => <LetterCard key={index} letter={letter} onClick={() => select(index)}/>)}
            </div>
        </>
    );
}