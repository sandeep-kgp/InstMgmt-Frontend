import React from 'react'
import { InternalRoute } from '.'

const Authenticated = ({ ...properties }) => {
  const isValidRedirection = true
  return (
    <InternalRoute
      isValidRedirection={isValidRedirection}
      redirectToPath="/login"
      {...properties}
    />)
}

export default Authenticated
