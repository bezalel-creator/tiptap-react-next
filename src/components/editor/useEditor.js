import { useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

export function useEditorLogic({ value = '', onChange }) { // ⚠️ ערך ברירת מחדל

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
    content: value || '',   // ⚠️ תמיד string
    onUpdate: ({ editor }) => {
      if (onChange && typeof onChange === 'function') {
        onChange(editor.getHTML())
      }
    },
  })

  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive('bold') || false,
      italic: editor?.isActive('italic') || false,
      underline: editor?.isActive('underline') || false,
      strike: editor?.isActive('strike') || false,
      h1: editor?.isActive('heading', { level: 1 }) || false,
      h2: editor?.isActive('heading', { level: 2 }) || false,
      h3: editor?.isActive('heading', { level: 3 }) || false,
      highlight: editor?.isActive('highlight') || false,
    }),
  })

  return { editor, state }
}
