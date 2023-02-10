import React from "react";
import CloudIcon from '../../assets/icons/cloud.svg'
import ThermometerIcon from '../../assets/icons/thermometer.svg'
import HumidityIcon from '../../assets/icons/humidity.svg'
import classes from './Info.module.scss'

export const Info = ({ current }) => {
  return (
    <section className={classes['info']}>
      <img src={CloudIcon} alt='cloud' className={classes['info__icon']} />
      <p className={classes['info__weather']}>{current?.weather[0]?.main}</p>
      <div className={classes['info__detail']}>
        <div className={classes['info__temperature']}>
          <img src={ThermometerIcon} alt='thermometer' />
          <span className={classes['info__value']}>29</span>°C
        </div>
        <div className={classes['info__humidity']}>
          <img src={HumidityIcon} alt='humidity' />
          <span className={classes['info__value']}>27</span>%
        </div>
      </div>
    </section>
  );
}