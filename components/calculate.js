import Generated from "../pages/generated";
import reactDom from "react-dom";

//white, black 구하기 (main > input의 text color 구분용)
export function black_white_check(colorValue) {
  const result = hex_to_rgb(colorValue);
  const rgb = result[0];
  const c = result[1];

  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  let textColor = luma < 127.5 ? "white" : "black"; //0에 가까울 수록 배경색은 어둡고 255에 가까울수록 배경색은 밝은 색

  return textColor;
}



//generate button click function
export function generated(val) {
  const colorValue = val;

  alert(colorValue)

  const result = hex_to_rgb(colorValue);
  const rgb = result[0];
  const c = result[1];

  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출

  const result_hex = complementary_color(c, r, g, b); //보색 구하기

  //결과로 동적 generated.js에 들어갈 컴포넌트 생성
  return result_hex;
}



//보색 구하기 rgb체계에서 서로 보색인 색을 섞으면 흰색이 된다.
export function complementary_color(c, r, g, b) {
  //m = minus
  let mr;
  let mg;
  let mb;

  console.log("yogiyo2");
  console.log(mr)
  console.log(typeof(mr))

  if (r < 255) {
    mr = 255 - r;
  }
  if (g < 255) {
    mg = 255 - g;
  }
  if (b < 255) {
    mb = 255 - b;
  }

  const result_hex = rgb_to_hex(mr, mg, mb);
  // alert(c + " 의 보색은 " + result_hex + " 입니다.");

  return result_hex;
}



export function hex_to_rgb(colorValue){
  const c = colorValue.substring(1); // 색상 앞의 # 제거
  const result_rgb = parseInt(c, 16); // rrggbb를 10진수로 변환

  return [result_rgb, c]
}



//조각난 r,g,b hex로 조합
export function rgb_to_hex(mr, mg, mb) {

  console.log("yogito")
  console.log(mr)
  console.log(typeof(mr))

  //다시 rgb 조합 (s = sum)
  const sr = mr.toString(16);
  const sg = mg.toString(16);
  const sb = mb.toString(16);

  const result_hex = sr + sg + sb; //보색의 hex값
  // console.log("sum_hex_value : " + sum_hex_value);
  return result_hex;
}
