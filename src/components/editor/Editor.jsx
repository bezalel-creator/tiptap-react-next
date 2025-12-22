import { Controller, useFormContext } from 'react-hook-form'
import { useEditorLogic } from './useEditor'
import EditorToolbar from './EditorToolbar'
import { EditorContent } from '@tiptap/react'

export default function Editor({ name }) {
  const { control } = useFormContext()

  if (!name) return null

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { editor, state } = useEditorLogic({
          value: field.value || '',        // ⚠️ ערך ברירת מחדל
          onChange: field.onChange,        // ⚠️ חייב לקבל string
        })

        if (!editor) return null

        return (
          <div className="border rounded">
            <EditorToolbar editor={editor} state={state} />
            <div className="p-3 min-h-[150px]">
              <EditorContent editor={editor} />
            </div>
          </div>
        )
      }}
    />
  )
}
