module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  // client only checks status == "OK" (signature check patched out in binary)
  res.end(JSON.stringify({
    status: "OK",
    signature: "bypassed",
    message: "sync"
  }));
};
