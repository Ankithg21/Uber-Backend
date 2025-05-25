# Auth Middleware Documentation

## Purpose

The `authUser` middleware is used to protect routes by verifying the presence and validity of a JWT token. It ensures that only authenticated users can access certain endpoints.

## How It Works

1. **Token Extraction:**  
   The middleware checks for a JWT token in the `token` cookie or in the `Authorization` header as a Bearer token.

2. **Token Presence:**  
   If no token is found, it responds with:
   - **Status:** `401 Unauthorized`
   - **Body:**  
     ```json
     { "message": "Token not found-Unauthorized." }
     ```

3. **Blacklist Check:**  
   It checks if the token is blacklisted (should be checked in a blacklist collection, not the user collection). If blacklisted, it responds with:
   - **Status:** `400 Bad Request`
   - **Body:**  
     ```json
     { "message": "please Login you are Unauthorized." }
     ```

4. **Token Verification:**  
   It verifies the token using the JWT secret. If verification fails, it responds with:
   - **Status:** `401 Unauthorized`
   - **Body:**  
     ```json
     { "message": "Unauthorized!" }
     ```

5. **User Retrieval:**  
   If the token is valid, it fetches the user by ID and attaches the user object to `req.user`, then calls `next()` to proceed to the protected route.

## Usage Example

Apply the middleware to any route you want to protect:

```javascript
const { authUser } = require('./middlewares/auth.middleware');

router.get('/profile', authUser, userController.getUserProfile);
```

## Expected Token Format

- **Cookie:** `token=<jwt_token>`
- **Header:** `Authorization: Bearer <jwt_token>`

## Error Responses

| Status | Message                                      |
|--------|----------------------------------------------|
| 401    | Token not found-Unauthorized.                |
| 400    | please Login you are Unauthorized.           |
| 401    | Unauthorized!                                |

## Note

- Ensure your JWT secret is set in the environment variable `JWT_SECRET`.
- The blacklist check should ideally use a dedicated blacklist collection, not the user collection.