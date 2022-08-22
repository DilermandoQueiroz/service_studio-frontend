import React from 'react'
import { withPublic } from '../hook/route'

const Dashboard = () => {
  return <div>This route is protected</div>
}

export default withPublic(Dashboard)