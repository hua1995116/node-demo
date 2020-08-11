import React, { useState, useEffect, useCallback } from 'react'

function Posts() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const fetchPosts = useCallback(async () => {
    try {
      // Imagine that the fetch is going to take 3 seconds to finish
      await new Promise(resolve => setTimeout(resolve, 3000))
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const posts = await response.json()
      setPosts(posts)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <>
      <h1>Posts</h1>
      <div className="list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          posts.map(post => (
            <div className="listitem" key={post.id}>
              <p>
                <i>#{post.id}</i>
              </p>
              <p>
                <b>Title</b>: {post.title}
              </p>
              <p>
                <b>Body</b>: {post.body}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Posts