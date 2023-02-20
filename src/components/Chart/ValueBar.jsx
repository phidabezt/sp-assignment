import React from 'react'
import * as d3 from 'd3'

export const ValueBar = ({ yBar, barWidth, barHeight, cleanedSunPositions }) => {
  return (
    <g>
      <rect
        x={0}
        y={yBar}
        width={barWidth}
        height={barHeight}
        fill='#D4D4D4'
      />
      {
        cleanedSunPositions.map((pos, i) => {
          return (
            <text
              key={i}
              x={pos.x_scale_value}
              y={pos.y_scale_value}
              dx={0}
              textAnchor='middle'
              fill='#f97400'
              fontSize='18'
              fontWeight='bold'
            >
              {pos.time}
            </text>
          )
        })
      }
    </g>
  )
}