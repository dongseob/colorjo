import React, { useRef, useEffect } from "react";

export default function Generated(props) {
  return (
    <Result resultValue={props.resultValue?.opposite}></Result>
  )
}


function Result(props) {
  useEffect(() => {
    console.log("tt" , props)
  })

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-center mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {props.resultValue?.opposite?.title}
          </p>

          <ResultComponent resultValue={props.resultValue}></ResultComponent>
          
        </div>
      </div>
    </div>
  );
}

function ResultComponent(props) {
  const generatedStyle = {
    transition: ".5s",
  };

  const generatedStyle2 = {
    backgroundColor: props.resultValue?.opposite?.value?.aa,
    boxShadow: "5px 3px 3px #666",
    cursor: "pointer",
  };

  //클릭 시, input의 값 select
  const nameInput = useRef();
  const inputFocus = () => {
    nameInput.current.select();
  };

  useEffect(() => {
    console.log("small : " , props.resultValue?.opposite?.count)
  }, [props.resultValue])

  return(
    <div className="flex justify-center mt-4 text-xl text-gray-500 lg:mx-auto">
      <div className="flex flex-col mx-4">
        <label
          className="h-32 w-32"
          htmlFor="forColor"
          style={generatedStyle2}
        ></label>
        <input
          style={generatedStyle}
          className="w-32 font-semibold py-2 px-4 text-center mt-3 p-9 text-lg shadow rounded-3xl appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={props.resultValue?.opposite?.value?.aa || ""}
          onFocus={inputFocus}
          ref={nameInput}
          id="forColor"
          readOnly
        />
      </div>
    </div>
  );
}
