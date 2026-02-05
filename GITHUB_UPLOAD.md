# GitHub Upload Instructions 📤

## Steps to Upload to GitHub

### 1. Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **"+"** icon → **"New repository"**
3. Enter repository name: `LabServ` (or your preferred name)
4. Add description: "Lab device management interface with IP addresses, device logos, and database storage"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README (we already have one)
7. Click **"Create repository"**

### 2. Connect Local Repository to GitHub

Copy and run these commands in PowerShell (in the LabServ directory):

```powershell
cd c:\Users\cadet\LabServ

# Add the remote (replace YOUR_USERNAME and YOUR_REPO with your GitHub info)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO` with your repository name

### 3. Verify Upload

- Go to your GitHub repository URL
- You should see all the files and the README

## Project Information for GitHub

**Repository Name:** LabServ

**Description:** 
Full-stack lab device management interface. Add lab devices with custom names, IP addresses, and logos. Click devices to access them directly. Features React frontend, Express backend, SQLite database, and image upload handling.

**Topics/Tags:**
- react
- typescript
- express
- sqlite
- lab-management
- device-management
- vite
- nodejs

**Key Features Listed in README:**
- ✅ Add devices with names and IP addresses
- ✅ Upload device logos to database
- ✅ Click to access devices directly
- ✅ Copy IP addresses
- ✅ Persistent SQLite database
- ✅ Image storage on server
- ✅ Responsive design
- ✅ REST API endpoints
- ✅ Dark theme UI

## Updating After Changes

When you make changes to your code:

```powershell
cd c:\Users\cadet\LabServ

# Stage changes
git add .

# Commit with message
git commit -m "Your commit message here"

# Push to GitHub
git push
```

## Repository Status ✅

**Current Status:**
- ✅ Git initialized locally
- ✅ All files staged and committed
- ✅ Ready for GitHub upload
- ✅ Comprehensive README included
- ✅ .gitignore configured
- ✅ node_modules will be ignored

**Files Committed (15 files):**
1. .github/copilot-instructions.md
2. .gitignore
3. README.md
4. index.html
5. package-lock.json
6. package.json
7. preview.html
8. server/index.js
9. src/App.css
10. src/App.tsx
11. src/index.css
12. src/main.tsx
13. tsconfig.json
14. tsconfig.node.json
15. vite.config.ts

---

**Ready to push! Follow the steps above to upload to GitHub.** 🚀
