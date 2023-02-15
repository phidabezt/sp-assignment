import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import classes from './Chart.module.scss'
import { de } from "date-fns/locale";
import { extent } from "d3";
import { Marks } from "./Marks";

const margin = { top: 100, right: 50, bottom: 100, left: 25 }
const width = 8000
const height = 400
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

export const Chart = ({ data }) => {
  const xValue = d => d.time
  const yValue = d => d.sea_level

  const xScale = d3
    .scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])

  const yScaleLeft = d3
    .scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice()

  return (
    <div className={classes['chart']}>
      <h3 className={classes['chart__title']}>
        <span className={classes['chart__tide']}>Tide</span>
        <span className={classes['chart__dot']}> • </span>
        <span className={classes['chart__sun']}>Sunrise & Sunset</span>
      </h3>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <Marks xScale={xScale} xValue={xValue} yScaleLeft={yScaleLeft} yValue={yValue} data={data} marginBottom={margin.bottom} />
        </g>
      </svg>
    </div>
  )
}