import React, { useState, useEffect } from "react";
import "./css/Pendu.css";

const words = ["react", "javascript", "frontend", "backend", "vite"];

const Pendu = () => {
    const [word, setWord] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [input, setInput] = useState("");

    useEffect(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);
    }, []);

    const maskedWord = word
        .split("")
        .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");

    const handleGuess = () => {
        if (!input || guessedLetters.includes(input)) return;

        if (!word.includes(input)) {
            setAttempts(attempts + 1);
        }
        setGuessedLetters([...guessedLetters, input]);
        setInput("");
    };

    const isGameOver = attempts >= 6;
    const isGameWon = maskedWord.replace(/\s/g, "") === word;

    const handleRestart = () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);
        setGuessedLetters([]);
        setAttempts(0);
        setInput("");
    };

    return (
        <div className="pendu-container">
            <h1>Jeu du Pendu</h1>
            <div className="pendu-drawing">
                {/* Structure du pendu */}
                <div className={`base ${attempts > 0 ? "visible" : ""}`}></div>
                <div className={`pole ${attempts > 1 ? "visible" : ""}`}></div>
                <div className={`beam ${attempts > 2 ? "visible" : ""}`}></div>
                <div className={`rope ${attempts > 3 ? "visible" : ""}`}></div>
                <div className={`head ${attempts > 4 ? "visible" : ""}`}></div>
                <div className={`body ${attempts > 5 ? "visible" : ""}`}></div>
                <div className={`left-arm ${attempts > 6 ? "visible" : ""}`}></div>
                <div className={`right-arm ${attempts > 7 ? "visible" : ""}`}></div>
                <div className={`left-leg ${attempts > 8 ? "visible" : ""}`}></div>
                <div className={`right-leg ${attempts > 9 ? "visible" : ""}`}></div>
            </div>
            <div className="word">
                <h2>{maskedWord}</h2>
            </div>
            <div className="controls">
                <input
                    type="text"
                    value={input}
                    maxLength={1}
                    onChange={(e) => setInput(e.target.value.toLowerCase())}
                    disabled={isGameOver || isGameWon}
                    placeholder="Entrez une lettre"
                />
                <button onClick={handleGuess} disabled={isGameOver || isGameWon}>
                    Proposer
                </button>
            </div>
            <div className="status">
                {isGameOver && <p className="loss">Perdu ! Le mot était : {word}</p>}
                {isGameWon && <p className="win">Gagné ! Félicitations !</p>}
            </div>
            {(isGameOver || isGameWon) && (
                <button className="replay" onClick={handleRestart}>
                    Rejouer
                </button>
            )}
        </div>
    );
};

export default Pendu;
