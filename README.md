# colorjo


## Document

Please enter a color to use for your design.

![Image Title](/public/colorjo_readme.png)

<p align="center">
  <a href="https://colorjo.vercel.app/" target="_blank"><strong>Explore Page »</strong></a>
</p>

<p align="center">
    <a href="mailto:jds3567@gmail.com" target="_blank">
        jds3567@gmail.com.com
    </a>
</p>

<br>

## Status
[![Github All Releases](https://img.shields.io/github/languages/count/dongseob/colorjo )]()<!-- 사용언어 수 -->
[![Github All Releases](https://img.shields.io/github/languages/top/dongseob/colorjo )]()<!-- 최다사용언어 -->
<!-- [![Github All Releases](https://img.shields.io/github/downloads/dongseob/colorjo/total)]()레포 다운로드 수 -->
[![Github All Releases](https://img.shields.io/github/repo-size/dongseob/colorjo)]()<!-- 레포 사이즈 -->
[![Github All Releases](https://img.shields.io/github/commit-activity/m/dongseob/colorjo)]()<!-- 달에 몇번 커밋했는지 -->
[![Github All Releases](https://img.shields.io/github/last-commit/dongseob/colorjo)]()<!-- 마지막커밋 날짜 -->

<br>

## Content

<Blockquote>
  모든 방식은 Hex 값을 받아서 RGB로 변환 후, 연산하여 다시 Hex 값으로 전달.
</Blockquote>

### Hex to RGB
```
export function hex_to_rgb(colorValue) {
  const c = colorValue.substring(1); // 색상 앞의 # 제거
  const result_rgb = parseInt(c, 16); // rrggbb를 10진수로 변환

  return [result_rgb, c];
}
```

### RGB to Hex
```
export function rgb_to_hex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return r + g + b;
}
```

### RGB to HSL
```
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
```

### HSL to RGB
```
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
```
