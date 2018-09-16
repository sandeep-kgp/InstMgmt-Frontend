import { toJS, action, observable } from 'mobx'
import { get } from 'lodash'

import { loginUser, logout, checkIfUserIsAlreadyLoggedIn } from '../services'
import { Roles } from '../constants'
import { LOGIN_ROUTE } from '../router/constants'

export default class UserModel {
  @observable userRole
  @observable user
  @observable loginErrors

  constructor() {
    this.initialize()
  }

  @action
  initialize() {
    this.userRole = Roles.STUDENT
    let user = {}
    this.loginErrors = []
    try {
      user = JSON.parse(localStorage.getItem('user'))
    }
    catch (e) {
      console.log('parse..', e)
    }
    this.user = user
  }

  @action
  reset() {
    // TODO Do proper handling before resetting. We don't want to remove user info on unmount.
    // this.initialize()
  }

  @action
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
    this.user = user
  }

  getUser() {
    return toJS(this.user)
  }

  @action
  setLoginErrors(errors) {
    this.loginErrors = errors
  }

  getLoginErrors() {
    return toJS(this.loginErrors)
  }

  @action
  async loginUser({ username, password }) {
    // Routing is handled in AppContainer/index.js
    const response = await loginUser({ username, password })
    const status = get(response, 'message.status', '')
    if (status === 'UNKNOWN_USER') {
      this.setLoginErrors(['The username or password you entered is incorrect.'])
      return
    }
    const user = get(response, 'user', {})
    this.setUser(user)
  }

  @action
  async logout(history, shouldRerouteToLogin = true) {
    await logout()
    if (shouldRerouteToLogin) {
      this.setUser({})
      history.push(LOGIN_ROUTE)
    }
  }

  @action
  async checkIfUserIsAlreadyLoggedIn() {
    // Routing is handled in AppContainer/index.js
    await checkIfUserIsAlreadyLoggedIn()
  }

}
