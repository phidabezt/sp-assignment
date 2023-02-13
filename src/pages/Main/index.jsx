import React from 'react'
import { NavBar } from '../../components/NavBar'
import { Info } from '../../components/Info'
import { Detail } from '../../components/Detail'
import { Graph } from '../../components/Graph'
import { useWeather } from '../../hooks/useWeather'
import './Main.scss'

export const Main = () => {
  const { weatherCurrent, seaLevels, sunLevels, loading } = useWeather()
  console.log(sunLevels)
  return (
    <div className="main">
      <div className="main__upper">
        <NavBar />
        <Info current={weatherCurrent} />
        <Detail current={weatherCurrent} />
      </div>
      <div className="main__lower">
        <Graph seaLevels={seaLevels} isLoading={loading} />
      </div>
    </div>
  )
}
