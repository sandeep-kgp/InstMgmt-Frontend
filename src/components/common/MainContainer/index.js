import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './style.css'

const numberOrStringPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
])

class MainContainerComponent extends Component {
  static propTypes = {
    containerSize: numberOrStringPropType,
    customBg: PropTypes.string,
    height: numberOrStringPropType,
    mainPage: PropTypes.bool,
    size: PropTypes.string,
  }

  static defaultProps = {
    containerSize: '',
    customBg: '',
    mainPage: false,
    size: '',
    test: '',
    height: '',
  }

  render() {
    return (
      <div className={classnames('mainContainer_outerWrap', styles.mainContainer_wrap)}>
        <div
          style={{ width: this.props.containerSize }}
          id={'mainContainer_innerWrap'}
          className={classnames('mainContainer', 'mainContainer_innerWrap', styles.mainContainer,
            { [styles.large]: this.props.size === 'large' },
            { [styles.top_margin]: this.props.mainPage })}>
          <div
            style={{ height: this.props.height }}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default MainContainerComponent
