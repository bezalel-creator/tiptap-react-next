let posts = []

export async function GET() {
  return Response.json(posts)
}

export async function POST(req) {
  const body = await req.json()

  if (!body?.content?.trim()) {
    return Response.json(
      { error: 'Empty content' },
      { status: 400 }
    )
  }

  const newPost = {
    id: Date.now(),
    content: body.content,
  }

  posts.unshift(newPost)

  return Response.json(newPost, { status: 201 })
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return Response.json(
      { error: 'Missing id' },
      { status: 400 }
    )
  }

  posts = posts.filter(p => p.id.toString() !== id)

  return Response.json({ success: true })
}
