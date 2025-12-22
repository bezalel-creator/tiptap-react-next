export default function EditorToolbar({ editor, state }) {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50">
      <button onClick={() => editor.chain().focus().toggleBold().run()}
        className={state.bold ? 'font-bold bg-black text-white px-2' : 'px-2'}>
        B
      </button>

      <button onClick={() => editor.chain().focus().toggleItalic().run()}
        className={state.italic ? 'italic bg-black text-white px-2' : 'px-2'}>
        I
      </button>

      <button onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={state.underline ? 'underline bg-black text-white px-2' : 'px-2'}>
        U
      </button>

      <button onClick={() => editor.chain().focus().toggleStrike().run()}
        className={state.strike ? 'line-through bg-black text-white px-2' : 'px-2'}>
        S
      </button>

      {[1, 2, 3].map(level => (
        <button
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={state[`h${level}`] ? 'bg-black text-white px-2' : 'px-2'}
        >
          H{level}
        </button>
      ))}

      <input
        type="color"
        onChange={e => editor.chain().focus().setColor(e.target.value).run()}
        title="Text color"
      />

      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: '#fde047' }).run()
        }
        className={state.highlight ? 'bg-yellow-400 px-2' : 'px-2'}
      >
        🖍
      </button>

      <button onClick={() => editor.chain().focus().undo().run()}>↶</button>
      <button onClick={() => editor.chain().focus().redo().run()}>↷</button>
    </div>
  )
}
