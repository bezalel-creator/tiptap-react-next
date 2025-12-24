'use client'

import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useRef } from 'react'

import Editor from '@/components/editor/Editor'
import ReadOnlyPost from '@/components/ReadOnlyPost'
import { usePosts } from '@/hooks/usePosts'
import { sanitize } from '@/lib/sanitizeHtml'

export default function Page() {
  const methods = useForm({ defaultValues: { content: '' } })
  const { handleSubmit } = methods
  const editorRef = useRef(null)

  const { addPost, posts, deletePost, isLoading } = usePosts()

  const onSubmit = async () => {
    const content = editorRef.current?.getHTML() || ''
    if (!content.trim()) return

    const safeContent = sanitize(content)

    try {
      await addPost(safeContent)
      methods.reset()
      editorRef.current?.commands.setContent('')
    } catch (error) {
      console.error('שגיאה בשליחת הפוסט:', error)
      let message = 'אירעה שגיאה בשליחת הפוסט. אנא נסה שוב.'
      if (error?.response?.status >= 500) message = 'שגיאת שרת. נסה שוב מאוחר יותר.'
      else if (error?.response?.status >= 400) message = 'שגיאה בבקשה. בדוק את הנתונים ונסה שוב.'
      else if (error instanceof TypeError) message = 'בעיה ברשת. בדוק את החיבור ונסה שוב.'
      alert(message)
    }
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
                value={field.value || ''}
                onChange={field.onChange}
                editorRef={editorRef}
              />
            )}
          />

          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            שלח פוסט
          </button>
        </form>
      </FormProvider>

      <hr className="my-6" />

      {isLoading && <p>טוען...</p>}

      {posts?.map(post => (
        <div key={post.id} className="tiptap-content border p-3 mb-4 rounded">
          <ReadOnlyPost content={post.content} />

          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-red-700"
            onClick={() => deletePost(post.id)}
          >
            ❌ מחק פוסט
          </button>
        </div>
      ))}
    </main>
  )
}
