import React from 'react'
import * as d3 from 'd3'

export const ValueBar = ({ yBar, barWidth, barHeight, cleanedSunPositions, formattedDataSun }) => {
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
        cleanedSunPositions.map((d, i) => {
          return (
            <text
              key={i}
              x={d[0]}
              y={300}
              dx={0}
              textAnchor='middle'
              fill='#f97400'
              fontSize='18'
              fontWeight='bold'
            >
              {d3.timeFormat('%I:%M %p')(formattedDataSun[i])}
            </text>
          )
        })
      }
    </g>
  )
}