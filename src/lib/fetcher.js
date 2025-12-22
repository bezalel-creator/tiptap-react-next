export async function fetcher(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network error')
  return res.json() // מחזיר array או object לפי ה־API
}
