import React from 'react';

export default function IconPlay(props){
  return (
<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="270px" height="270px">
{/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" width="270px" height="270px"> */}
  <defs>
    <filter id="a" width="200%" height="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox">
      <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/>
      <feGaussianBlur stdDeviation="12" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" in="shadowBlurOuter1"/>
    </filter>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <use fill="#000" filter="url(#a)" transform="translate(18 16)"/>
    <g fill="#FFF">
      <circle id="b" cx="130" cy="130" r="116"  style="stroke: white; stroke-width: 10px; fill:rgba(179,179,179, 0.6) "/>
      <path d="M188.216 135.792l-84.432 43.792V92"/>
    </g>
  </g>
</svg>



  )
}