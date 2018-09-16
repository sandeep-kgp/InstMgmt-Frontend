import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'

import { MainContainerComponent, PageFooterComponent, PageHeaderComponent } from '../common'

import styles from './style.css'

@inject('userModel')
@observer
export default class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    userModel: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    const state = this.props.location.state || {}
    if (!state.doNotCheckUserLoginStatus) {
      this.props.userModel.checkIfUserIsAlreadyLoggedIn()
    }
  }

  onUserNameChange = e => {
    this.setState({ username: e.target.value })
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  onLogin = () => {
    this.props.userModel.loginUser({
      username: this.state.username,
      password: this.state.password,
    })
  }

  handleForgotPassword = event => {
    event.preventDefault()
    this.props.history.push(APP_FORGOT_PASSWORD)
  }

  renderErrors = () => {
    const { userModel } = this.props
    const errors = userModel.getLoginErrors()
    if (errors.length === 0) {
      return null
    }
    return (
      <div className={'fs13 error pb05'}>
        {errors.map(error => (<div key={error}>{error}</div>))}
      </div>
    )
  }

  onKeyDown = e => {
    if (e.keyCode === 13) {
      this.onLogin()
    }
  }

  render() {
    const { userModel } = this.props
    return (
      <div>
        <PageHeaderComponent title={'Login'} />
        <MainContainerComponent>
          <div className={'bold fs13 black mb1 pb05'}>
            User Login
          </div>
          {this.renderErrors()}
          <div className={styles.loginBlock}>
            <div className={'formBlock horizontal'}>
              <div className={'inner'}>
                <label className={'label'}>Email</label>
                <div className={'formFeild'}>
                  <input
                    onChange={this.onUserNameChange}
                    type={'text'}
                    value={this.state.username}
                    onKeyDown={this.onKeyDown}
                  />
                </div>
              </div>
              <div className={'inner'}>
                <label className={'label'}>Password</label>
                <div className={'formFeild'}>
                  <input
                    onChange={this.onPasswordChange}
                    type={'password'}
                    value={this.state.password}
                    onKeyDown={this.onKeyDown}
                  />
                </div>
              </div>
            </div>
            <div className={styles.btn_wrapper}>
              <div className={classnames('clearfix', styles.loginControl)}>
                <button className={'btn orange small'} onClick={this.onLogin}>Sign In</button>
              </div>
              <div className={classnames('clearfix', styles.loginFooter)} onClick={this.handleForgotPassword}>
                <a className={styles.forgot} href="">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </MainContainerComponent>
        <PageFooterComponent />
      </div>
    )
  }
}
