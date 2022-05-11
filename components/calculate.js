import Generated from "../pages/generated";

//정리
//대비색, 보색, 대조색(opposite) - r,g,b에서 255에서 각 입력값을 뺀 값
//유사색(similar) -

//white, black 구하기 (main > input의 text color 구분용)
export function black_white_check(colorValue) {
  const result = hex_to_rgb(colorValue);
  const rgb = result[0];
  const c = result[1];

  let r = 0,
    g = 0,
    b = 0;
  r = "0x" + colorValue[1] + colorValue[2]; // red 추출
  g = "0x" + colorValue[3] + colorValue[4]; // green 추출
  b = "0x" + colorValue[5] + colorValue[6]; // blue 추출

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  let textColor = luma < 127.5 ? "white" : "black"; //0에 가까울 수록 배경색은 어둡고 255에 가까울수록 배경색은 밝은 색

  return textColor;
}

//generate button click function
export function generated(colorValue, resultValue, setResultValue) {
  const result = hex_to_rgb(colorValue);
  const rgb = result[0];
  const c = result[1];

  let r = 0,
    g = 0,
    b = 0;
  r = "0x" + colorValue[1] + colorValue[2]; // red 추출
  g = "0x" + colorValue[3] + colorValue[4]; // green 추출
  b = "0x" + colorValue[5] + colorValue[6]; // blue 추출

  const result_hex = opposite_color(
    r,
    g,
    b,
    colorValue,
    resultValue,
    setResultValue
  ); //보색 구하기
  result_hex += similar_color(r, g, b, colorValue, resultValue, setResultValue); //유사색 구하기

  return result_hex;
}

//HSL(hue, saturation, lightness)로 변환 후, 각 값 에서 -두개, +두개 도합 4가지 유사 색상 추출
export function similar_color(
  r,
  g,
  b,
  colorValue,
  resultValue,
  setResultValue
) {
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);




  let h1 = 0;
  for(let i=0; i<5; i++){

    if(h1 > 360){
      h1 = 0;
    }
    h1++;
  }

  let s1 = 0;
  for(let i=0; i<5; i++){

    if(s1 > 100){
      s1 = 0;
    }
    s1++;
  }

  let l1 = 0;
  for(let i=0; i<8; i++){

    if(l1 > 100){
      l1 = 0;
    }
    l1++;
  }


  
  let h2 = 0;
  for(let i=0; i<5; i++){

    if(h2 < 0){
      h2 = 360;
    }
    h2--;
  }

  let s2 = 0;
  for(let i=0; i<5; i++){

    if(s2 < 0){
      s2 = 100;
    }
    s2--;
  }

  let l2 = 0;
  for(let i=0; i<8; i++){

    if(l2 > 0){
      l2 = 100;
    }
    l2--;
  }

  // const h2 = h-5;
  // const s2 = s-5;
  // const l2 = l-8;

  

  const similar1 = hsl_to_rgb(h1,s1,l1);
  const similar2 = hsl_to_rgb(h2,s2,l2);


  const result_hex = "#" + rgb_to_hex(similar1[0], similar1[1], similar1[2]);
  const result_hex2 = "#" + rgb_to_hex(similar2[0], similar2[1], similar2[2]);


  setResultValue((resultValue) => [
    ...resultValue,
    {
      title: ["Similar Color"],
      value: [colorValue, result_hex, result_hex2],
    },
  ]);
}

//보색 구하기 rgb체계에서 서로 보색인 색을 섞으면 흰색이 된다.
export function opposite_color(
  r,
  g,
  b,
  colorValue,
  resultValue,
  setResultValue
) {
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
      title: ["Opposite Color"],
      value: [colorValue, result_hex],
    },
  ]);
}

export function hsl_to_rgb(h,s,l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;  
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);


  return [r,g,b];
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
