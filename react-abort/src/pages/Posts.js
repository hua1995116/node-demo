import React, { useState, useEffect, useCallback } from 'react'

function Posts() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const fetchPosts = useCallback(async controller => {
    try {
      // Imagine that the fetch is going to take 3 seconds to finish
      await new Promise(resolve => setTimeout(resolve, 3000))
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal })
      const posts = await response.json()
      setPosts(posts)
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
    fetchPosts(controller)
    return () => controller.abort()
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