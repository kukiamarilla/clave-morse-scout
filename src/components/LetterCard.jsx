import React from "react";
import { toMorse } from "../helpers/toMorse";
import './LetterCard.css'

export const LetterCard = ({letter, onClick}) => {
    return (
        <div onClick={onClick} className={`LetterCard${letter.selected ? " selected" : ""}${letter.spoted ? " spoted" : ""}${letter.failed ? " failed" : ""}`}>
            <h1>{toMorse(letter.letter)}</h1>
        </div>
    );
}