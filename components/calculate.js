import Generated from "../pages/generated";

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
export function generated(colorValue, resultValue, setResultValue) {
  const result = hex_to_rgb(colorValue);
  const rgb = result[0];
  const c = result[1];

  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출
  
  const result_hex = opposite_color(c, r, g, b, colorValue, resultValue, setResultValue); //보색 구하기
  
  return result_hex;
}

//보색 구하기 rgb체계에서 서로 보색인 색을 섞으면 흰색이 된다.
export function opposite_color(c, r, g, b, colorValue, resultValue, setResultValue) {
  //m = minus
  let mr;
  let mg;
  let mb;

  if (r < 255) {
    mr = 255 - r;
  }
  if (g < 255) {
    mg = 255 - g;
  }
  if (b < 255) {
    mb = 255 - b;
  }

  const result_hex = "#" + rgb_to_hex(mr, mg, mb);

  setResultValue((resultValue) => [
    ...resultValue,
    {
      title: "Opposite Color",
      value: [colorValue, result_hex]
    }
  ]);
}

export function hex_to_rgb(colorValue) {
  const c = colorValue.substring(1); // 색상 앞의 # 제거
  const result_rgb = parseInt(c, 16); // rrggbb를 10진수로 변환

  return [result_rgb, c];
}

//조각난 r,g,b hex로 조합
export function rgb_to_hex(mr, mg, mb) {
  //다시 rgb 조합 (s = sum)
  const sr = mr.toString(16);
  const sg = mg.toString(16);
  const sb = mb.toString(16);

  const result_hex = sr + sg + sb; //보색의 hex값
  return result_hex;
}
