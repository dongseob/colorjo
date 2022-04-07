import React, { useRef, useEffect } from "react";
import { render } from "react-dom";
import * as Calculate from "../components/calculate"; //your color의 텍스트 색상변경 용도

export default function Generated(props) {
  return <Result resultValue={props.resultValue} colorValue={props.colorValue}></Result>;
}

function Result(props) {
  useEffect(() => {
    console.log("전체객체 : " , props.resultValue);
    console.log("test : " , props.resultValue[0]?.value)
    // console.log("객체의 길이 : " , Object.keys(props.resultValue || {}).length);
    // console.log("첫번째 객체의 key : " , Object.keys(props.resultValue)[0]);
    // console.log("첫번째 객체의 value : " , props.resultValue[Object.keys(props.resultValue)[0]]);
    // console.log("첫번째 값 : " , props.resultValue.opposite?.title);
    // console.log("두번째 값 : " , props.resultValue.opposite?.count);
    // console.log("세번째 값 : " , props.resultValue.opposite?.value);
    // console.log("세번째의 첫번째 값 : " , props.resultValue.opposite?.value?.aa);
    // console.log("세번째의 두번째 값 : " , props.resultValue.opposite?.value?.bb);
    
  }, [props.resultValue]);

  const resultRender = props.resultValue.map(result => 
    <div key={result.count}>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-center mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {result.title}
            </p>
            <div className="flex justify-center">
              <ResultComponents
                resultValue={props.resultValue}
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
  //클릭 시, input의 값 select
  const nameInput = useRef();
  const inputFocus = () => {
    nameInput.current.select();
  };

  var textColor = Calculate.black_white_check(props.colorValue); //return: white or black

  const yourColor = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "999",
    color: textColor,
    top: "25%",
    textAlign: "center",
    fontWeight: "bold",

  }

  const resultRender = props.renderValue.map((result, index) => 
    <div key={result}>
      <div className="flex justify-center mt-4 text-xl text-gray-500 lg:mx-auto">
        <div className="flex flex-col mx-4 test">
          <label
            className="h-32 w-32 shadow-xl cursor-pointer"
            htmlFor="forColor"
            style={{ backgroundColor: result, position: "relative" }}
          >
            {index === 0 ? <div style={yourColor} className="text-lg break-words">Your Color</div> : null}
          </label>
          <input
            className="w-32 font-semibold py-2 px-4 text-center mt-3 p-9 text-lg shadow rounded-3xl appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline ease-in-out duration-500"
            type="text"
            value={result}
            onFocus={inputFocus}
            ref={nameInput}
            id="forColor"
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
