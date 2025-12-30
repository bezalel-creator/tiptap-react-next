'use client'

import { EditorContent } from '@tiptap/react'
import { useEditorLogic } from './editor/useEditor'

export default function ReadOnlyPost({ content }) {
  const { editor } = useEditorLogic({
    value: content,
    editable: false,
  })

  if (!editor) return null

  return (
    <div className="tiptap-content">
      <EditorContent editor={editor} />
    </div>
  )
}
