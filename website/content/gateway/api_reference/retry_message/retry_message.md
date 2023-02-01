---
title: "Retry message"
anchor: "retry-message"
weight: 207
---

## Retry message

If an `authorization` has been rejected a retry message _can_ be sent in the
response in addition to the `status`. The message will contain a timestamp after
which a retry is permitted and an indicator if retry is permitted or not.

```json
{
	"retry": {
		"permitted": true,
		"after": "<time.now>",
	}
}

{
	"retry": {
		"permitted": true,
		"after": "2030-02-08 09:00Z",
	}
}

{
	"retry": {
		"permitted": false,
		"after": null,
	}
}

```
