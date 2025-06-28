# Applications

This repository contains a full-stack application with separate frontend and backend components, each with automated Docker image building and deployment via GitHub Actions.

## Project Structure

```
├── .github/workflows/
│   ├── build-web.yml      # Frontend build workflow
│   └── build-server.yml   # Backend build workflow
├── backend/               # Python Flask backend
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
├── frontend/              # React frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── README.md
```

## GitHub Actions Workflows

### Branch-based Deployment Strategy

This project uses a branch-based deployment strategy:

- **`web` branch**: Triggers frontend Docker image build and push
- **`server` branch**: Triggers backend Docker image build and push

### Frontend Workflow (web branch)

- **Trigger**: Push to `web` branch
- **Builds**: React frontend application
- **Output**: Docker image tagged as `cybersapient-frontend:latest` and `cybersapient-frontend:{SHORT_SHA}`

### Backend Workflow (server branch)

- **Trigger**: Push to `server` branch
- **Builds**: Python Flask backend application
- **Includes**: Python code formatting check with Black
- **Output**: Docker image tagged as `cybersapient-backend:latest` and `cybersapient-backend:{SHORT_SHA}`

## Setup Instructions

### 1. GitHub Secrets Configuration

You need to configure the following secrets in your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following repository secrets:

| Secret Name | Description |
|-------------|-------------|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Your Docker Hub password or access token |

### 2. Branch Setup

Create and configure your deployment branches:

```bash
# Create web branch for frontend deployments
git checkout -b web
git push origin web

# Create server branch for backend deployments
git checkout -b server
git push origin server
```

### 3. Deployment Process

#### Frontend Deployment
```bash
# Make frontend changes
git checkout web
# ... make your changes to frontend/
git add .
git commit -m "Update frontend"
git push origin web  # This triggers the frontend build workflow
```

#### Backend Deployment
```bash
# Make backend changes
git checkout server
# ... make your changes to backend/
git add .
git commit -m "Update backend"
git push origin server  # This triggers the backend build workflow
```

## Docker Images

After successful workflows, your Docker images will be available on Docker Hub:

- Frontend: `{your-username}/cybersapient-frontend:latest`
- Backend: `{your-username}/cybersapient-backend:latest`

## Local Development

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Docker Development
```bash
# Build and run frontend
docker build -t cybersapient-frontend ./frontend
docker run -p 3000:3000 cybersapient-frontend

# Build and run backend
docker build -t cybersapient-backend ./backend
docker run -p 5000:5000 cybersapient-backend
```

## Workflow Features

- **Automatic tagging**: Each build creates both `latest` and SHA-based tags
- **Code quality**: Backend workflow includes Python Black formatting checks
- **Optimized builds**: Uses Docker BuildKit for faster builds
- **Clean up**: Automatic Docker system cleanup after builds
- **Security**: Uses GitHub secrets for Docker Hub authentication

## Customization

To customize the workflows for your needs:

1. **Change Docker Hub organization**: Update the image names in the workflow files
2. **Add additional checks**: Include linting, testing, or security scanning steps
3. **Modify triggers**: Change branch names or add additional trigger conditions
4. **Environment variables**: Add build-time environment variables as needed