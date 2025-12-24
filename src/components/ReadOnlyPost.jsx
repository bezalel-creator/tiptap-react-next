'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'

export default function ReadOnlyPost({ content }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }, // לא מוסיפים Heading נפרד
      }),
      Underline,
      TextStyle,
      Color,
      Highlight,
    ],
    content,
    editable: false,
    immediatelyRender: false,
  })

  if (!editor) return null
  return <EditorContent editor={editor} />
}



