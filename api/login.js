const KEYS = new Set([
  process.env.LICENCE_KEYS || "caca"
].filter(Boolean).flatMap(s => s.split(",")));

const EXPIRED_AT = process.env.EXPIRED_AT || "2099-12-31 23:59:59";

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let body = "";
  req.on("data", c => body += c);
  req.on("end", () => {
    let key = null;
    try {
      const j = JSON.parse(body);
      const u = (j.users && j.users[0]) || {};
      const ff = u.freefire || u;
      key = ff.username || ff.key || ff.licence || null;
    } catch (_) {}

    if (!key || !KEYS.has(key)) {
      res.statusCode = 200; // client checks status field, not HTTP code
      res.end(JSON.stringify({
        status: "FAILED",
        message: "Invalid key"
      }));
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify({
      status: "OK",
      signature: "bypassed",
      expired_at: EXPIRED_AT,
      message: "Login successful"
    }));
  });
};
