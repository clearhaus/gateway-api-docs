---
title: "Retry message"
anchor: "retry-message"
weight: 207
---

## Retry message

If an `authorization` has been rejected a retry message _can_ be sent in the
response in addition to the `status`. The message will tell if the transaction
can be retried now, later or never.

```json
{
	"retry": {
		"with": [
			"liability shift",
			"strong authentication",
		],
	}
}

{
	"retry": {
		"after": "2030-02-08 09:00Z",
	}
}

{
	"retry": {
		"never": true
	}
}

```
