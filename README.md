# Lab Interface 🖥️

A modern, full-stack web application for managing lab devices by IP address. Add devices with custom names, logos, and easily access them through a beautiful interface. Built with React, TypeScript, Express.js, and SQLite.

## Features ✨

- ✅ **Add Devices** - Create lab devices with custom names and IP addresses
- ✅ **Upload Logos** - Store device logos/images with proper database handling (no size limits)
- ✅ **Quick Access** - Click any device card to open its IP address in a new tab
- ✅ **Copy IP** - One-click copy of device IP addresses to clipboard
- ✅ **Persistent Storage** - All data stored in SQLite database
- ✅ **Image Management** - Images stored on server disk, not in localStorage
- ✅ **Responsive Design** - Works perfectly on desktop and mobile
- ✅ **Modern UI** - Dark theme with smooth animations and gradients
- ✅ **Error Handling** - User-friendly error messages

## Tech Stack 🛠️

**Frontend:**
- React 18+
- TypeScript
- Vite
- CSS3

**Backend:**
- Node.js
- Express.js
- SQLite3
- Multer (file upload)
- CORS

## Project Structure 📁

```
├── src/
│   ├── App.tsx              # Main React component
│   ├── App.css              # App styling
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles
├── server/
│   └── index.js             # Express backend server
├── uploads/                 # Stored device logos
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
└── index.html               # HTML entry point
```

## Getting Started 🚀

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org))
- **Git** (optional, for cloning)
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/LabServ.git
cd LabServ
```

2. **Install dependencies**
```bash
npm install
```

### Running the Application

You need to run **two terminals** - one for the backend and one for the frontend:

**Terminal 1 - Start Backend Server (Port 3001):**
```bash
npm run server
```
You should see: `Server running at http://localhost:3001`

**Terminal 2 - Start Frontend Development Server (Port 5173):**
```bash
npm run dev
```
You should see: `VITE ... ready in XXX ms` and `Local: http://localhost:5173`

3. **Open in Browser**
Navigate to: `http://localhost:5173`

## Usage Guide 📖

### Adding a Device

1. In the **"Add New Device"** section, enter:
   - **Device Name** - e.g., "Main Server", "Router", "Switch"
   - **IP Address** - e.g., "192.168.1.100"
   - **Device Logo** (optional) - Upload an image file

2. Click **"Add Device"** button

3. Device appears in the grid below

### Accessing Devices

- **Click the device card** to open the IP address in a new browser tab
  - Automatically adds `http://` if not provided
  
- **Click "Copy IP"** to copy the IP address to clipboard

- **Click "Delete"** to remove a device (confirmation required)

### Managing Images

- Images are stored on the server (uploads folder)
- No file size limit in localStorage
- Supports: JPG, PNG, GIF, WebP, and other image formats
- Maximum file size: 10MB per image

## API Endpoints 🔌

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/devices` | Get all devices |
| GET | `/api/devices/:id` | Get specific device |
| POST | `/api/devices` | Add new device (with file upload) |
| PUT | `/api/devices/:id` | Update device |
| DELETE | `/api/devices/:id` | Delete device |

### Example API Usage

```bash
# Get all devices
curl http://localhost:3001/api/devices

# Add a device with image
curl -X POST -F "name=My Server" -F "ip=192.168.1.100" -F "logo=@path/to/image.png" \
  http://localhost:3001/api/devices
```

## Building for Production 📦

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## Database 🗄️

- **SQLite Database**: `lab-devices.db` (auto-created)
- **Stored Data**: Device name, IP address, logo file path, creation timestamp
- **Image Storage**: `uploads/` directory

## Troubleshooting 🔧

### Port already in use
If port 3001 or 5173 is already in use, modify the server configuration.

### Images not uploading
- Ensure backend server is running (`npm run server`)
- Check file size (max 10MB)
- Verify image format is supported

### Database errors
- Delete `lab-devices.db` to reset the database
- Ensure `uploads/` folder has write permissions

### CORS errors
- Both servers must be running
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:3001`

## Available Scripts 📝

```bash
npm run dev          # Start frontend development server
npm run server       # Start backend server
npm run dev-full     # Start both servers concurrently
npm run build        # Build for production
npm run preview      # Preview production build
```

## Future Enhancements 🚀

- SSH/RDP connection support
- Device status monitoring
- Device grouping/categories
- User authentication
- Device scheduling
- Backup/restore functionality

## Contributing 🤝

Feel free to submit issues and enhancement requests!

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

## Support 💬

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ for lab management**
