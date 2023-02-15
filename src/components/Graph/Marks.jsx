import React from 'react'
import * as d3 from "d3";
import classes from './Chart.module.scss'

export const Marks = ({ xScale, xValue, yScaleLeft, yValue, data, marginBottom }) => {
  return (
    <>
      {
        data.map((d, i) => (
          <g key={xValue(d)}>
            <text
              className={classes['chart__value--tide']}
              x={xScale(xValue(d))}
              y={yScaleLeft(yValue(d))}
              dy='-1.5rem'
              dx='-1.4rem'
            >
              {d.sea_level}m
            </text>
            <text
              className={classes['chart__value--time']}
              x={xScale(xValue(d))}
              y={yScaleLeft(yValue(d))}
              dy='-0.5rem'
              dx='-1.4rem'
            >
              {d3.timeFormat('%I:%M %p')(d.time)}
            </text>
          </g>
        ))
      }
      <path d={d3
        .area()
        .curve(d3.curveNatural)
        .x(d => xScale(xValue(d)))
        .y0(innerHeight + marginBottom)
        .y1(d => yScaleLeft(yValue(d)))(data)}
        fill='#70b9ff'
      />
    </>

  )
}