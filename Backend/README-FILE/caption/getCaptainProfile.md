# Caption (Driver) Login API Documentation

## Endpoint

`POST /captions/login`

## Description

Authenticates a caption (driver) using their email and password. Returns a JWT token and the caption object on successful login.

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
    "captainExist": {
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

### Caption Not Registered

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Caption not yet registered."
  }
  ```

### Incorrect Password

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Incorrect password, please enter correct password."
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:7777/captions/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

## Notes

- All required fields must be provided for successful login.
- The response includes a JWT token for authentication and the caption's details.