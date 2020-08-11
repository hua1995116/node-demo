import React, { useState, useEffect, useCallback } from 'react'

function Users() {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  const fetchUsers = useCallback(async () => {
    try {
      // Imagine that the fetch is going to take 3 seconds to load
      await new Promise(resolve => setTimeout(resolve, 3000))
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await response.json()
      setUsers(users)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
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
