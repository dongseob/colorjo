import React, { useRef, useEffect } from "react";
import { render } from "react-dom";
import { useState } from "react/cjs/react.production.min";
import * as Calculate from "../components/calculate"; //your color의 텍스트 색상변경 용도

export default function Generated(props) {
  return <Result resultValue={props.resultValue} colorValue={props.colorValue}></Result>;
}


function Result(props) {
  useEffect(() => {
    console.log("resultValue : " , props.resultValue);
    // console.log("resultValue[0] : " , props.resultValue[0]?.value);
  }, [props.resultValue]);


  if(!props.resultValue) return null; //resultValue가 안들어와서 예외처리
  const resultRender = props.resultValue.map((result) => 
    <div key={result.value}>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-center mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {result.title}
            </p>
            <div className="flex justify-center flex-wrap">
              <ResultComponents
                // resultValue={props.resultValue}
                renderValue={result.value}
                colorValue={props.colorValue}
              ></ResultComponents>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {resultRender}
    </>
  );
}

function ResultComponents(props) {
  let textColor = Calculate.black_white_check(props.colorValue); //return: white or black

  let yourColor = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "999",
    color: textColor,
    top: "25%",
    textAlign: "center",
    fontWeight: "bold"
  }

  const resultRender = props.renderValue.map((result, index) => 
    <div key={index.toString()}>
      <div className="flex justify-center mt-4 text-xl text-gray-500 lg:mx-auto md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col mx-4 test">
          <label
            title={result}
            className="shadow-xl cursor-pointer h-24 w-24 m-4 md:h-32 md:w-32"
            htmlFor={"forColor"+index}
            style={{ backgroundColor: result, position: "relative" }}
          >
            {index === 0 ? <div style={yourColor} className="text-lg break-words">Your Color</div> : null}
          </label>
          <input
            className="mx-auto w-32 font-semibold py-2 px-4 text-center p-9 text-lg shadow rounded-3xl appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline ease-in-out duration-500"
            type="text"
            value={result}
            id={"forColor"+index}
            readOnly
          />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {resultRender}
    </>
  );
}
