import React from 'react';

export default function IconDashboard(props){
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1" fill="white">
    <rect x="12.1001" y="12.1001" width="9.9" height="9.9" rx="1"/>
    </mask>
    <rect x="12.1001" y="12.1001" width="9.9" height="9.9" rx="1" stroke={props.stroke} stroke-width="3" mask="url(#path-1-inside-1)"/>
    <mask id="path-2-inside-2" fill="white">
    <rect x="12.1001" width="9.9" height="9.9" rx="1"/>
    </mask>
    <rect x="12.1001" width="9.9" height="9.9" rx="1" stroke={props.stroke} stroke-width="3" mask="url(#path-2-inside-2)"/>
    <mask id="path-3-inside-3" fill="white">
    <rect width="9.9" height="9.9" rx="1"/>
    </mask>
    <rect width="9.9" height="9.9" rx="1" stroke={props.stroke} stroke-width="3" mask="url(#path-3-inside-3)"/>
    <mask id="path-4-inside-4" fill="white">
    <rect y="12.1001" width="9.9" height="9.9" rx="1"/>
    </mask>
    <rect y="12.1001" width="9.9" height="9.9" rx="1" stroke={props.stroke} stroke-width="3" mask="url(#path-4-inside-4)"/>
  </svg>
  )
}