import React, { useState, useEffect, useRef } from "react";
import { Car } from "lucide-react";

export default function TypingPractice() {
  const [targetText, setTargetText] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [userInput, setUserInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setUserInput(newInput);
    if (newInput === targetText) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const handleTextClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const progress = userInput.length / targetText.length;
  const carPosition = `${Math.min(progress * 100, 100)}%`;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Typing Practice</h1>
      <div
        className="bg-gray-100 p-4 rounded-lg relative cursor-text"
        onClick={handleTextClick}
        role="textbox"
        tabIndex={0}
        aria-label="Typing area"
      >
        <p className="text-lg mb-2">Type the following text:</p>
        <div
          ref={textDisplayRef}
          className="text-xl font-mono whitespace-pre-wrap break-all relative"
        >
          {targetText.split("").map((char, index) => (
            <span
              key={index}
              className={`${
                index === userInput.length ? "bg-blue-300"
                : index < userInput.length ?
                  userInput[index] === char ?
                    "text-gray-500"
                  : "text-red-500 bg-red-100"
                : ""
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isCompleted}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-default"
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
          aria-hidden="true"
        />
      </div>
      <p className="text-sm text-gray-600">
        Progress:{" "}
        {
          userInput
            .split("")
            .filter((char, index) => char === targetText[index]).length
        }{" "}
        / {targetText.length} characters correct
      </p>
      {isCompleted && (
        <p className="text-lg font-bold text-green-600 text-center">
          Congratulations! You've typed the text correctly!
        </p>
      )}
      <div className="relative h-16 bg-gray-300 rounded-lg overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-400" />
        <div
          className={`absolute bottom-1 left-0 transition-all duration-300 ease-out ${isCompleted ? "rotate-360" : ""}`}
          style={{
            left: carPosition,
            transform: `translateX(-50%) ${isCompleted ? "rotate(360deg)" : ""}`,
          }}
        >
          <Car
            className={`w-12 h-12 ${isCompleted ? "text-green-500" : "text-blue-500"}`}
          />
        </div>
      </div>
    </div>
  );
}
