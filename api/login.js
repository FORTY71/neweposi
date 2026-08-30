const EXPIRED_AT = process.env.EXPIRED_AT || "2099-12-31 23:59:59";

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Konsumsi stream request jika diperlukan oleh runtime/framework
  let body = "";
  req.on("data", c => body += c);
  req.on("end", () => {
    res.statusCode = 200;
    res.end(JSON.stringify({
      status: "OK",
      signature: "bypassed",
      expired_at: EXPIRED_AT,
      message: "Login successful"
    }));
  });
};
  return res.status(200).json({
    status: "OK",
    signature: "bypassed",
    expired_at: EXPIRED_AT,
    message: "Login successful"
  });
};
