import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './style.css'

class PageFooterComponent extends Component {
  static propTypes = {
    size: PropTypes.string,
  }

  static defaultProps = {
    size: '',
  }

  render() {
    return (
      <div className={classnames('footer',
        styles.footer, { [styles.large]: this.props.size === 'large' })}>
        <div className={styles.logo} />
      </div>
    )
  }
}

export default PageFooterComponent
