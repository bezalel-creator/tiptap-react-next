import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export function usePosts() {
  // SWR עם fallbackData כדי שתמיד יהיה array
  const { data, mutate, error, isLoading } = useSWR('/api/posts', fetcher, {
    fallbackData: [],
  })

  // posts תמיד array
  const posts = data || []

  // פונקציה להוספת פוסט
  const addPost = async (content) => {
    if (!content || !content.trim()) return

    // אפשר להוסיף optimistic update
    const tempPost = { id: Date.now(), content }
    mutate([tempPost, ...posts], false) // עדכון מיידי ב-client

    // שליחה לשרת
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })

    if (!res.ok) {
      // במקרה של שגיאה – מחזיר את המצב המקורי
      mutate(posts, false)
      throw new Error('Failed to add post')
    }

    // שליפה מחדש כדי לסנכרן עם השרת
    mutate()
  }

  // פונקציה למחיקת פוסט
  const deletePost = async (id) => {
    // עדכון מיידי ב-client
    mutate(posts.filter(p => p.id !== id), false)

    // שליחה לשרת
    const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' })
    if (!res.ok) {
      // במקרה של שגיאה – מחזיר את המצב המקורי
      mutate()
      throw new Error('Failed to delete post')
    }

    // שליפה מחדש
    mutate()
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
