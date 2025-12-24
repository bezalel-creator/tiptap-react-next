// src/app/api/posts/route.js
let posts = []

export async function GET() {
  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(req) {
  const body = await req.json()

  if (!body.content || !body.content.trim()) {
    return Response.json(
      { error: 'Empty content' },
      { status: 400 }
    )
  }

  const newPost = {
    id: Date.now(), 
    content: body.content,
  }

  posts.push(newPost)


  return Response.json(newPost, { status: 201 })
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) {
    return new Response(JSON.stringify({ success: false, error: 'Missing id' }), { status: 400 })
  }

  posts = posts.filter(p => p.id.toString() !== id)

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
