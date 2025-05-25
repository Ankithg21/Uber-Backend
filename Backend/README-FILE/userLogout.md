# User Logout API Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the currently authenticated user by invalidating their JWT token. This route is protected and requires a valid JWT token.

## Authentication

- Requires a valid JWT token in either:
  - Cookie: `token=<jwt_token>`
  - Header: `Authorization: Bearer <jwt_token>`

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out Successfully."
  }
  ```

### Unauthorized (No Token or Invalid Token)

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  { "message": "Token not found-Unauthorized." }
  ```
  or
  ```json
  { "message": "Unauthorized!" }
  ```

### Blacklisted Token

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  { "message": "please Login you are Unauthorized." }
  ```

## Example Request

```sh
curl -X GET http://localhost:7777/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

## Notes

- You must be logged in to access this endpoint.
- The JWT token is required for authentication.
- On logout, the token is blacklisted and the cookie is cleared.