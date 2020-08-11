import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Users from './pages/Users-1'
import Posts from './pages/Posts-1'
// import Users from './pages/Users'
// import Posts from './pages/Posts'
import Home from './pages/Home'
import './App.css'

export default function App() {
  return (
    <Router>
      <div className="App">
        <aside className="App__sidebar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </aside>
        <div className="App__page">
          <Switch>
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}