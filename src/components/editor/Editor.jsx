'use client'

import { EditorContent } from '@tiptap/react'
import { useEditorLogic } from './useEditor'
import EditorToolbar from './EditorToolbar'
import { useEffect } from 'react'

export default function Editor({ value, onChange }) {
  const { editor, state } = useEditorLogic({ value, onChange })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <EditorToolbar editor={editor} state={state} />
      <div className="p-4 min-h-[200px] border-t border-blue-300 rounded-b-lg">
        <EditorContent editor={editor} className="prose prose-blue max-w-full" />
      </div>
    </div>
  )
}
