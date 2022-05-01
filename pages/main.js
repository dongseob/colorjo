import { useEffect, useState } from "react";
import * as Calculate from "../components/calculate";
import { CustomPicker } from "react-color";

export default function Main(props) {
  const {generateClick, propState} = props;
  const onchangeColor = (e) => {
    props.setColorValue(e.target.value); //input에 값입력 마다 setColorValue에 할당
  };


  //최초에만 실행
  useEffect(() => {
    const colorInput = document.getElementById("colorInput");
    colorInput.value = "#000000";
    props.setColorValue("#000000");
  });


  //input의 값이 변경될때마다 실행
  useEffect(() => {
    if (props.colorValue.length == 7) {
      colorInput.style.backgroundColor = props.colorValue; //input영역을 입력한 색상코드로 변경
      var textColor = Calculate.black_white_check(props.colorValue); //return: white or black
      colorInput.style.color = textColor; //텍스트 색상 지정
    } else {
      //컬러 기본값으로 변경
      colorInput.style.backgroundColor = "white";
      colorInput.style.color = "black";
    }
  }, [props.colorValue]);

  
  const mainStyle = {
    transition: ".5s",
  };


  return (
    <main className="pb-12 mx-auto max-w-7xl px-4 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-25 flex justify-center items-center my-auto mb-32 h-full">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="text-center block">
            Never waste Hours on finding the perfect Color Palette again!
          </span>{" "}
          <br></br>
          <span className="text-center block text-indigo-600">
            JUST ENTER A COLOR!
          </span>
        </h1>

        <div className="text-center flex flex-col justify-center">
          <input
            onChange={onchangeColor}
            className="mx-auto font-bold py-2 px-4 text-center mt-10 w-64 p-9 text-xl shadow rounded-3xl appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="colorInput"
            style={mainStyle}
            maxLength="7"
          />
          <button
            onClick={() => {
              generateClick(); //index.js
            }}
            className="mt-5 bg-indigo-600 hover:bg-indigo-800 text-white w-64 mx-auto text-xl font-bold py-2 px-4 rounded-full"
          >
            Generate
          </button>
        </div>
      </div>
    </main>
  );
}
