import React from "react";
import ThermometerIcon from '../../assets/icons/thermometer.svg'
import HumidityIcon from '../../assets/icons/humidity.svg'
import classes from './Info.module.scss'

export const Info = ({ data }) => {
  return (
    <section className={classes['info']}>
      <img src={data?.icon} alt='cloud' className={classes['info__icon']} />
      <p className={classes['info__weather']}>{data?.weather}</p>
      <div className={classes['info__detail']}>
        <div className={classes['info__temperature']}>
          <img src={ThermometerIcon} alt='thermometer' />
          <span className={classes['info__value']}>{data?.humidity}°C</span>
        </div>
        <div className={classes['info__humidity']}>
          <img src={HumidityIcon} alt='humidity' />
          <span className={classes['info__value']}>{data?.rain}%</span>
        </div>
      </div>
    </section>
  );
}