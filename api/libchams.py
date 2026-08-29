import urllib.request

GITHUB_RAW = "https://github.com/FORTY71/neweposi/raw/refs/heads/main/libchams.so"


def handler(request):
    try:
        req = urllib.request.Request(GITHUB_RAW, headers={"User-Agent": "curl/8.0"})
        with urllib.request.urlopen(req, timeout=20) as r:
            data = r.read()
    except Exception:
        return {"statusCode": 502, "body": "upstream fetch failed"}
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/octet-stream",
            "Content-Length": str(len(data)),
            "Cache-Control": "no-store",
        },
        "body": data,
        "isBase64Encoded": False,
    }
