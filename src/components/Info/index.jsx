import React from "react";
import ThermometerIcon from '../../assets/icons/thermometer.svg'
import HumidityIcon from '../../assets/icons/humidity.svg'
import classes from './Info.module.scss'

export const Info = ({ current }) => {
  return (
    <section className={classes['info']}>
      <img src={current?.icon} alt='cloud' className={classes['info__icon']} />
      <p className={classes['info__weather']}>{current?.weather}</p>
      <div className={classes['info__detail']}>
        <div className={classes['info__temperature']}>
          <img src={ThermometerIcon} alt='thermometer' />
          <span className={classes['info__value']}>{current?.humidity}°C</span>
        </div>
        <div className={classes['info__humidity']}>
          <img src={HumidityIcon} alt='humidity' />
          <span className={classes['info__value']}>{current?.rain}%</span>
        </div>
      </div>
    </section>
  );
}