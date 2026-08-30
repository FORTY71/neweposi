const DEFAULT_KEYS = ["caca"];

const ENV_KEYS = (process.env.LICENCE_KEYS || "")
  .split(",")
  .map(k => k.trim())
  .filter(Boolean);

const KEYS = new Set([
  ...DEFAULT_KEYS,
  ...ENV_KEYS
]);

const EXPIRED_AT =
  process.env.EXPIRED_AT || "2099-12-31 23:59:59";

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  let data = {};

  try {
    // Vercel/Node kadang sudah menyediakan req.body
    if (req.body && typeof req.body === "object") {
      data = req.body;
    } else {
      // Fallback kalau body masih berupa raw stream
      let body = "";

      await new Promise((resolve, reject) => {
        req.on("data", chunk => {
          body += chunk.toString();
        });

        req.on("end", resolve);
        req.on("error", reject);
      });

      if (body.trim()) {
        data = JSON.parse(body);
      }
    }
  } catch (err) {
    return res.status(200).json({
      status: "FAILED",
      message: "Invalid JSON"
    });
  }

  const user = (Array.isArray(data.users) && data.users[0]) || {};
  const freefire = user.freefire || user;

  const key = String(
    freefire.username ||
    freefire.key ||
    freefire.licence ||
    ""
  ).trim();

  if (!key || !KEYS.has(key)) {
    return res.status(200).json({
      status: "FAILED",
      message: "Invalid key"
    });
  }

  return res.status(200).json({
    status: "OK",
    signature: "bypassed",
    expired_at: EXPIRED_AT,
    message: "Login successful"
  });
};
