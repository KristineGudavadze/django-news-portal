# Django Real-Time News Portal

A real-time news portal built with **Django**, **Django REST Framework**, and **Channels** using **WebSockets** for live updates.

## Features
- Live news updates with WebSockets
- REST API for fetching and generating articles
- Manual article creation via form
- Responsive frontend with JavaScript & CSS
- ASGI support (works with Daphne/Uvicorn)
- Static file management with WhiteNoise

## Recent Updates
- main.js: cleaned code, added manual article form, WebSocket handling
- news.html: added manual article form alongside the Generate button
- settings.py: WhiteNoise added, static files prepared for ASGI servers

## Installation
1. Clone the repository:
```bash
git clone https://github.com/KristineGudavadze/news_portal.git
cd news_portal
```
# create & activate virtual environment
- python3 -m venv venv
- source venv/bin/activate  # Linux/macOS
- venv\Scripts\activate    # Windows

# Install dependencies
pip install -r requirements.txt

# Apply migrations & collect static files
- python manage.py migrate
- python manage.py collectstatic

# Running the App

Before running the ASGI server, make sure to collect static files.

### Step 1: (Optional) Run Django server for testing
```bash
python manage.py runserver
```
### Step 2: Collect static files
```bash
python manage.py collectstatic
```
### Step 3: Run ASGI server (recommended for WebSockets)
```bash
uvicorn news_portal.asgi:application --reload --port 8000
```

# API Endpoints
- GET /api/articles/ – Fetch all articles
- POST /api/generate-news/ – Generate a new article (WebSocket broadcast)

# Frontend Highlights
- Manual article form & “Generate Article” button
- Real-time updates with WebSockets
- Styles in static/news/style.css, JS in static/news/main.js

# Notes

- Real-time updates require running with an ASGI server (Uvicorn)
- Ensure STATIC_ROOT and STATICFILES_DIRS are correctly configured in settings.py
- Always run Django commands from the project folder news_portal (not the repo root)
- The venv/ folder is ignored; recreate it locally using python3 -m venv venv