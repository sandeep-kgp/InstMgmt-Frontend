
import { api } from '../utils'
import { FETCH_USERS_DATA_URL } from '../constants'

export async function fetchUsersData({ userRole }) {
  let response
  try {
    response = await api(FETCH_USERS_DATA_URL, {
      method: 'POST',
      body: { role: userRole },
    })
  }
  catch (err) {
    console.log('error while getting user details...', err)
  }
  return response
}
