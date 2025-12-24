import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export function usePosts() {
  
  const { data, mutate, error, isLoading } = useSWR('/api/posts', fetcher, {
    fallbackData: [],
  })
console.log('SWR posts data:', data)

  const posts = data || []

const addPost = async (content) => {
  if (!content || !content.trim()) return

  const newPost = {
    id: Date.now(), 
    content,
  }

  await mutate(
    async (currentPosts = []) => {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      if (!res.ok) {
        throw new Error('Failed to add post')
      }

      const savedPost = await res.json()

      
      return [savedPost, ...currentPosts]
    },
    {
      optimisticData: (current = []) => [newPost, ...current],
      rollbackOnError: true,
      revalidate: false,
    }
  )
}

const deletePost = async (id) => {
  await mutate(
    async (currentPosts = []) => {
      const res = await fetch(`/api/posts?id=${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete post')
      }

      return currentPosts.filter(post => post.id !== id)
    },
    {
      optimisticData: (current = []) =>
        current.filter(post => post.id !== id),
      rollbackOnError: true,
      revalidate: false,
    }
  )
}



  return {
    posts,
    addPost,
    deletePost,
    error,
    isLoading,
    mutate,
  }
}
