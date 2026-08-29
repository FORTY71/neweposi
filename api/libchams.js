GITHUB_RAW = "https://github.com/FORTY71/neweposi/raw/refs/heads/main/libchams.so"

export default async function handler(request, response) {
  try {
    const r = await fetch(GITHUB_RAW, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "*/*" },
      redirect: "follow",
    })
    if (!r.ok) {
      response.status(502).send("upstream fetch failed: " + r.status)
      return
    }
    const buf = Buffer.from(await r.arrayBuffer())
    response.setHeader("Content-Type", "application/octet-stream")
    response.setHeader("Content-Length", buf.length)
    response.setHeader("Content-Disposition", 'attachment; filename="libchams.so"')
    response.setHeader("Cache-Control", "no-store")
    response.status(200).send(buf)
  } catch (e) {
    response.status(502).send("upstream fetch failed: " + e.message)
  }
}
