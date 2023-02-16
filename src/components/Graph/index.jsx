import React, { useState, useMemo } from "react"
import * as d3 from "d3"
import classes from './Chart.module.scss'
import { Tides } from "./Tides"
import { Nights } from "./Nights"
import { SunPath } from "./SunPath"
import { ValueBar } from "./ValueBar"
import SunIcon from '../../assets/icons/sun.svg'
import MoonIcon from '../../assets/icons/moon.svg'

const margin = { top: 100, right: 0, bottom: 100, left: 0 }
const width = 8000
const height = 500
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom
const extraHeight = 70
const sunRiseConfig = 30
const sunSetConfig = 90
const defaultDateString = '2023-01-01' // this is a dummy date to be used for the time scale

export const Chart = ({ dataTide, dataSun }) => {
  const xValueTime = d => d ? d.time : new Date()
  const yValueTide = d => d ? d.sea_level : 0
  const xValueSunRise = d => d ? d.sunrise : new Date()
  const xValueSunSet = d => d ? d.sunset : new Date()
  const [scrollValue, setScrollValue] = useState(600) // 600 is the middle of the chart
  const [iconYAXis, setIconYAXis] = useState(0)
  const [iconStatus, setIconStatus] = useState('sun')
  
  const formattedDataSun = dataSun.reduce((acc, d) => {
    acc.push(d.sunrise)
    acc.push(d.sunset)
    return acc
  }, [])
  
  const dataSunMinuteTick = d3
    .scaleTime()
    .domain(d3.extent(formattedDataSun))
    .ticks(d3.timeMinute)
    .map(d => new Date(d3.timeFormat(`${defaultDateString} %H:%M`)(d)))
  
  const yScaleIcon = d3
    .scaleTime()
    .domain(d3.extent(dataSunMinuteTick))
    .range([height, sunRiseConfig + margin.bottom])
  

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataTide, xValueTime))
    .range([0, innerWidth])

  const yScaleTide = d3
    .scaleLinear()
    .domain(d3.extent(dataTide, yValueTide))
    .range([innerHeight, 0])
    .nice()


  const chartIcon = useMemo(() => {
    const currentDate = xScale.invert(scrollValue)
    if ((currentDate > dataSun[0]?.sunrise && currentDate < dataSun[0]?.sunset) ||
      (currentDate > dataSun[1]?.sunrise && currentDate < dataSun[1]?.sunset) ||
      (currentDate > dataSun[2]?.sunrise && currentDate < dataSun[2]?.sunset)) {
      setIconStatus('sun')
      return SunIcon
    }
    setIconStatus('moon')
    return MoonIcon
  }, [scrollValue])

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

  const handleScrolling = (e) => {
    const currentScroll = e.target.scrollLeft
    const maxScroll = e.target.scrollWidth - e.target.clientWidth
    const domainCutValue = maxScroll / 2 - e.target.scrollWidth / 2
    
    const scrollValueToChartValue = d3.scaleTime()
    .domain([domainCutValue, maxScroll - domainCutValue])
    .range([0, innerWidth])
    const scrollValue = scrollValueToChartValue(currentScroll)
    console.log(yScaleIcon(new Date(d3.timeFormat(`${defaultDateString} %H:%M`)(xScale.invert(scrollValue)))))
    setScrollValue(scrollValue)
    setIconYAXis(yScaleIcon(new Date(d3.timeFormat(`${defaultDateString} %H:%M`)(xScale.invert(scrollValue)))))
  }
  

  const getDayMonthWithSuffix = (date) => {
    const day = Number(d3.timeFormat('%d')(date))
    const month = d3.timeFormat('%B')(date)
    if (day < 1 && day > 31) return
    if (day >= 11 && day <= 13) return `${day}th ${month}`
    switch (day % 10) {
      case 1: return `${day}st ${month}`
      case 2: return `${day}nd ${month}`
      case 3: return `${day}rd ${month}`
      default: return `${day}th ${month}`
    }
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
        </svg>
      </div>
      <div>
        <img
          src={chartIcon}
          alt='day-night icon'
          className={classes['chart__icon']}
          style={{ top: `${iconStatus === 'moon' ? 130 : iconYAXis}px`}}
        />
        <h4 className={classes['chart__date']}>{getDayMonthWithSuffix(xScale.invert(scrollValue))}</h4>
        <div className={classes['chart__measure']}></div>
        <p className={classes['chart__description']}>
          {d3.timeFormat('%I:%M %p')(xScale.invert(scrollValue))}
        </p>
      </div>
    </div>
  )
}