import { isNil, isEmpty, isUndefined, get, replace } from 'lodash'

import { LOGIN_ROUTE } from '../router/constants'

export const roleHandler = (response, history) => {
  if (isNil(response) || isEmpty(response) || typeof response !== 'object') {
    return false
  }
  const user = response.user
  if (!isUndefined(response.authenticated) && response.authenticated === false) {
    return LOGIN_ROUTE
  } else if (response.authenticated && response.user) {
    const url = '/dashboard'
    history.push(url)
    return url
  }
  return false
}