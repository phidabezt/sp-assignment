import React, { useState, useMemo } from "react"
import * as d3 from "d3"
import classes from './Chart.module.scss'
import { Tides } from "./Tides"
import { Nights } from "./Nights"
import { SunPath } from "./SunPath"
import { ValueBar } from "./ValueBar"
import { Measurement } from "./Measurement"
import SunIcon from '../../assets/icons/sun.svg'
import MoonIcon from '../../assets/icons/moon.svg'

const margin = { top: 100, right: 0, bottom: 100, left: 0 }
const width = 8000
const height = 280
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom
const extraHeight = 40
const sunRiseConfig = 30
const sunSetConfig = 90
const defaultDateString = '2023-01-01' // this is a dummy date to be used for the time scale
const moonIconYAxis = 130

export const Chart = ({ dataTide, dataSun }) => {
  const xValueTime = d => d ? d.time : new Date()
  const yValueTide = d => d ? d.sea_level : 0
  const xValueSunRise = d => d ? d.sunrise : new Date()
  const xValueSunSet = d => d ? d.sunset : new Date()
  const [scrollValue, setScrollValue] = useState(600) // 600 is the middle of the chart
  const [iconYAXis, setIconYAXis] = useState(0)
  const [iconStatus, setIconStatus] = useState('')
  const [sunIconDomain, setSunIconDomain] = useState([0, 0])
  const [sunIconRange, setSunIconRange] = useState([0, 0])
  
  const formattedDataSun = dataSun.reduce((acc, d) => {
    acc.push(d.sunrise)
    acc.push(d.sunset)
    return acc
  }, [])
  
  const yScaleIcon = d3
    .scaleTime()
    .domain(sunIconDomain)
    .range(sunIconRange)
  
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
    if(isNaN(currentDate.getTime())) return undefined // if the date is not valid, return null
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
    
    // set scroll value to convert it to date
    const scrollValue = scrollValueToChartValue(currentScroll)
    setScrollValue(scrollValue)
    setIconYAXis(yScaleIcon(new Date(d3.timeFormat(`${defaultDateString} %H:%M`)(xScale.invert(scrollValue)))))

    // set sun icon domain
    const sunIconDomain = dataSun.reduce((acc, d) => {
      // middle point between sunrise and sunset
      const middlePoint = new Date((d.sunrise.getTime() + d.sunset.getTime()) / 2)
      if (xScale.invert(scrollValue) > xValueSunRise(d) && xScale.invert(scrollValue) < middlePoint) {
        acc.push(new Date(d3.timeFormat(`${defaultDateString} %H:%M`)(xValueSunRise(d))))
        acc.push(new Date(d3.timeFormat(`${defaultDateString} %H:%M`)(middlePoint)))
        setSunIconRange([height, sunRiseConfig + margin.bottom])
      }
      if (xScale.invert(scrollValue) > middlePoint && xScale.invert(scrollValue) < xValueSunSet(d)) {
        acc.push(new Date(d3.timeFormat(`${defaultDateString} %H:%M`)(middlePoint)))
        acc.push(new Date(d3.timeFormat(`${defaultDateString} %H:%M`)(xValueSunSet(d))))
        setSunIconRange([sunRiseConfig + margin.bottom, height])
      }
      return acc
    }, [])
    setSunIconDomain(sunIconDomain)
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
                yShift={innerHeight + margin.bottom - height}
              />
              <SunPath sunPositions={sunPositions} />
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
      <Measurement
        chartIcon={chartIcon}
        iconStatus={iconStatus}
        moonIconYAxis={moonIconYAxis}
        iconYAXis={iconYAXis}
        measurementDate={getDayMonthWithSuffix(xScale.invert(scrollValue))}
        measurementTime={d3.timeFormat('%I:%M %p')(xScale.invert(scrollValue))}
      />
    </div>
  )
}