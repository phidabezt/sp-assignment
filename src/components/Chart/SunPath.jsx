import React from "react";
import * as d3 from "d3";

export const SunPath = ({ sunPositions }) => {
  return (
    <g>
      <path
        d={d3
          .line()
          .curve(d3.curveNatural)(sunPositions)
        }
        stroke='#f98a00'
        strokeWidth='3'
        fill='none'
      />
    </g>
  )
}