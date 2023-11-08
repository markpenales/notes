import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('NoteController', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();
    app = module.createNestApplication();

    await app.init();

    // Set the accessToken here or fetch it from your authentication logic
    accessToken =
      'ya29.a0AfB_byDT3119dMM1ankdaTdf9bK8zP5wNJmMhEuMIlE27itlW6719tfA_vTgqS2csyop4Q-K9ODOG-V-W-30cZvVJLBTAg1QMpg73dFpbNiJbg9KoLnt4-E6606jf4cTLJ88RWp2p7-F9wMsa-xXDIWcuQPohpim0bNraCgYKAQoSARESFQHGX2MiEC0sG4TFECWKHNldRvsmKQ0171';
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/notes', () => {
    it('should return an array of notes', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/notes')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should return a specific note', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/notes/654bd1d71f23fb7e1fd55e18')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toBeDefined();
    });

    it('should return 404 if the note does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/notes/123jkdf2kads')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('POST /api/notes', () => {
    it('should create a new note', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/notes')
        .send({ title: 'Test Note', content: 'This is a test note.' })
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toBeDefined();
    });

    it('should return 422 if data is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/notes')
        .send({})
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update a note', async () => {
      const response = await request(app.getHttpServer())
        .put('/api/notes/654bd1d71f23fb7e1fd55e18')
        .send({
          title: 'Updated Note',
          content: 'This note has been updated.',
        })
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toBeDefined();
    });

    it('should return 422 if both title and content are missing', async () => {
      const response = await request(app.getHttpServer())
        .put('/api/notes/654bd1d71f23fb7e1fd55e18')
        .send({})
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should delete a note', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/notes/654bd1d71f23fb7e1fd55e18')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.OK);
    });

    it('should return 404 if the note does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/notes/123jkdf2kads')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
