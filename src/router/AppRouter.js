import React from 'react'
import { Switch } from 'react-router-dom'

import { Authenticated } from './'
import { AppRoutes } from './AppRoutes'
import { USER_ADMIN, APP_ROUTE_NAME } from './constants'

const AppRouter = props => (
  <div>
    <Switch>
      <Authenticated
        authorize={[USER_ADMIN]}
        componentRef={AppRoutes}
        name={APP_ROUTE_NAME}
        path="/"
      />
    </Switch>
  </div>
)

export default AppRouter
