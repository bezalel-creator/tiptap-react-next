'use client'

import { useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

export function useEditorLogic({ value = '', editable = true, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: value,
    editable,
    immediatelyRender: false, // חובה ב־Next.js
    editorProps: {
      attributes: {
        class: 'focus:outline-none tiptap-editor',
      },
    },
    onUpdate({ editor }) {
      if (onChange) {
        onChange(editor.getHTML())
      }
    },
  })

  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive('bold'),
      italic: editor?.isActive('italic'),
      underline: editor?.isActive('underline'),
      strike: editor?.isActive('strike'),
      h1: editor?.isActive('heading', { level: 1 }),
      h2: editor?.isActive('heading', { level: 2 }),
      h3: editor?.isActive('heading', { level: 3 }),
      highlight: editor?.isActive('highlight'),
    }),
  })

  return { editor, state }
}
