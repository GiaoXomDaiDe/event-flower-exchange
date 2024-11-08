import React from 'react'
import classNames from 'classnames/bind'
import styles from './searchItem.module.scss'
import { assets } from '../../assets'
const cx = classNames.bind(styles)

const SearchItem = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-item-name')}>
        <img src={assets.historyIcon} alt='history' />
        <span>Flowers</span>
      </div>

      <img src={assets.clearIcon} alt='clear' />
    </div>
  )
}

export default SearchItem
