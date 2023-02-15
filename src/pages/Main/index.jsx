import React from 'react'
import { NavBar } from '../../components/NavBar'
import { Info } from '../../components/Info'
import { Detail } from '../../components/Detail'
import { Chart } from '../../components/Graph'
import { useWeather } from '../../hooks/useWeather'
import './Main.scss'

export const Main = () => {
  const { weatherCurrent, seaLevels, sunLevels } = useWeather()

  return (
    <div className="main">
      <div className="main__upper">
        <NavBar />
        <Info data={weatherCurrent} />
        <Detail data={weatherCurrent} />
      </div>
      <div className="main__lower">
        <Chart dataTide={seaLevels} dataSun={sunLevels} />
      </div>
    </div>
  )
}
