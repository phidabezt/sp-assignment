import React from 'react'
import { NavBar } from '../../components/NavBar'
import { Info } from '../../components/Info'
import { Detail } from '../../components/Detail'
import { useWeather } from '../../hooks/useWeather'
import './Main.scss'

export const Main = () => {
  const { weatherCurrent, weatherHourly, _, loading } = useWeather()

  return (
    <div className="main">
      <div className="main__upper">
        {/*----NAVBAR----*/}
        <NavBar />
        {/*----INFO----*/}
        <Info current={weatherCurrent} />
        {/*----DETAIL----*/}
        <Detail />
        {/*----GRAPH----*/}
      </div>

    </div>
  )
}
