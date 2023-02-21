import React from 'react'
import * as d3 from "d3";
import classes from './Tides.module.scss'

export const Tides = ({ xScale, yScaleTide, dataTide, reduceTides }) => {
  console.log(reduceTides)
  return (
    <g className={classes['tides']}>
      {
        reduceTides.map((tide, i) => {
          return (
            <g key={tide.key}>
              <text
                className={classes['tides__value']}
                x={tide.x_scale_value}
                y={tide.y_scale_value}
                dy='-1.5rem'
                textAnchor='middle'
              >
                {tide.sea_level}m
              </text>
              <text
                className={classes['tides__time']}
                x={tide.x_scale_value}
                y={tide.y_scale_value}
                dy='-0.5rem'
                textAnchor='middle'
              >
                {tide.time}
              </text>
            </g>
          )
        })
      }
      <path d={d3
        .area()
        .curve(d3.curveNatural)
        .x(xScale)
        .y0(innerHeight)
        .y1(yScaleTide)(dataTide)}
        fill='#70b9ff'
      />
    </g>

  )
}