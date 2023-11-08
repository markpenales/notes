# Notes

## Overview

This API will enable you to create, update, delete, and read notes.

## Prerequisites
- NodeJS: Latest LTS Version: 20.8.1
- NestJS: v 9.0.0
- TS: 5.2.2
- MongoDB: v6.0.6

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/markpenales/notes.git
   ```
2. Install dependencies
   ```bash
   cd notes.git
   npm install
   ```
3. Copy and paste environment variables
   ```bash
   cp .env.example .env
   ```
4. Put in the necessary variables especially the Google Client id and Google Client secret
5. Run the API
```npm run start```

## API Endpoints

### 1. Get All Notes

- **Endpoint:** `GET /api/notes`
- **Description:** Get a list of all notes.
- **Authentication:** Bearer token in the Authorization header.

### 2. Get a Specific Note

- **Endpoint:** `GET /api/notes/:id`
- **Description:** Get details of a specific note by ID.
- **Authentication:** Bearer token in the Authorization header.

### 3. Create a New Note

- **Endpoint:** `POST /api/notes`
- **Description:** Create a new note.
- **Body:**
- **Authentication:** Bearer token in the Authorization header.
  ```json
  {
    "title": "Your Note Title",
    "content": "Your note content."
  }

### 4. Update a Note

- **Endpoint:** `PUT /api/notes/:id`
- **Description:** Update a new note.
- **Body:**
- **Authentication:** Bearer token in the Authorization header.
- **Note: ** Can be Optional, but there needs to be at least 1
  ```json
  {
    "title": "Your Note Title", 
    "content": "Your note content."
  }

### 5. Delete a Note

- **Endpoint:** `PUT /api/notes/:id`
- **Description:** Delete a new note.
- **Body:**
- **Authentication:** Bearer token in the Authorization header.

## Getting the Bearer Token

1. Visit the index page of the website.
2. Login using Google.
3. After successfully logging in, the `accessToken` will be displayed on the page.
4. Copy the `accessToken` that you see after logging in.

Use this copied Bearer token for authenticating your requests to the API by including it in the Authorization header.
