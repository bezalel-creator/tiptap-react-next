'use client'

import { useForm, FormProvider, Controller } from 'react-hook-form'
import Editor from '@/components/editor/Editor'
import ReadOnlyPost from '@/components/ReadOnlyPost'
import { usePosts } from '@/hooks/usePosts'
import { sanitize } from '@/lib/sanitizeHtml'
import { useState } from 'react'

export default function Page() {
  const methods = useForm({ defaultValues: { content: '' } })
  const { handleSubmit, control, reset } = methods

  const { posts, isLoading, error, triggerAddPost, triggerDeletePost, isMutating } = usePosts()
  const [submitError, setSubmitError] = useState(null)

  const onSubmit = async (data) => {
    setSubmitError(null)
    const content = data.content || ''
    if (!content.trim()) return
    const safeContent = sanitize(content)

    try {
      await triggerAddPost(safeContent)
      reset({ content: '' })
    } catch (err) {
      console.error(err)
      setSubmitError('שגיאה בשליחת הפוסט. אנא נסה שוב.')
    }
  }

  return (
    <main className="min-h-screen bg-blue-600 flex flex-col items-center p-4 sm:p-6 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg text-center">
        MINI EDITOR BY BEZALEL
      </h1>

      <div className="w-full max-w-5xl bg-blue-50 p-4 sm:p-6 rounded-xl shadow-xl">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="content"
              control={control}
              render={({ field }) => <Editor {...field} />}
            />
            <button
              type="submit"
              disabled={isMutating}
              className={`w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md transition
                ${isMutating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {isMutating ? 'שולח...' : 'שלח פוסט'}
            </button>
          </form>
        </FormProvider>
        {submitError && <p className="text-red-600 mt-2">{submitError}</p>}
      </div>

      <div className="w-full max-w-5xl space-y-4">
        {isLoading && <p className="text-white text-center">טוען פוסטים...</p>}
        {error && <p className="text-red-600 text-center">שגיאה בטעינת הפוסטים</p>}

        {posts?.map((post) => (
          <div
            key={post.id}
            className="tiptap-content border p-4 rounded-lg shadow-lg bg-white"
          >
            <ReadOnlyPost content={post.content} />
            <button
              type="button"
              disabled={isMutating}
              className={`bg-red-600 text-white px-4 py-2 rounded-md mt-3 transition
                ${isMutating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
              onClick={() => triggerDeletePost(post.id)}
            >
              ❌ מחק פוסט
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
