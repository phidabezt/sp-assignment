import React from 'react'
import * as d3 from 'd3'
import classes from './Measurement.module.scss'

export const Measurement = ({ chartIcon, iconStatus, moonIconYAxis, iconYAXis, measurementDate, measurementTime }) => {
  return (
    <div className={classes['measurement']}>
      {chartIcon && (
        <img
          src={chartIcon}
          alt='day-night icon'
          className={classes['measurement__icon']}
          style={{
            top: `${iconStatus === 'moon' ? moonIconYAxis : iconYAXis}px`
          }}
        />
      )}
      <h4 className={classes['measurement__date']}>{measurementDate}</h4>
      <div className={classes['measurement__measure']}></div>
      <p className={classes['measurement__time']}>{measurementTime}</p>
    </div>
  )
}