'use client'

import { useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'

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
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'tiptap-editor focus:outline-none min-h-[200px]',
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
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
      bulletList: editor?.isActive('bulletList'),
      orderedList: editor?.isActive('orderedList'),
      alignLeft: editor?.isActive({ textAlign: 'left' }),
      alignCenter: editor?.isActive({ textAlign: 'center' }),
      alignRight: editor?.isActive({ textAlign: 'right' }),
      highlight: editor?.isActive('highlight'),
    }),
  })

  return { editor, state }
}
