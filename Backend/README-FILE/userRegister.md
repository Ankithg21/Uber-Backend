# User Registration API Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. Requires email, fullname (with firstname and lastname), and password. Returns a JWT token and the created user object on success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname`: string, required, minimum 3 characters
- `fullname.lastname`: string, optional, minimum 1 character if provided
- `email`: string, required, must be a valid email
- `password`: string, required, minimum 3 characters

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
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
