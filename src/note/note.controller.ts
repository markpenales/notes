import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('api/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async getNotes(): Promise<any> {
    return this.noteService.getNotes();
  }

  @Get('/:id')
  async getNote(@Param('id') id: string): Promise<any> {
    return this.noteService.getNote(id);
  }

  @Post()
  async createNote(@Body() data, @Req() req) {
    const { title, content } = data;
    if (!title || !content) {
      throw new HttpException(
        'Invalid or missing data for creating a note',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.noteService.createNote(
      data,
      req.headers['authorization'].split(' ')[1],
    );
  }

  @Put('/:id')
  async updateNote(@Param('id') id: string, @Body() data, @Req() req) {
    // TODO: Check if user is owner of note

    const { title, content } = data;
    if (!title && !content) {
      throw new HttpException(
        'Invalid or missing data for updating note',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.noteService.updateNote(
      id,
      { title: title, content: content },
      req.headers['authorization'].split(' ')[1],
    );
  }

  @Delete('/:id')
  async deleteNote(@Param('id') id: string, @Req() req): Promise<any> {
    // TODO: Check if user is owner of note

    return this.noteService.deleteNote(
      id,
      req.headers['authorization'].split(' ')[1],
    );
  }
}
