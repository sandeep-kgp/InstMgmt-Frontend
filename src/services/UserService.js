import { api } from '../utils'
import { AUTHENTICATE_URL, LOGIN_URL, USER_LOGOUT } from '../constants'

export async function loginUser({ username, password }) {
  let response
  try {
    response = await api(LOGIN_URL, {
      method: 'POST',
      body: { email: username, password },
    })
  }
  catch (err) {
    console.log('error while login...', err)
  }
  return response
}

export async function checkIfUserIsAlreadyLoggedIn() {
  let response
  try {
    response = await api(AUTHENTICATE_URL, {
      method: 'GET',
    })
  }
  catch (err) {
    console.log('error while getting user details...', err)
  }
  return response
}

export async function logout() {
  let response = {}
  try {
    response = await api(USER_LOGOUT, {
      method: 'GET',
    })
  }
  catch (err) {
    console.log('error in logout...', err)
  }
  return response
}
