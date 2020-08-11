import React from 'react'
// import Gist from 'react-gist'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>
        Open the console developer and switch page very rapidly to{' '}
        <Link to="/users">
          <code>/users</code>
        </Link>{' '}
        and{' '}
        <Link to="/posts">
          <code>/posts</code>
        </Link>{' '}
        and back to the homepage.
      </p>
      <p>
        Learn more here:{' '}
        <a href="https://dev.to/viclafouch/cancel-properly-http-requests-in-react-hooks-and-avoid-memory-leaks-pd7">
          <span role="img" aria-labelledby="Ice cream">
            🍦
          </span>{' '}
          Cancel Properly HTTP Requests in React Hooks and avoid Memory Leaks{' '}
          <span role="img" aria-labelledby="Warning">
            🚨
          </span>
        </a>
      </p>
      <h2>Source code:</h2>
      {/* <Gist id="91e4782d6831a2cf95def05eba80db11" /> */}
    </>
  )
}

export default Home
