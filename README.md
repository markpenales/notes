API Endpoints

1. Get All Notes

   Endpoint: GET /api/notes
   Description: Get a list of all notes.
   Authentication: Bearer token in the Authorization header.

2. Get a Specific Note

   Endpoint: GET /api/notes/:id
   Description: Get details of a specific note by ID.
   Authentication: Bearer token in the Authorization header.

3. Create a New Note

   Endpoint: POST /api/notes
   Description: Create a new note.
   Body:

   json

   {
   "title": "Your Note Title",
   "content": "Your note content."
   }

   Authentication: Bearer token in the Authorization header.

4. Update a Note

   Endpoint: PUT /api/notes/:id
   Description: Update a specific note by ID.
   Body:

   json

   {
   "title": "Updated Title",
   "content": "Updated content."
   }

   Authentication: Bearer token in the Authorization header.

5. Delete a Note

   Endpoint: DELETE /api/notes/:id
   Description: Delete a specific note by ID.
   Authentication: Bearer token in the Authorization header.
