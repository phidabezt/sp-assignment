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

const MARGIN = { top: 100, right: 0, bottom: 100, left: 0 }
const WIDTH = 8000
const HEIGHT = 280
const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right
const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom
const EXTRA_HEIGHT = 40
const SUN_RISE_CONFIG = 30
const SUN_SET_CONFIG = 90
const DEFAULT_DATE_STRING = '2023-01-01' // this is a dummy date to be used for the time scale
const MOON_ICON_Y_AXIS = 130

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
    .range([0, INNER_WIDTH])

  const yScaleTide = d3
    .scaleLinear()
    .domain(d3.extent(dataTide, yValueTide))
    .range([INNER_HEIGHT, 0])
    .nice()


  const chartIcon = useMemo(() => {
    const currentDate = xScale.invert(scrollValue)
    if (isNaN(currentDate.getTime())) return undefined // if the date is not valid, return null
    if ((currentDate > dataSun[0].sunrise && currentDate < dataSun[0].sunset) ||
      (currentDate > dataSun[1].sunrise && currentDate < dataSun[1].sunset) ||
      (currentDate > dataSun[2].sunrise && currentDate < dataSun[2].sunset)) {
      setIconStatus('sun')
      return SunIcon
    }
    setIconStatus('moon')
    return MoonIcon
  }, [scrollValue])

  const sunPositions = dataSun.reduce((acc, d) => {
    acc.push([xScale(xValueSunRise(d)), HEIGHT - SUN_SET_CONFIG])
    acc.push([(xScale(xValueSunRise(d)) + xScale(xValueSunSet(d))) / 2, SUN_RISE_CONFIG])
    acc.push([xScale(xValueSunSet(d)), HEIGHT - SUN_SET_CONFIG])
    return acc
  }, [])

  const cleanedSunPositions = sunPositions.reduce((acc, pos, i) => {
    if (i === 1 || i === 4 || i === 7) return acc // remove the middle point (high point of the sun)
    acc.push(pos)
    return acc
  }, []).map((pos, i) => ({
    x_scale_value: pos[0],
    y_scale_value: 300,
    key: pos[0],
    time: d3.timeFormat('%I:%M %p')(formattedDataSun[i])
  }))

  const reduceTides = dataTide.reduce((acc, d, i) => {
    if (i % 2 === 0) acc.push(d)
    acc.pop()
    return acc.map(d => ({
      ...d,
      key: xValueTime(d),
      time: d3.timeFormat('%I:%M %p')(new Date(d.time)),
      x_scale_value: xScale(xValueTime(d)),
      y_scale_value: yScaleTide(yValueTide(d))
    }))
  }, [])

  const nights = dataSun.map((d, i) => {
    if (i <= 0 || i > dataSun.length - 1) return undefined
    return {
      ...d,
      key: xScale(xValueSunSet(dataSun[i - 1])),
      x_scale_value: xScale(xValueSunSet(dataSun[i - 1])),
      y_scale_value: INNER_HEIGHT + MARGIN.bottom - HEIGHT,
      width: xScale(xValueSunRise(d)) - xScale(xValueSunSet(dataSun[i - 1])),
      height: HEIGHT + INNER_HEIGHT
    }
  })

  const handleScrolling = (e) => {
    const currentScroll = e.target.scrollLeft
    const maxScroll = e.target.scrollWidth - e.target.clientWidth
    const domainCutValue = maxScroll / 2 - e.target.scrollWidth / 2
    const scrollValueToChartValue = d3.scaleTime()
      .domain([domainCutValue, maxScroll - domainCutValue])
      .range([0, INNER_WIDTH])

    // set scroll value to convert it to date
    const scrollValue = scrollValueToChartValue(currentScroll)
    setScrollValue(scrollValue)
    setIconYAXis(yScaleIcon(new Date(d3.timeFormat(`${DEFAULT_DATE_STRING} %H:%M`)(xScale.invert(scrollValue)))))

    // set sun icon domain
    const sunIconDomain = dataSun.reduce((acc, d) => {
      // middle point between sunrise and sunset
      const middlePoint = new Date((d.sunrise.getTime() + d.sunset.getTime()) / 2)
      if (xScale.invert(scrollValue) > xValueSunRise(d) && xScale.invert(scrollValue) < middlePoint) {
        acc.push(new Date(d3.timeFormat(`${DEFAULT_DATE_STRING} %H:%M`)(xValueSunRise(d))))
        acc.push(new Date(d3.timeFormat(`${DEFAULT_DATE_STRING} %H:%M`)(middlePoint)))
        setSunIconRange([HEIGHT, SUN_RISE_CONFIG + MARGIN.bottom])
      }
      if (xScale.invert(scrollValue) > middlePoint && xScale.invert(scrollValue) < xValueSunSet(d)) {
        acc.push(new Date(d3.timeFormat(`${DEFAULT_DATE_STRING} %H:%M`)(middlePoint)))
        acc.push(new Date(d3.timeFormat(`${DEFAULT_DATE_STRING} %H:%M`)(xValueSunSet(d))))
        setSunIconRange([SUN_RISE_CONFIG + MARGIN.bottom, HEIGHT])
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
        <svg width={WIDTH} height={HEIGHT + EXTRA_HEIGHT}>
          <svg>
            <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
              <Tides
                xScale={d => xScale(xValueTime(d))}
                yScaleTide={d => yScaleTide(yValueTide(d))}
                dataTide={dataTide}
                reduceTides={reduceTides}
              />
              <Nights nights={nights} />
              <SunPath sunPositions={sunPositions} />
            </g>
          </svg>
          <ValueBar
            yBar={HEIGHT}
            barWidth={WIDTH}
            barHeight={EXTRA_HEIGHT}
            cleanedSunPositions={cleanedSunPositions}
          />
        </svg>
      </div>
      <Measurement
        chartIcon={chartIcon}
        iconStatus={iconStatus}
        moonIconYAxis={MOON_ICON_Y_AXIS}
        iconYAXis={iconYAXis}
        measurementDate={getDayMonthWithSuffix(xScale.invert(scrollValue))}
        measurementTime={d3.timeFormat('%I:%M %p')(xScale.invert(scrollValue))}
      />
    </div>
  )
}