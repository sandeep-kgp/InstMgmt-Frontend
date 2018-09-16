/* eslint-disable */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { isNil, isEmpty } from 'lodash'
import classnames from 'classnames'

import styles from './style.css'

@inject('userModel')
@observer
class PageHeaderComponent extends Component {

  renderUserInfo() {
    const user = this.props.userModel.getUser()
    if (isNil(user) || isEmpty(user) || !user.firstName) {
      return null
    }
    return (
      <div className={'fs13 bold white flex'}>
        <div className={'mr1'}>Welcome {user.firstName}</div>
        <div className={classnames('underline', styles.login_status)} onClick={this.props.onLogout}>Sign Out</div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.header}>
        <div className={'clearfix'}>
          <div className={styles.user_detail}>{this.renderUserInfo()}</div>
        </div>
        <div className={styles.title}>
          {this.props.title}
        </div>
      </div>
    )
  }
}

export default PageHeaderComponent
