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
