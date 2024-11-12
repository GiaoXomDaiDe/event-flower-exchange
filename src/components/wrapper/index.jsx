import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './index.module.scss'

const cx = classNames.bind(styles)
const Wrapper = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>
}
Wrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default Wrapper
