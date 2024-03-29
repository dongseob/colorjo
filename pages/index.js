import Head from "next/head";
import { useState, useEffect } from "react";

import Header from "./header";
import Footer from "./footer";
import Main from "./main";
import Background from "./background";
import Generated from "./generated";
import * as Calculate from "../components/calculate";

export default function Home() {
  // const [generated, setGenerated] = useState(false); //generate 상태유무 (not used)
  const [scrollY, setScrollY] = useState(0); //top button에 사용
  const [topBtnStatus, setTopBtnStatus] = useState(false); //top button에 사용
  const [colorValue, setColorValue] = useState(""); // 사용자가 입력한 헥스값
  const [resultValue, setResultValue] = useState([]);

  //top button
  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
    if (scrollY > 300) {
      setTopBtnStatus(true);
    } else {
      setTopBtnStatus(false);
    }
  };

  //top button
  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
    };
  });

  //top button click function
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); //scrollY 초기화
    setTopBtnStatus(false);
  };

  //generate click function
  const generateClick = (colorInput) => {
    //중복 렌더링 방지로 배열 초기화 작업
    setResultValue([]);

    //에러문구
    const error_code = "Please enter it in hex code!";

    //입력 글자 제한
    if (colorValue.length !== 7) {
      alert(error_code);
      return;
    }

    //한글포함 검사
    const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g; 
    if(regExp.test(colorValue)){ 
      alert(error_code);
      return; 
    }

    const nanCheck = Calculate.generated(colorValue, resultValue, setResultValue);

    //rgb가 nan이면 return
    if(nanCheck == "error"){
      alert(error_code);
      return;
    }
    else{
      //좀더 자연스럽게 하려고 setTimeOut 추가
      setTimeout(function () {
        //generated 영역이 생성
        const area = document.querySelector("#generatedArea");
        area.style.display = "block";

        //generateClick()이 끝나기전 스크롤이동 실행
        window.scrollTo({ top: 300, behavior: "smooth" });
      }, 500);
    }
  };

  //resultValue의 동기 진행
  useEffect(() => {
    // console.log("result value : " , resultValue); //테스트 용도
  }, [resultValue]);

  return (
    <div className="area">
      <Head>
        <title>colorjo</title>
        <meta name="description" content="Please enter a color to use for your design." />
        <link rel="icon" href="/colorjo.png" />
      </Head>

      <div className="h-screen flex flex-col" id="mainArea">
        <Header></Header>

        <Main
          generateClick={generateClick}
          colorValue={colorValue}
          setColorValue={setColorValue}
        ></Main>
      </div>

      <div id="generatedArea" style={{ display: "none" }}>
        <Generated
          colorValue={colorValue}
          resultValue={resultValue}
        ></Generated>

        <Footer></Footer>

        <button
          className={
            topBtnStatus
              ? "topBtn active bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded"
              : "topBtn"
          }
          onClick={handleTop}
        >
          top
        </button>
      </div>

      <Background></Background>
    </div>
  );
}
