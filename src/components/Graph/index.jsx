import React, { useState } from "react";
import * as d3 from "d3";
import classes from './Chart.module.scss'
import { de } from "date-fns/locale";
import { extent } from "d3";
import { Tides } from "./Tides";
import { Nights } from "./Nights";
import { SunPath } from "./SunPath";
import { ValueBar } from "./ValueBar";

const margin = { top: 100, right: 0, bottom: 100, left: 0 }
const width = 8000
const height = 500
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom
const extraHeight = 70
const sunRiseConfig = 30
const sunSetConfig = 90

export const Chart = ({ dataTide, dataSun }) => {
  const xValueTime = d => d ? d.time : new Date()
  const yValueTide = d => d ? d.sea_level : 0
  const xValueSunRise = d => d ? d.sunrise : new Date()
  const xValueSunSet = d => d ? d.sunset : new Date()
  const [scroll, setScroll] = useState(0)

  const xScale = d3
    .scaleTime()
    .domain(extent(dataTide, xValueTime))
    .range([0, innerWidth])

  const yScaleTide = d3
    .scaleLinear()
    .domain(extent(dataTide, yValueTide))
    .range([innerHeight, 0])
    .nice()

  const sunPositions = dataSun.reduce((acc, d) => {
    acc.push([xScale(xValueSunRise(d)), height - sunSetConfig])
    acc.push([(xScale(xValueSunRise(d)) + xScale(xValueSunSet(d))) / 2, sunRiseConfig])
    acc.push([xScale(xValueSunSet(d)), height - sunSetConfig])
    return acc
  }, [])

  const cleanedSunPositions = sunPositions.reduce((acc, d, i) => {
    if (i === 1 || i === 4 || i === 7) return acc // remove the middle point (high point of the sun)
    acc.push(d)
    return acc
  }, [])

  const formattedDataSun = dataSun.reduce((acc, d) => {
    acc.push(d.sunrise)
    acc.push(d.sunset)
    return acc
  }, [])

  const handleScrolling = (e) => {
    const currentScroll = e.target.scrollLeft
    const maxScroll = e.target.scrollWidth - e.target.clientWidth
    const scrollValueToChartValue = d3.scaleTime()
      .domain([0, maxScroll])
      .range([0, innerWidth])
    const scrollValue = scrollValueToChartValue(currentScroll)
    console.log(xScale.invert(scrollValue))
    setScroll(scrollValue)
  }

  return (
    <div className={classes['chart']} onScroll={handleScrolling}>
      <div className={classes['chart__content']}>
        <h3 className={classes['chart__title']}>
          <span className={classes['chart__tide']}>Tide</span>
          <span className={classes['chart__dot']}> • </span>
          <span className={classes['chart__sun']}>Sunrise & Sunset</span>
        </h3>
        <svg width={width} height={height + extraHeight}>
          <svg>
            <g transform={`translate(${margin.left},${margin.top})`}>
              <Tides
                xScale={xScale}
                xValueTime={xValueTime}
                yScaleTide={yScaleTide}
                yValueTide={yValueTide}
                dataTide={dataTide}
              />
              <Nights
                xScale={xScale}
                xValueSunRise={xValueSunRise}
                xValueSunSet={xValueSunSet}
                dataSun={dataSun}
                height={height}
                innerHeight={innerHeight}
              />
              <SunPath sunPositions={sunPositions} dataSun={dataSun} />
              <g>
              </g>
            </g>
          </svg>
          <ValueBar
            yBar={height}
            barWidth={width}
            barHeight={extraHeight}
            cleanedSunPositions={cleanedSunPositions}
            formattedDataSun={formattedDataSun}
          />
          <g>
            <rect x={scroll - 55} y={height} width={110} height={extraHeight} textAnchor='middle' fill='#D4D4D4' fontSize='20'></rect>
            <text x={scroll} y={height + 40} textAnchor='middle' fill='white' fontSize='20'>{d3.timeFormat('%I:%M %p')(xScale.invert(scroll))}</text>
          </g>
        </svg>
      </div>
    </div>
  )
}