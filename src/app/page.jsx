'use client'

import { useForm, Controller } from 'react-hook-form'
import useSWR from 'swr'
import { useRef } from 'react'

import Editor from '@/components/Editor'
import { fetcher } from '@/lib/fetcher'

export default function Home() {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { content: '' },
  })

  const editorRef = useRef(null)
  const { data: posts, mutate } = useSWR('/api/posts', fetcher)

  const onSubmit = async (data) => {
    if (!data.content.trim()) return

    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    mutate()
    setValue('content', '')

    if (editorRef.current) {
      editorRef.current.commands.setContent('')
    }
  }

  const handleDelete = async (id) => {
    await fetch(`/api/posts?id=${id}`, {
      method: 'DELETE',
    })
    mutate()
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        Mini Editor by bezalel achoonov
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Editor
              value={field.value}
              onChange={field.onChange}
              editorRef={editorRef}
            />
          )}
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          שלח פוסט
        </button>
      </form>

      <hr className="my-6" />

      <h2 className="font-semibold mb-2">פוסטים:</h2>

      {posts?.map((post) => (
        <div key={post.id} className="border p-2 mb-4 rounded">
          {/* 🟢 חשוב: אותה מחלקה כמו בעורך */}
          <div
            className="editor-content overflow-x-auto whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <button
            type="button"
            className="bg-red-500 text-white px-3 py-1 rounded mt-3 hover:bg-red-600"
            onClick={() => handleDelete(post.id)}
          >
            מחק פוסט
          </button>
        </div>
      ))}
    </main>
  )
}
