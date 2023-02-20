import React from "react";
import ThermometerIcon from '../../assets/icons/thermometer.svg'
import HumidityIcon from '../../assets/icons/humidity.svg'
import classes from './Info.module.scss'

export const Info = ({ data }) => {
  return (
    <section className={classes['info']}>
      <img src={data.icon} alt='weather icon' className={classes['info__icon']} />
      <p className={classes['info__weather']}>{data.weather}</p>
      <div className={classes['info__detail']}>
        <div className={classes['info__temperature']}>
          <img src={ThermometerIcon} alt='thermometer' />
          <p className={classes['info__value']}>{data.temp}<span>°C</span></p>
        </div>
        <div className={classes['info__humidity']}>
          <img src={HumidityIcon} alt='humidity' />
          <p className={classes['info__value']}>{data.humidity}<span>%</span></p>
        </div>
      </div>
    </section>
  );
}