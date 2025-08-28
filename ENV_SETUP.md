# Environment Setup

## Base URL Configuration

This project uses environment variables to configure the API base URL. To set up your environment:

### 1. Create a `.env` file in the root directory

```bash
# .env
VITE_BASE_URL=http://localhost:3000
```

### 2. For production, update the `.env` file with your production URL

```bash
# .env
VITE_BASE_URL=https://your-production-api.com
```

### 3. The project will automatically use the environment variable

The `BASE_URL` constant in `src/common/const.js` will automatically use the `VITE_BASE_URL` environment variable if available, with a fallback to `http://localhost:3000`.

## Important Notes

- **Vite Environment Variables**: All environment variables must be prefixed with `VITE_` to be accessible in the frontend code
- **Security**: Environment variables are embedded in the build, so don't include sensitive information like API keys
- **Development**: The fallback URL ensures the app works even without a `.env` file

## Files Using BASE_URL

- `src/common/const.js` - Defines the BASE_URL constant
- `src/providers/axiosInstances.js` - Uses BASE_URL for axios configuration
- `src/services/endPoints.js` - All API endpoints use the configured axios instance
- `test-backend.js` - Test script uses BASE_URL for backend testing

## Example Usage

```javascript
import { BASE_URL } from "./src/common/const.js";

// Use in API calls
const response = await fetch(`${BASE_URL}/api/endpoint`);
```
