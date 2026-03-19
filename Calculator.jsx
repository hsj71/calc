import React, { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");
  const [degree, setDegree] = useState(true);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [rootMode, setRootMode] = useState(false);
  const [rootX, setRootX] = useState(0);

  const append = (v) => {
    const newVal = display + v;
    setDisplay(newVal);
    preview(newVal);
  };

  const clearDisplay = () => {
    setDisplay("");
    setResult("");
  };

  const preview = (val) => {
    try {
      setResult(eval(val));
    } catch {}
  };

  const calculate = () => {
    try {
      let expression = display;
      let resultValue;

      if (rootMode) {
        let y = eval(display);
        resultValue = Math.pow(rootX, 1 / y);
        setRootMode(false);
      } else {
        resultValue = eval(expression);
      }

      setDisplay(resultValue.toString());
      setResult("");
      setHistory([...history, `${expression} = ${resultValue}`]);
    } catch {
      setDisplay("Error");
    }
  };

  const handleFunc = (fn) => {
    try {
      setDisplay(fn(eval(display)).toString());
    } catch {}
  };

  const toRad = (v) => (degree ? (v * Math.PI) / 180 : v);
  const toDeg = (v) => (degree ? (v * 180) / Math.PI : v);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-600">
      <div className="bg-black p-5 rounded-2xl w-[500px] shadow-2xl">

        <div className="bg-gray-900 rounded-xl p-3 mb-3">
          <input
            value={display}
            readOnly
            className="w-full text-2xl bg-transparent text-white text-right outline-none"
          />
          <div className="text-gray-400 text-right text-sm">{result}</div>
        </div>

        <div className="flex gap-2 mb-2">
          <button onClick={() => setShowHistory(!showHistory)} className="flex-1 bg-gray-700 text-white p-2 rounded">History</button>
          <button onClick={() => setHistory([])} className="flex-1 bg-gray-700 text-white p-2 rounded">Clear</button>
        </div>

        {showHistory && (
          <div className="bg-gray-900 p-2 rounded mb-2 max-h-32 overflow-y-auto">
            {history.slice().reverse().map((h, i) => (
              <div key={i} className="text-white text-sm cursor-pointer border-b border-gray-700 p-1" onClick={() => setDisplay(h.split("=")[0].trim())}>
                {h}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-7 gap-2 text-sm">

          <button onClick={clearDisplay} className="bg-red-600">C</button>
          <button onClick={() => append("(") }>(</button>
          <button onClick={() => append(")")}>)</button>
          <button onClick={() => append("/")}>÷</button>
          <button onClick={() => handleFunc(Math.sqrt)}>√</button>
          <button onClick={() => append("**")}>xʸ</button>
          <button onClick={() => { setRootX(eval(display)); setDisplay(""); setRootMode(true); }}>y√x</button>

          {["7","8","9"].map(n => <button key={n} onClick={()=>append(n)}>{n}</button>)}
          <button onClick={()=>append("*")}>×</button>
          <button onClick={()=>handleFunc(v=>Math.pow(v,2))}>x²</button>
          <button onClick={()=>handleFunc(v=>Math.pow(v,3))}>x³</button>
          <button onClick={()=>handleFunc(v=>1/v)}>1/x</button>

          {["4","5","6"].map(n => <button key={n} onClick={()=>append(n)}>{n}</button>)}
          <button onClick={()=>append("-")}>−</button>
          <button onClick={()=>handleFunc(v=>{
            let f=1; for(let i=1;i<=v;i++) f*=i; return f;
          })}>x!</button>
          <button onClick={()=>append(Math.PI)}>π</button>
          <button onClick={()=>append(Math.E)}>e</button>

          {["1","2","3"].map(n => <button key={n} onClick={()=>append(n)}>{n}</button>)}
          <button onClick={()=>append("+")} className="bg-orange-500">+</button>
          <button onClick={calculate} className="bg-green-500">=</button>
          <button onClick={()=>handleFunc(v=>Math.log10(v))}>log</button>
          <button onClick={()=>handleFunc(v=>Math.log(v))}>ln</button>

          <button onClick={()=>append("0")}>0</button>
          <button onClick={()=>append(".")}>.</button>

          <button onClick={()=>handleFunc(v=>Math.sin(toRad(v)))}>sin</button>
          <button onClick={()=>handleFunc(v=>Math.cos(toRad(v)))}>cos</button>
          <button onClick={()=>handleFunc(v=>Math.tan(toRad(v)))}>tan</button>
          <button onClick={()=>handleFunc(v=>1/Math.cos(toRad(v)))}>sec</button>
          <button onClick={()=>handleFunc(v=>1/Math.sin(toRad(v)))}>csc</button>

          <button onClick={()=>handleFunc(v=>1/Math.tan(toRad(v)))}>cot</button>
          <button onClick={()=>handleFunc(v=>toDeg(Math.asin(v)))}>sin⁻¹</button>
          <button onClick={()=>handleFunc(v=>toDeg(Math.acos(v)))}>cos⁻¹</button>
          <button onClick={()=>handleFunc(v=>toDeg(Math.atan(v)))}>tan⁻¹</button>
          <button onClick={()=>handleFunc(v=>toDeg(Math.acos(1/v)))}>sec⁻¹</button>
          <button onClick={()=>handleFunc(v=>toDeg(Math.asin(1/v)))}>csc⁻¹</button>
          <button onClick={()=>handleFunc(v=>toDeg(Math.atan(1/v)))}>cot⁻¹</button>

          <button onClick={()=>handleFunc(Math.sinh)}>sinh</button>
          <button onClick={()=>handleFunc(Math.cosh)}>cosh</button>
          <button onClick={()=>handleFunc(Math.tanh)}>tanh</button>
          <button onClick={()=>handleFunc(Math.asinh)}>sinh⁻¹</button>
          <button onClick={()=>handleFunc(Math.acosh)}>cosh⁻¹</button>
          <button onClick={()=>handleFunc(Math.atanh)}>tanh⁻¹</button>

          <button onClick={()=>setDegree(!degree)}>
            {degree ? "DEG" : "RAD"}
          </button>

        </div>
      </div>
    </div>
  );
}
