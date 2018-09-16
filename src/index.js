import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import mobX from 'mobx'
import DevTools from 'mobx-react-devtools'

import { App } from './components'
import { stores } from './store'

// mobX.useStrict(true)

render(
  <Provider {...stores}>
    <div>
      <DevTools/>
      <App {...stores} />
    </div>
  </Provider>,
  document.getElementById('root'),
)