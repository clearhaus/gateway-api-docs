---
title: "Authentication"
date: 2022-04-08T14:18:46+02:00
anchor: "authentication"
weight: 15
---
## Authentication
Authentication is done via HTTP Basic Auth. Simply provide your API key as username and a blank string as password. Remember a colon : after username when using cURL to specify an empty password.

```code
curl https://gateway.test.clearhaus.com \
     -u <your-api-key>:
```
You will get this response when you provide an invalid API key:

```HTTP
HTTP/1.1 401 Not Authorized
```
