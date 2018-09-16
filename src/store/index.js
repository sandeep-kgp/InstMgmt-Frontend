import { RouterStore } from 'mobx-react-router'

import { applicationStores } from './application'

export const stores = {
  ...applicationStores,
  routing: new RouterStore(),
}
