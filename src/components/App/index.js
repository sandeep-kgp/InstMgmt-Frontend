import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router-dom'
import { toJS, observe } from 'mobx'
import { inject, observer } from 'mobx-react'
import { createBrowserHistory as createHistory } from 'history'
import { startsWith, toString } from 'lodash'

import { AppRouter } from '../../router'
import { LOGIN_ROUTE } from '../../router/constants'
import { roleHandler } from '../../utils'
import { apiResponse, apiResponseCode } from '../../utils/api'

const history = createHistory()

@inject('userModel')
@observer
export default class App extends Component {
  static propTypes = {
    userModel: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.url = window.location.href
    this.state = {
      showInternalServerError: false,
    }
  }

  componentDidMount() {
    observe(apiResponse, change => {
      const value = toJS(change.newValue)
      const response = roleHandler(value, history)
      if (response === LOGIN_ROUTE) {
        this.props.userModel.setUser({})
      }
    })
    observe(apiResponseCode, change => {
      const code = toString(toJS(change.newValue))
      if (startsWith(code, '5') || startsWith(code, '4')) {
        this.setState({ showInternalServerError: true })
      }
    })
  }

  componentDidCatch(error) {
    console.log('error..', error)
  }

  render() {
    return (
      <Router history={history}>
        <AppRouter />
      </Router>
    )
  }
}
