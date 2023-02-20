import React from 'react'
import { NavBar } from '../../components/NavBar'
import { Info } from '../../components/Info'
import { Detail } from '../../components/Detail'
import { Chart } from '../../components/Chart'
import { useWeather } from '../../hooks/useWeather'
import './Main.scss'

export const Main = () => {
  const { currentWeather, seaLevels, sunLevels } = useWeather()

  return (
    <div className="main">
      <div className="main__upper">
        <NavBar />
        <Info data={currentWeather} />
        <Detail data={currentWeather} />
      </div>
      <div className="main__lower">
        <Chart dataTide={seaLevels} dataSun={sunLevels} />
      </div>
    </div>
  )
}
