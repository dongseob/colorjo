//white, black 구하기
export function black_white_check(colorValue) {
  const c = colorValue.substring(1); // 색상 앞의 # 제거
  const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환

  console.log("rgb : " + rgb);

  const r = (rgb >> 16) & 0xff; // red 추출
  const g = (rgb >> 8) & 0xff; // green 추출
  const b = (rgb >> 0) & 0xff; // blue 추출

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  let textColor = luma < 127.5 ? "white" : "black"; //0에 가까울 수록 배경색은 어둡고 255에 가까울수록 배경색은 밝은 색

  return textColor;
}


