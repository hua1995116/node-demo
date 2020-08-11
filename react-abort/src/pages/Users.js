import React, { useState, useEffect, useCallback } from 'react'

function Users() {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  const fetchUsers = useCallback(async controller => {
    try {
      // Imagine that the fetch is going to take 3 seconds to load
      await new Promise(resolve => setTimeout(resolve, 3000))
      const response = await fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      const users = await response.json()
      setUsers(users)
    } catch (error) {
      // When abort() is called, the fetch() promise rejects with an AbortError.
      if (error.name === 'AbortError') {
        // It's ok, don't do anything
        console.log('Request aborted!')
      } else {
        console.error(error)
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchUsers(controller)
    return () => controller.abort()
  }, [fetchUsers])

  return (
    <>
      <h1>Users</h1>
      <div className="list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          users.map(user => (
            <div className="listitem" key={user.id}>
              <p>
                <i>#{user.id}</i>
              </p>
              <p>
                <b>Name</b>: {user.name}
              </p>
              <p>
                <b>Username</b>: {user.username}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Users
