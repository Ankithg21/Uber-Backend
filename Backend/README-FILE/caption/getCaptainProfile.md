# Caption Profile API Documentation

## Endpoint

`GET /captions/profile`

## Description

Retrieves the profile information of the currently authenticated caption (driver). This route is protected and requires a valid JWT token.

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
    "_id": "<caption_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
  { "message": "you are unauthorized, please login." }
  ```

## Example Request

```sh
curl -X GET http://localhost:7777/captions/profile \
  -H "Authorization: Bearer <jwt_token>"
```

## Notes

- You must be logged in as a caption to access this endpoint.
- The JWT token is required for authentication.
- The response contains the caption's profile information as stored in the database.