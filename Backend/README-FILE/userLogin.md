# User Login API Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user with their email and password. Returns a JWT token and the user object on successful login.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email`: string, required, must be a valid email address
- `password`: string, required, minimum 3 characters

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "existingUser": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

### User Not Registered

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "User not yet Registered."
  }
  ```

### Incorrect Password

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Incorrect password, Please enter valid Password."
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:7777/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```