
'use client'

import { EditorContent } from '@tiptap/react'
import { useEditorLogic } from './useEditor'
import EditorToolbar from './EditorToolbar'

export default function Editor({ editorRef }) {
  const { editor, state } = useEditorLogic({ value: '' })

  if (!editor) return null

  if (editorRef) editorRef.current = editor

  return (
    <div className="border rounded">
      <EditorToolbar editor={editor} state={state} />
      <div className="p-3 min-h-[150px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
