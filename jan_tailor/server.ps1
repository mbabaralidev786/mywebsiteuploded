$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:5500/")
$listener.Start()
$baseDir = "c:\Learning\Github\jan_tailor"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $reqPath = $context.Request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($reqPath)) { $reqPath = "index.html" }
        $localFile = [System.IO.Path]::Combine($baseDir, $reqPath.Replace('/', '\'))
        
        if ([System.IO.File]::Exists($localFile)) {
            $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css" }
                ".js"   { "application/javascript" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png"  { "image/png" }
                default { "application/octet-stream" }
            }
            $context.Response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($localFile)
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $context.Response.StatusCode = 404
        }
        $context.Response.Close()
    } catch {
        # ignore client disconnects
    }
}
