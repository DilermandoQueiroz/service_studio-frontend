import React from 'react'
import { withProtected } from '../hook/route'

const Dashboard = () => {
  return <div>This route is protected</div>
}

export default withProtected(Dashboard)