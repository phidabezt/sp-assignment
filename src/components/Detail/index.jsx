import React from "react";
import AddButtonIcon from "../../assets/icons/add-button.svg";
import classes from './Detail.module.scss'

export const Detail = () => {
  return (
    <section className={classes['detail']}>
      <div className={classes['detail__item']}>
        <div className={classes['detail__wrapper']}>
          <h3>PSI</h3>
          <p className={`${classes['detail__value']} ${classes['detail__value--surround']}`}>23</p>
          <h4>Good</h4>
        </div>
      </div>
      <div className={classes['detail__item']}>
        <div className={classes['detail__wrapper']}>
          <h3>RAIN</h3>
          <p className={classes['detail__value']}>0</p>
          <h4>mm</h4>
        </div>
      </div>
      <div className={classes['detail__item']}>
        <div className={classes['detail__wrapper']}>
          <h3>DENGUE</h3>
          <div className={classes['detail__percent']} />
        </div>
      </div>
      <button className={`${classes['detail__button']} ${classes['detail__item']}`}>
        <img src={AddButtonIcon} alt="add button" />
        <h4 className={classes['detail__add']}>Add</h4>
      </button>

    </section>
  )
}