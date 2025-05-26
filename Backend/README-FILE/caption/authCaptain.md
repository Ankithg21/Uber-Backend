# authCaptain Middleware Documentation

## Purpose

The `authCaptain` middleware protects routes by verifying the presence and validity of a JWT token for captions (drivers). It ensures that only authenticated captions can access certain endpoints.

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
   It checks if the token is blacklisted. If blacklisted, it responds with:
   - **Status:** `400 Bad Request`
   - **Body:**  
     ```json
     { "message": "you are unauthorized, please login." }
     ```

4. **Token Verification:**  
   It verifies the token using the JWT secret. If verification fails, it responds with:
   - **Status:** `401 Unauthorized`
   - **Body:**  
     ```json
     { "message": "Unauthorized!" }
     ```

5. **Caption Retrieval:**  
   If the token is valid, it fetches the caption by ID and attaches the caption object to `req.captain`, then calls `next()` to proceed to the protected route.

## Usage Example

Apply the middleware to any caption-protected route:

```javascript
const { authCaptain } = require('../middlewares/auth.middleware');

router.get('/profile', authCaptain, captainController.getCaptainProfile);
```

## Expected Token Format

- **Cookie:** `token=<jwt_token>`
- **Header:** `Authorization: Bearer <jwt_token>`

## Error Responses

| Status | Message                                 |
|--------|-----------------------------------------|
| 401    | Token not found-Unauthorized.           |
| 400    | you are unauthorized, please login.     |
| 401    | Unauthorized!                           |

## Notes

- Ensure your JWT secret is set in the environment variable `JWT_SECRET`.
- The blacklist check uses a dedicated blacklist collection.
- The middleware attaches the authenticated caption to `req.captain` for use in subsequent handlers.