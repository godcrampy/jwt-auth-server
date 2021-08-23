# JWT Auth Server

Simple JWT authentication server written using typescript and mongodb with Role Based Access Control included.

## Setup

Add mongodb credentials to `src/config/db.config.ts`:

```ts
// db.config.ts
export const URL = "<connection_url>";
```

> Refresh Tokens not supported
