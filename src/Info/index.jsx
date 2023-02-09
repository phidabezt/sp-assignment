import React from "react";
import CloudIcon from '../assets/icons/cloud.svg'
import classes from './Info.module.scss'

export const Info = () => {
  return (
    <section className={classes['info']}>
      <img src={CloudIcon} alt="cloud" className={classes['info__icon']} />
      <div className={classes['info__content']}>
        <p className={classes['info__weather']}>Cloudy</p>
        <div className={classes['info__detail']}>
          <p><span>29</span>°C</p>
          <p><span>27</span>%</p>
        </div>
      </div>
    </section>
  );
}