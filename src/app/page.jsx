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

  const { posts, isLoading, error, triggerAddPost, triggerDeletePost, refreshPosts } = usePosts()
  const [submitError, setSubmitError] = useState(null)

  const onSubmit = async (data) => {
    setSubmitError(null)
    const content = data.content || ''
    if (!content.trim()) return
    const safeContent = sanitize(content)

    try {
      await triggerAddPost(safeContent)
      if (refreshPosts) await refreshPosts()
      reset({ content: '' })
    } catch (err) {
      console.error(err)
      setSubmitError('שגיאה בשליחת הפוסט. אנא נסה שוב.')
    }
  }

  return (
    <main className="min-h-screen bg-blue-600 flex flex-col items-center p-6 space-y-6">
      {/* ⭐ כותרת */}
      <h1 className="text-3xl font-bold text-white drop-shadow-lg">MINI EDITOR BY BEZALEL</h1>

      {/* ⭐ טופס העורך */}
      <div className="w-full max-w-5xl bg-blue-50 p-6 rounded-xl shadow-xl">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="content"
              control={control}
              render={({ field }) => <Editor {...field} />}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-bold shadow-md"
            >
              שלח פוסט
            </button>
          </form>
        </FormProvider>
        {submitError && <p className="text-red-600 mt-2">{submitError}</p>}
      </div>

      {/* ⭐ רשימת הפוסטים */}
      <div className="w-full max-w-5xl space-y-4">
        {isLoading && <p className="text-white">טוען...</p>}
        {error && <p className="text-red-600">שגיאה בטעינת הפוסטים</p>}

        {posts?.map((post) => (
          <div
            key={post.id}
            className="tiptap-content border p-4 rounded-lg shadow-lg bg-white"
          >
            <ReadOnlyPost content={post.content} />
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-red-700 transition"
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
