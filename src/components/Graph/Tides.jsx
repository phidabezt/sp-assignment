import React from 'react'
import * as d3 from "d3";
import classes from './Tides.module.scss'

export const Tides = ({ xScale, xValueTime, yScaleTide, yValueTide, dataTide }) => {
  const reduceTide = () => {
    const res = dataTide.filter((_, i) => i % 2 !== 0)
    res.pop()
    return res
  }
  
  return (
    <g className={classes['tides']}>
      {
        reduceTide().map((d, i) => (
          <g key={xValueTime(d)}>
            <text
              className={classes['tides__value']}
              x={xScale(xValueTime(d))}
              y={yScaleTide(yValueTide(d))}
              dy='-1.5rem'
              textAnchor='middle'
            >
              {d.sea_level}m
            </text>
            <text
              className={classes['tides__time']}
              x={xScale(xValueTime(d))}
              y={yScaleTide(yValueTide(d))}
              dy='-0.5rem'
              textAnchor='middle'
            >
              {d3.timeFormat('%I:%M %p')(d.time)}
            </text>
          </g>
        ))
      }
      <path d={d3
        .area()
        .curve(d3.curveNatural)
        .x(d => xScale(xValueTime(d)))
        .y0(innerHeight)
        .y1(d => yScaleTide(yValueTide(d)))(dataTide)}
        fill='#70b9ff'
      />
    </g>

  )
}