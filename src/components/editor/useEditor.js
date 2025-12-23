'use client'

import { useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

export function useEditorLogic({ value = '' }) {
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
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'focus:outline-none tiptap-editor',
      },
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
      highlight: editor?.isActive('highlight', { color: '#fde047' }),
    }),
  })

  return { editor, state }
}