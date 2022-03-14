import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";
import React, { useRef, useEffect } from "react";
import * as Calculate from "../components/calculate";
import Main from "./main"

export default function Generated(props) {

  // console.log(props.colorValue)

  return (
    <Result colorValue={props.colorValue} returnColor={props.returnColor}></Result>
  );
}


function Result(props){

  const generatedStyle = {
    transition: ".5s",
  };

  const generatedStyle2 = {
    backgroundColor: "#" + props.returnColor,
    boxShadow: "5px 3px 3px #666",
    cursor: "pointer"
  }

  //클릭 시, input의 값 select 
  const nameInput = useRef();
  const inputFocus = () => {
    nameInput.current.select();
  };


  return(
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-center mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Generic Gradient
          </p>
          <div className="flex justify-center mt-4 text-xl text-gray-500 lg:mx-auto">
            <div className="flex flex-col mx-4">
              <label
                className="h-32 w-32"
                htmlFor="forColor"
                style={generatedStyle2}
                id={props.colorValue}
              ></label>
              <input
                style={generatedStyle}
                className="w-32 font-semibold py-2 px-4 text-center mt-3 p-9 text-lg shadow rounded-3xl appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={props.returnColor}
                onFocus={inputFocus}
                ref={nameInput}
                id="forColor"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
