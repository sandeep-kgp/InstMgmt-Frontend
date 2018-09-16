import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { LOGIN_ROUTE, DASHBOARD_ROUTE } from './constants'

import { Login, Dashboard } from '../components'

export const AppRoutes = props => (
  <Switch>
    <Route component={Login} exact path={LOGIN_ROUTE} />
    <Route component={Dashboard} exact path={DASHBOARD_ROUTE} />
  </Switch>
)

AppRoutes.propTypes = {
  name: PropTypes.string.isRequired,
}