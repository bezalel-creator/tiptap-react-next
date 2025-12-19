let posts = []

export async function GET() {
  return Response.json(posts)
}

export async function POST(req) {
  const body = await req.json()
  posts.push({ id: Date.now(), content: body.content })
  return Response.json({ success: true })
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) {
    return Response.json({ success: false, error: 'Missing id' })
  }

  posts = posts.filter(post => post.id.toString() !== id)
  return Response.json({ success: true })
}
