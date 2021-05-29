import React, { createElement, useState } from "react";

const Generate = () => {
  const [result, setResult] = useState([]);
  const [tag, setTag] = useState("");
  const [classword, setClass] = useState("div");
  const [count, setCount] = useState("");
  const generateElements = () => {
    let elems = [];
    for (let i = 0; i < count; i++) {
      let ele = createElement(tag, { className: classword }, i);

      elems.push(ele);
    }
    setResult([...result, ...elems]);
  };
  return (
    <>
      <div className="in">
        <input
          type="text"
          onChange={(e) => setTag(e.target.value)}
          placeholder="tag"
          name=""
          id=""
        />
        <input
          type="text"
          placeholder="class"
          onChange={(e) => setClass(e.target.value)}
          name=""
          id=""
        />
        <input
          type="number"
          placeholder="count"
          onChange={(e) => setCount(e.target.value)}
          name=""
          id=""
        />
        <button value="generate" onClick={generateElements}>
          Generate
        </button>
      </div>

      <div className="out">{result.map((ele) => ele)}</div>
      <div className="raw">
        {result.map((ele) => {
          return `<${ele.type} className=${ele.props.className}>${ele.props.children}</${ele.type}>`;
        })}
      </div>
    </>
  );
};

export default Generate;
