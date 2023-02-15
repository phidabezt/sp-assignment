import React from 'react'
import * as d3 from "d3";

export const Nights = ({ xScale, xValueSunRise, xValueSunSet, dataSun, height, innerHeight }) => {
  return (
    <g>
      {
        dataSun.map((d, i) => {
          if (i > 0 && i <= dataSun.length - 1) {
            return (
              <rect
                key={i}
                x={xScale(xValueSunSet(dataSun[i - 1]))}
                y={-innerHeight}
                width={
                  xScale(xValueSunRise(d)) - xScale(xValueSunSet(dataSun[i - 1]))
                }
                height={height + innerHeight}
                fill='#1d1a1a76'
              />
            )
          }
        })
      }
    </g>
  )
}