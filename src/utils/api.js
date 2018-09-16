import { observable } from 'mobx'

export const apiResponse = observable({ response: {} })
export const apiResponseCode = observable({ code: 200 })

const modifyParams = params => ({
  ...params,
  credentials: 'include', // Required for sending cookies
})

export async function fetchResponse(uri, params) {
  try {
    const response = await fetch(uri, modifyParams(params))
    const contentType = response.headers.get('content-type')
    if (response.status === 204) {
      return {}
    }
    if (response.ok) {
      let responseBody
      if (!contentType) 
        responseBody = {}
      else {
        responseBody = await response.json()
      }
      apiResponse.response = responseBody
      return responseBody
    }

    const error = new Error()
    error.response = response
    error.status = response.status
    apiResponseCode.code = response.status
    throw error
  } catch (err) {
    console.log('err...', err)
    const error = new Error()
    error.statusCode = err.status
    apiResponseCode.code = err.status
    error.message = err.message
    if (error.message === 'Failed to fetch') {
      error.message = 'Unable to connect to the server.'
    }
    if (err.response) {
      const errorBody = await err.response.json()
      error.body = errorBody
    }
    throw error
  }
}

export async function api(uri, { headers = {}, method = 'GET', body = {} } = {}) {
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    pragma: 'no-cache',
    'cache-control': 'no-store',
  }
  const params = modifyParams({
    headers: new Headers(header),
    method,
  })
  if (params.method !== 'GET') {
    params.body = JSON.stringify(body)
  }
  try {
    return fetchResponse(uri, params)
  } catch (e) {
    throw e
  }
}
