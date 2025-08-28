# Connection Requests Component

This component displays connection requests with a beautiful, responsive design and includes accept/reject functionality.

## Features

- **Beautiful Card Design**: Each request is displayed in a modern card layout with hover effects
- **User Information**: Shows user photo, name, email, bio, and skills
- **Request Details**: Displays request status and timestamp
- **Action Buttons**: Accept and reject buttons with loading states
- **Responsive Layout**: Adapts to different screen sizes (mobile, tablet, desktop)
- **Toast Notifications**: Success/error messages for user actions
- **Loading States**: Shows loading spinners during API calls
- **Empty State**: Beautiful message when no requests are available

## Demo Mode

The component currently runs in demo mode with sample data (Mark Zuckerberg and Elon Musk connection requests). This allows you to see the design and functionality immediately.

## Switching to Real API Mode

To connect to your real backend API:

1. **Uncomment the API calls** in the `handleAccept` and `handleReject` functions
2. **Remove the demo data** and uncomment the `fetchRequests()` call in `useEffect`
3. **Import the API functions**:
   ```jsx
   import {
     getRequests,
     acceptRequest,
     rejectRequest,
   } from "../services/endPoints";
   ```

## API Endpoints

The following endpoints are already configured in `src/services/endPoints.js`:

- `GET /user/request/received` - Fetch received connection requests
- `PUT /request/accept/{requestId}` - Accept a connection request
- `PUT /request/reject/{requestId}` - Reject a connection request

## Styling

The component uses:

- **Tailwind CSS** for utility classes
- **DaisyUI** for component styling and theme system
- **Custom gradients** and shadows for modern aesthetics
- **Responsive grid** layout that adapts to screen size

## Component Structure

```
Requests/
├── Header (title + count)
├── Request Cards Grid
│   ├── User Avatar + Info
│   ├── Bio Section (if available)
│   ├── Skills Section
│   ├── Request Details
│   └── Action Buttons (Accept/Reject)
└── Empty State (when no requests)
```

## Usage

Navigate to `/requests` in your application to view the component. The component automatically fetches and displays connection requests.

## Customization

You can easily customize:

- **Colors**: Modify the DaisyUI theme variables
- **Layout**: Adjust the grid columns and spacing
- **Card Design**: Modify the card classes and structure
- **Button Styles**: Change button colors and sizes

## Dependencies

- React 19+
- Tailwind CSS 4+
- DaisyUI 5+
- React Toastify (for notifications)
