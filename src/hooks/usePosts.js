import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import axios from 'axios'

export function usePosts() {
  const { data, error, isLoading, mutate } = useSWR('/api/posts', fetcher)

  const addPostFn = async (url, { arg }) => {
    const res = await axios.post(url, { content: arg })
    return res.data
  }

  const deletePostFn = async (url, { arg }) => {
    await axios.delete(`${url}?id=${arg}`)
    return arg
  }

  const { trigger: triggerAddPost } = useSWRMutation('/api/posts', addPostFn, {
    onSuccess: () => mutate(),
  })

  const { trigger: triggerDeletePost } = useSWRMutation('/api/posts', deletePostFn, {
    onSuccess: () => mutate(),
  })

  return {
    posts: data || [],
    isLoading,
    error,
    triggerAddPost,
    triggerDeletePost,
  }
}

// fetcher עם axios
export const fetcher = async (url) => {
  const res = await axios.get(url)
  return res.data
}
