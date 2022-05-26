import Generated from "../pages/generated";

//정리
//대비색, 보색, 대조색(opposite) - r,g,b에서 255에서 각 입력값을 뺀 값
//유사색(similar) - h,s,l의 각 순서대로 (+6,+5,-9),(-6,+5,-9),(+12,+5,+3),(-12,+5,+3)을 연산한 값

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
//HSL(Lightness), HSB(Brightness), HSV(Value) - HSB와 HSV는 같다
//HSV와 HSL중에 HSL를 사용한 이유는 더욱 다채로운 색상 표현가능, 밝기의 휘도까지 표현 가능
export function similar_color(
  r,
  g,
  b,
  colorValue,
  resultValue,
  setResultValue
) {
  //입력받은 값을 hsl로 변환
  const rgb_to_hsl_result = rgb_to_hsl(r, g, b);

  //각 h,s,l값을 선언
  let similar1_h = rgb_to_hsl_result[0];
  let similar1_s = rgb_to_hsl_result[1];
  let similar1_l = rgb_to_hsl_result[2];

  let similar2_h = rgb_to_hsl_result[0];
  let similar2_s = rgb_to_hsl_result[1];
  let similar2_l = rgb_to_hsl_result[2];

  let similar3_h = rgb_to_hsl_result[0];
  let similar3_s = rgb_to_hsl_result[1];
  let similar3_l = rgb_to_hsl_result[2];

  let similar4_h = rgb_to_hsl_result[0];
  let similar4_s = rgb_to_hsl_result[1];
  let similar4_l = rgb_to_hsl_result[2];

  //각 값 연산
  //각 값의 최소값과 최대값의 범위를 벗어났을때
  //similar1 (+6, 5, -9)
  for (let i = 0; i < 7; i++) {
    if (similar1_h > 360) {
      similar1_h = 0;
    }
    similar1_h++;
  }
  //채도는 0~100 을 넘지 않도록 조절
  if(similar1_s > 95){
    for (let i = 0; i < 5; i++) {
      similar1_s--;
    }
  }else{
    for (let i = 0; i < 5; i++) {
      if (similar1_s > 100) {
        similar1_s = 0;
      }
      similar1_s++;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (similar1_l < 0) {
      similar1_l = 100;
    }
    similar1_l--;
  }

  //similar2 (-6, 5, -9)
  for (let i = 0; i < 7; i++) {
    if (similar2_h < 0) {
      similar2_h = 360;
    }
    similar2_h--;
  }
  //채도는 0~100 을 넘지 않도록 조절
  if(similar2_s > 95){
    for (let i = 0; i < 5; i++) {
      similar2_s--;
    }
  }else{
    for (let i = 0; i < 5; i++) {
      if (similar2_s > 100) {
        similar2_s = 0;
      }
      similar2_s++;
    }
  }
  for (let i = 0; i < 4; i++) {
    if (similar2_l < 0) {
      similar2_l = 100;
    }
    similar2_l--;
  }

  //similar3 (+12, 5, +4)
  for (let i = 0; i < 14; i++) {
    if (similar3_h > 360) {
      similar3_h = 0;
    }
    similar3_h++;
  }
  //채도는 0~100 을 넘지 않도록 조절
  if(similar3_s > 95){
    for (let i = 0; i < 5; i++) {
      similar3_s--;
    }
  }else{
    for (let i = 0; i < 5; i++) {
      if (similar3_s > 100) {
        similar3_s = 0;
      }
      similar3_s++;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (similar3_l > 100) {
      similar3_l = 0;
    }
    similar3_l++;
  }

  //similar4 (-12, 5, +4)
  for (let i = 0; i < 14; i++) {
    if (similar4_h < 0) {
      similar4_h = 360;
    }
    similar4_h--;
  }
  //채도는 0~100 을 넘지 않도록 조절
  if(similar4_s > 95){
    for (let i = 0; i < 5; i++) {
      similar4_s--;
    }
  }else{
    for (let i = 0; i < 5; i++) {
      if (similar4_s > 100) {
        similar4_s = 0;
      }
      similar4_s++;
    }
  }
  for (let i = 0; i < 4; i++) {
    if (similar4_l > 100) {
      similar4_l = 0;
    }
    similar4_l++;
  }

  //hsl to rgb
  const result_rgb1 = hsl_to_rgb(similar1_h, similar1_s, similar1_l);
  const result_rgb2 = hsl_to_rgb(similar2_h, similar2_s, similar2_l);
  const result_rgb3 = hsl_to_rgb(similar3_h, similar3_s, similar3_l);
  const result_rgb4 = hsl_to_rgb(similar4_h, similar4_s, similar4_l);

  //R,G,B를 합쳐 hex값으로 담는다
  const result_hex1 =
    "#" + rgb_to_hex(result_rgb1[0], result_rgb1[1], result_rgb1[2]);
  const result_hex2 =
    "#" + rgb_to_hex(result_rgb2[0], result_rgb2[1], result_rgb2[2]);
  const result_hex3 =
    "#" + rgb_to_hex(result_rgb3[0], result_rgb3[1], result_rgb3[2]);
  const result_hex4 =
    "#" + rgb_to_hex(result_rgb4[0], result_rgb4[1], result_rgb4[2]);

  setResultValue((resultValue) => [
    ...resultValue,
    {
      title: ["Similar Color"],
      value: [colorValue, result_hex1, result_hex2, result_hex3, result_hex4],
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

  if (r < 256) {
    mr = 255 - r;
  }
  if (g < 256) {
    mg = 255 - g;
  }
  if (b < 256) {
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



















//convert들은 가시성때문에 떨어트려놈
export function hsl_to_rgb(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

export function rgb_to_hsl(r, g, b) {
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

  return [h, s, l];
}

export function hex_to_rgb(colorValue) {
  const c = colorValue.substring(1); // 색상 앞의 # 제거
  const result_rgb = parseInt(c, 16); // rrggbb를 10진수로 변환

  return [result_rgb, c];
}

//조각난 r,g,b hex로 조합
export function rgb_to_hex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return r + g + b;
}
