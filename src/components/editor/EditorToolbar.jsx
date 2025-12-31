'use client'

export default function EditorToolbar({ editor, state }) {
  if (!editor) return null

  const btn = (active) =>
    `px-3 py-1 rounded-md font-medium transition ${
      active
        ? 'bg-blue-600 text-white shadow-md'
        : 'bg-blue-400 text-white hover:bg-blue-500'
    }`

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-blue-100 border-b border-blue-300 rounded-t-lg">
      {/* טקסט */}
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(state.bold)}>B</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(state.italic)}>I</button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(state.underline)}>U</button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(state.strike)}>S</button>

      {/* כותרות */}
      {[1, 2, 3].map(level => (
        <button
          key={level}
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={btn(state[`h${level}`])}
        >
          H{level}
        </button>
      ))}

      {/* רשימות */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btn(state.bulletList)}
      >
        ••
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btn(state.orderedList)}
      >
        1.
      </button>

      {/* יישור */}
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btn(state.alignLeft)}>⬅</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btn(state.alignCenter)}>↔</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btn(state.alignRight)}>➡</button>

      {/* צבע */}
      <input
        type="color"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        className="w-8 h-8 rounded border border-blue-300"
      />

      {/* highlight */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#fde047' }).run()}
        className={`px-3 py-1 rounded-md ${
          state.highlight ? 'bg-yellow-400' : 'bg-yellow-200'
        }`}
      >
        🖍
      </button>

      <button type="button" onClick={() => editor.chain().focus().undo().run()}>↶</button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()}>↷</button>
    </div>
  )
}
