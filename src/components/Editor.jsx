'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { useEffect, useState } from 'react'

const MyTextStyle = TextStyle.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {},
    }
  },
})

export default function Editor({ value, onChange, editorRef }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      MyTextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (!editor) return
    const update = () => forceUpdate(n => n + 1)
    editor.on('transaction', update)
    editor.on('selectionUpdate', update)
    return () => {
      editor.off('transaction', update)
      editor.off('selectionUpdate', update)
    }
  }, [editor])

  useEffect(() => {
    if (editorRef) editorRef.current = editor
  }, [editor, editorRef])

  if (!editor) return null

  return (
    <div className="border rounded">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'font-bold bg-black text-white px-2' : 'px-2'}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'italic bg-black text-white px-2' : 'px-2'}
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'underline bg-black text-white px-2' : 'px-2'}
        >
          U
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'line-through bg-black text-white px-2' : 'px-2'}
        >
          S
        </button>

        {/* Headings */}
        {[1, 2, 3].map(level => (
          <button
            key={level}
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={editor.isActive('heading', { level }) ? 'bg-black text-white px-2' : 'px-2'}
          >
            H{level}
          </button>
        ))}

        {/* Text color */}
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          title="Text color"
        />

        {/* 🔶 Highlight yellow */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: '#fde047' }).run()
          }
          className={
            editor.isActive('highlight', { color: '#fde047' })
              ? 'bg-yellow-400 px-2'
              : 'px-2'
          }
          title="Highlight yellow"
        >
          🖍
        </button>

        <button type="button" onClick={() => editor.chain().focus().undo().run()}>↶</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()}>↷</button>
      </div>

      {/* Editor */}
      <div className="p-3 min-h-[150px] editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
