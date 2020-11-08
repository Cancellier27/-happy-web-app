import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './screens/Landing'
import OrphanagesMap from './screens/OrphanagesMap'
import Orphanage from './screens/Orphanage'
import CreateOrphanage from './screens/CreateOrphanage'
import SuccessfulPage from './components/SuccessfulRegistrationPage'
import ErrorPage from './components/pageNotFound'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/app" component={OrphanagesMap} />

      <Route path="/orphanages/create/success" component={SuccessfulPage} />
      <Route path="/orphanages/create" component={CreateOrphanage} />
      <Route path="/orphanages/:id" component={Orphanage} />
      <Route path='*' component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes