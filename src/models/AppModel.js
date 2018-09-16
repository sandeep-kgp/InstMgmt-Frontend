import { toJS, action, observable } from 'mobx'
import { get } from 'lodash'

import { fetchUsersData } from '../services'

export default class AppModel {
  @observable usersData

  constructor() {
    this.initialize()
  }

  @action
  initialize() {
    this.usersData = undefined
  }

  @action
  setUsersData(data) {
    console.log('Set Users:', data)
    this.usersData = data
  }

  getUsersData() {
    return toJS(this.usersData)
  }

  @action
  async fetchUsersData(userRole=''){
    const response = await fetchUsersData(userRole)
    this.setUsersData(response)
  }

}