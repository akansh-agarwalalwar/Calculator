import React, { useState } from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import "../index.css";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [memory, setMemory] = useState(0);
  const [isSecond, setIsSecond] = useState(false);
  const [history, setHistory] = useState([]);
  const [explode, setExplode] = useState(false);
  const [isPartialView, setIsPartialView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleButtonClick = (value) => {
    if (input === "0" && value !== "." && value !== "+/-" && value !== "%") {
      setInput(value);
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput("0");
  };

  const handleCalculate = () => {
    try {
      const result = Function("return " + input)();
      setInput(result.toString());
      setHistory([...history, `${input} = ${result}`]);
      if (/2[\+\-\*\/]6|6[\+\-\*\/]2/.test(input)) {
        setExplode(true);
        setTimeout(() => setExplode(false), 3000);
      }
    } catch (error) {
      setInput("Error");
    }
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handleMemoryAdd = () => {
    try {
      setMemory(memory + Function("return " + input)());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleMemorySubtract = () => {
    try {
      setMemory(memory - Function("return " + input)());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleMemoryRecall = () => {
    setInput(input + memory);
  };

  const handleToggleSecond = () => {
    setIsSecond(!isSecond);
  };

  const handleTogglePartialView = () => {
    setIsPartialView(!isPartialView);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`calculator flex flex-col items-center justify-center min-h-screen ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-black'}`}>
      <div className={`flex items-center justify-center flex-col rounded-lg border border-3 relative ${isPartialView ? 'w-[230px]' : 'w-fit'} ${isDarkMode ? 'bg-macColor-100 border-macColor-800' : 'bg-lightTheme-100 border-lightTheme-100'}`}>
        <div className="flex w-full flex-row left-2 float-left top-2 relative gap-1 group">
          <div className="bg-macColor-700 h-[11.5px] w-[11.5px] rounded-xl flex items-center justify-center">
            <RxCross2 size={8} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          <div className="bg-macColor-600 h-[11.5px] w-[11.5px] rounded-xl flex items-center justify-center">
            <FiMinus size={8} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          <div onClick={handleTogglePartialView} className="bg-macColor-500 h-[11.5px] w-[11.5px] rounded-xl flex items-center justify-center cursor-pointer">
            <FaPlus size={8} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          <div onClick={handleToggleTheme} className={`${isDarkMode ? 'bg-white' : 'bg-white'} h-[11.5px] w-[11.5px] rounded-xl flex items-center justify-center cursor-pointer`}>
            <FaRegMoon size={8} color="black" />
          </div>
        </div>

        <div className="display w-full text-right p-4 text-3xl font-roboto">
          {input}
        </div>
        <div className={`grid grid-cols-10 gap-[1.65px] rounded-lg ${isDarkMode ? 'bg-macColor-100' : ' bg-lightTheme-100'}`}>
          {isPartialView ? (
            <div className={`grid grid-cols-4 w-[225px] gap-[1.65px] ml-[1.5px] ${isDarkMode ? 'bg-macColor-100' : 'bg-lightTheme-100'}`}>
              <button onClick={handleClear} className="btn">C</button>
              <button onClick={() => handleButtonClick("+/-")} className="btn">+/-</button>
              <button onClick={() => handleButtonClick("%")} className="btn">%</button>
              <button onClick={() => handleButtonClick("/")} className="btn orange">÷</button>
              <button onClick={() => handleButtonClick("7")} className="btn">7</button>
              <button onClick={() => handleButtonClick("8")} className="btn">8</button>
              <button onClick={() => handleButtonClick("9")} className="btn">9</button>
              <button onClick={() => handleButtonClick("*")} className="btn orange">×</button>
              <button onClick={() => handleButtonClick("4")} className="btn">4</button>
              <button onClick={() => handleButtonClick("5")} className="btn">5</button>
              <button onClick={() => handleButtonClick("6")} className="btn">6</button>
              <button onClick={() => handleButtonClick("-")} className="btn orange">-</button>
              <button onClick={() => handleButtonClick("1")} className="btn">1</button>
              <button onClick={() => handleButtonClick("2")} className="btn">2</button>
              <button onClick={() => handleButtonClick("3")} className="btn">3</button>
              <button onClick={() => handleButtonClick("+")} className="btn orange">+</button>
              <button onClick={() => handleButtonClick("0")} className="btn col-start-1 col-end-3" style={{ width: 'calc(6.93rem + 1.5px)' }}>0</button>
              <button onClick={() => handleButtonClick(".")} className="btn">.</button>
              <button onClick={handleCalculate} className="btn orange">=</button>
            </div>
          ) : (
            <>
              <button onClick={() => handleButtonClick("(")} className="btn">{"("}</button>
              <button onClick={() => handleButtonClick(")")} className="btn">{")"}</button>
              <button onClick={handleMemoryClear} className="btn">mc</button>
              <button onClick={handleMemoryAdd} className="btn">m+</button>
              <button onClick={handleMemorySubtract} className="btn">m-</button>
              <button onClick={handleMemoryRecall} className="btn">mr</button>
              <button onClick={handleClear} className="btn">C</button>
              <button onClick={() => handleButtonClick("+/-")} className="btn">+/-</button>
              <button onClick={() => handleButtonClick("%")} className="btn">%</button>
              <button onClick={() => handleButtonClick("/")} className="btn orange">÷</button>
              <button onClick={handleToggleSecond} className="btn">2nd</button>
              <button onClick={() => handleButtonClick("Math.pow(")} className="btn">x²</button>
              <button onClick={() => handleButtonClick("Math.pow(")} className="btn">x³</button>
              <button onClick={() => handleButtonClick("Math.pow(")} className="btn">xʸ</button>
              <button onClick={() => handleButtonClick("Math.exp(")} className="btn">eˣ</button>
              <button onClick={() => handleButtonClick("Math.exp(")} className="btn">10ˣ</button>
              <button onClick={() => handleButtonClick("7")} className="btn">7</button>
              <button onClick={() => handleButtonClick("8")} className="btn">8</button>
              <button onClick={() => handleButtonClick("9")} className="btn">9</button>
              <button onClick={() => handleButtonClick("*")} className="btn orange">×</button>
              <button onClick={() => handleButtonClick("1/")} className="btn">¹/x</button>
              <button onClick={() => handleButtonClick("Math.sqrt(")} className="btn">²√x</button>
              <button onClick={() => handleButtonClick("Math.cbrt(")} className="btn">³√x</button>
              <button onClick={() => handleButtonClick("Math.pow(")} className="btn">ʸ√x</button>
              <button onClick={() => handleButtonClick("Math.log(")} className="btn">ln</button>
              <button onClick={() => handleButtonClick("Math.log10(")} className="btn">log₁₀</button>
              <button onClick={() => handleButtonClick("4")} className="btn">4</button>
              <button onClick={() => handleButtonClick("5")} className="btn">5</button>
              <button onClick={() => handleButtonClick("6")} className="btn">6</button>
              <button onClick={() => handleButtonClick("-")} className="btn orange">-</button>
              <button onClick={() => handleButtonClick("Math.factorial(")} className="btn">x!</button>
              <button onClick={() => handleButtonClick("Math.sin(")} className="btn">sin</button>
              <button onClick={() => handleButtonClick("Math.cos(")} className="btn">cos</button>
              <button onClick={() => handleButtonClick("Math.tan(")} className="btn">tan</button>
              <button onClick={() => handleButtonClick("Math.E")} className="btn">e</button>
              <button onClick={() => handleButtonClick("Math.pow(10,")} className="btn">EE</button>
              <button onClick={() => handleButtonClick("1")} className="btn">1</button>
              <button onClick={() => handleButtonClick("2")} className="btn">2</button>
              <button onClick={() => handleButtonClick("3")} className="btn">3</button>
              <button onClick={() => handleButtonClick("+")} className="btn orange">+</button>
              <button onClick={() => handleButtonClick("Rad")} className="btn">Rad</button>
              <button onClick={() => handleButtonClick("Math.sinh(")} className="btn">sinh</button>
              <button onClick={() => handleButtonClick("Math.cosh(")} className="btn">cosh</button>
              <button onClick={() => handleButtonClick("Math.tanh(")} className="btn">tanh</button>
              <button onClick={() => handleButtonClick("Math.PI")} className="btn">π</button>
              <button onClick={() => handleButtonClick("Math.random()")} className="btn"><span className="-ml-1">Rand</span></button>
              <button onClick={() => handleButtonClick("0")} className="btn col-start-7 col-end-9" style={{ width: 'calc(7rem + 1.5px)' }}>0</button>
              <button onClick={() => handleButtonClick(".")} className="btn">.</button>
              <button onClick={handleCalculate} className="btn orange">=</button>
            </>
          )}
        </div>
        {explode && <ConfettiExplosion />}
        <div className="mt-4 w-full">
          <h2 className="text-lg font-bold ml-2">History</h2>
          <ul className={`p-2 rounded ${isDarkMode ? ' bg-macColor-100 text-white' : 'bg-lightTheme-100 text-white'}`}>
            {history.slice().reverse().map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
