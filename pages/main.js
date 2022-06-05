import { useEffect, useState, useRef } from "react";
import * as Calculate from "../components/calculate";
import { ChromePicker } from "react-color"; // React Color (input용도)

export default function Main(props) {
  const { generateClick, propState } = props;
  const [pickerShow, setPickerShow] = useState(false); //input click 시, color picker visible
  const [pickerColor, setPickerColor] = useState({background: '#000'});

  //input에 값입력 마다 setColorValue에 할당
  const onchangeColor = (e) => {
    props.setColorValue(e.target.value);
    setPickerColor({ background: e.target.value }); //picker도 같이 변경
  };

  //최초에만 실행
  useEffect(() => {
    const colorInput = document.getElementById("colorInput");
    colorInput.value = "#eaddd1";
    props.setColorValue("#eaddd1");
    setPickerColor({ background: "#eaddd1" });
  }, []);

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
    // setPickerColor({ background: "#000" }); //picker의 초기값 => 이거 있으면 충돌나서 주석처리함
  }, [props.colorValue]);

  //input enter event
  const inputEnter = (e) => {
    if (e.key === "Enter") {
      generateClick();
    }
  };

  //picker의 값이 변경될때 실행
  const handleChangeComplete = (color) => {
    setPickerColor({ background: color.hex });
    colorInput.style.backgroundColor = color.hex; //input영역을 입력한 색상코드로 변경
    const inputValue = document.getElementById("colorInput");
    inputValue.value = color.hex; //picker에서 선택한 컬러 input에도 반영
    var textColor = Calculate.black_white_check(color.hex); //return: white or black
    colorInput.style.color = textColor; //텍스트 색상 지정
    props.setColorValue(color.hex);
  };

  return (
    <main className="pb-12 mx-auto max-w-7xl px-4 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-25 flex justify-center items-center my-auto mb-32 h-full">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="text-center block w-4/5 mx-auto">
            {/* Never waste Hours on finding the perfect Color Palette again! */}
            Please enter a color to use for your design.
          </span>{" "}
          <br></br>
          <span className="text-center block text-indigo-600">
            JUST ENTER A COLOR!
          </span>
        </h1>

        <div className="text-center flex flex-col justify-center">
          <input
            onChange={onchangeColor}
            className="mx-auto font-bold py-2 px-4 text-center mt-10 w-64 p-9 text-xl shadow rounded-3xl appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ease-in-out duration-500"
            type="text"
            id="colorInput"
            maxLength="7"
            onKeyDown={inputEnter}
          />

          <button
            onClick={() => {
              generateClick(); //index.js
            }}
            className="mt-5 bg-indigo-600 hover:bg-indigo-800 text-white w-64 mx-auto text-xl font-bold py-2 px-4 rounded-full"
          >
            Generate
          </button>

          <div className="mt-5 justify-center relative hidden lg:flex">
            <ChromePicker
              color={pickerColor.background}
              onChangeComplete={handleChangeComplete}
              disableAlpha={true}
            ></ChromePicker>
          </div>
          
        </div>
      </div>
    </main>
  );
}
