'use client'

import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useRef } from 'react'
import Editor from '@/components/editor/Editor'
import { usePosts } from '@/hooks/usePosts'

export default function Page() {
  const methods = useForm({ defaultValues: { content: '' } })
  const { handleSubmit } = methods
  const editorRef = useRef(null)

  const { addPost, posts, deletePost, isLoading } = usePosts()

  const onSubmit = async ({ content }) => {
    if (!content?.trim()) return
    await addPost(content)
    methods.reset()
    editorRef.current?.commands.setContent('')
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="content"
            control={methods.control}
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
      </FormProvider>

      <hr className="my-6" />

      {isLoading && <p>טוען...</p>}

      {posts?.map(post => (
        <div key={post.id} className="border p-3 mb-4 rounded">
          <div
            className="editor-content overflow-x-auto whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-red-700 transition-colors duration-200 font-semibold"
            onClick={() => deletePost(post.id)}
          >
            ❌ מחק פוסט
          </button>
        </div>
      ))}
    </main>
  )
}
