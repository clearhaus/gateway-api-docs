---
title: "Retry message"
anchor: "retry-message"
weight: 207
---

## Retry message

If an `authorization` has been rejected a retry message _can_ be sent in the
response in addition to the `status`. The message will contain a timestamp after
which a retry is permitted or null it is not.

```json
{
	"retry": {
		"after": "<time.now>",
	}
}

{
	"retry": {
		"after": "2030-02-08 09:00Z",
	}
}

{
	"retry": {
		"after": null,
	}
}

```
