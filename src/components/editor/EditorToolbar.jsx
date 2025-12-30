'use client'

export default function EditorToolbar({ editor, state }) {
  if (!editor) return null

  const buttonClasses = (active) =>
    `px-3 py-1 rounded-md font-medium transition ${
      active ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-400 text-white hover:bg-blue-500'
    }`

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-blue-100 border-b border-blue-300 rounded-t-lg">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClasses(state.bold)}>B</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClasses(state.italic)}>I</button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonClasses(state.underline)}>U</button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonClasses(state.strike)}>S</button>

      {[1, 2, 3].map((level) => (
        <button key={level} type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={buttonClasses(state[`h${level}`])}
        >
          H{level}
        </button>
      ))}

      <input
        type="color"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        title="Text color"
        className="w-8 h-8 rounded border border-blue-300"
      />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#fde047' }).run()}
        className={`px-3 py-1 rounded-md transition ${
          state.highlight ? 'bg-yellow-400 text-black shadow-md' : 'bg-yellow-200 hover:bg-yellow-300'
        }`}
      >
        🖍
      </button>

      <button type="button" onClick={() => editor.chain().focus().undo().run()} className="px-3 py-1 rounded-md bg-blue-200 hover:bg-blue-300 text-white">↶</button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} className="px-3 py-1 rounded-md bg-blue-200 hover:bg-blue-300 text-white">↷</button>
    </div>
  )
}
