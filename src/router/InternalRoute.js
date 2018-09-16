import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { isFunction } from 'lodash'

const InternalRoute = inject()(observer(({
  isValidRedirection = true, redirectToPath, ...properties
}) => {
  return (<Route
    exact
    {...properties}
    render={props => {
      // supports render, children and component properties
      let componentToBeRendered
      // eslint-disable-next-line no-constant-condition
      if (isValidRedirection) {
        const { render: renderMethod, children, componentRef, authenticate } = properties
        const finalProps = {
          ...props,
          ...(properties || {}),
        }
        if (renderMethod && isFunction(renderMethod)) {
          componentToBeRendered = renderMethod(finalProps)
        }
        else if (children && isFunction(children)) {
          componentToBeRendered = children()
        }
        else if (componentRef) {
          if ((authenticate && authenticate.length) || !authenticate) {
            const TargetComponent = componentRef
            componentToBeRendered = (<TargetComponent {...finalProps} />)
          }
          else {
            componentToBeRendered = null
          }
        }
        else {
          throw new Error('When using internal route, one of component, render or children must be supplied.')
        }
      }
      else {
        componentToBeRendered = (<Redirect to={redirectToPath} />)
      }
      return componentToBeRendered
    }}
  />)
},
))

InternalRoute.propTypes = {
  isValidRedirection: PropTypes.bool.isRequired,
  redirectToPath: PropTypes.string.isRequired,
}

export default InternalRoute