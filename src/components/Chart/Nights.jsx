import React from 'react'
import * as d3 from "d3";

export const Nights = ({ nights }) => {
  return (
    <g>
      {
        nights.map((night, i) => {
          return night && (
            <rect
              key={night.key}
              x={night.x_scale_value}
              y={night.y_scale_value}
              width={night.width}
              height={night.height}
              fill='#1d1a1a76'
            />
          )
        }
        )
      }
    </g>
  )
}