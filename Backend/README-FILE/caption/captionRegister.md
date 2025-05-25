# Caption Registration API Documentation

## Endpoint

`POST /captions/register`

## Description

Registers a new caption (driver) in the system with their personal and vehicle details. Returns a JWT token and the created caption object on success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Field Requirements

- `fullname.firstname`: string, required, minimum 3 characters
- `fullname.lastname`: string, optional, minimum 3 characters if provided
- `email`: string, required, must be a valid email address
- `password`: string, required, minimum 6 characters
- `vehicle.color`: string, required, minimum 3 characters
- `vehicle.plate`: string, required, minimum 3 characters
- `vehicle.capacity`: integer, required, minimum 1
- `vehicle.vehicleType`: string, required, must be one of: `"auto"`, `"car"`, `"motorcycle"`

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "caption": {
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

### Caption Already Exists

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Caption already exist."
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:7777/captions/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

## Notes

- All required fields must be provided for successful registration.
- The response includes a JWT token for authentication and the registered caption's details.