import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { connect } from '../db/connection';

@Injectable()
export class NoteService {
  private readonly connection;

  constructor() {
    this.connection = connect();
  }

  async getNotes() {
    const { Note } = await this.connection;
    return await Note.find({});
  }

  async getNote(id: String) {
    const { Note } = await this.connection;
    return await Note.findById(id).catch((error) => {
      return { error };
    });
  }

  async deleteNote(id: String, accessToken: String) {
    const { Note, User } = await this.connection;
    const user = await User.findOne({ accessToken: accessToken });
    try {
      var deletedNote = await Note.findOne({ _id: id });
    } catch (error) {
      throw new HttpException(
        'The ID provided was not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (deletedNote.user_id == user._id) {
      await Note.findOneAndDelete({ _id: id });
      return { message: 'Successfully Deleted Note!', deletedNote };
    } else if (!deletedNote) {
      throw new HttpException('Note was not found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException(
        'You do not own the note',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async updateNote(id: String, data, accessToken: String) {
    const { Note, User } = await this.connection;
    const user = await User.findOne({ accessToken: accessToken });

    try {
      const note = await Note.findOneAndUpdate({ _id: id }, data);

      if (note.user_id == user._id) {
        return { message: 'Successfully Updated Note!', note };
      } else {
        throw new HttpException('Note was not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'The ID provided was not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createNote(data, accessToken) {
    const { Note, User } = await this.connection;
    data = {
      ...data,
      user_id: (await User.findOne({ accessToken: accessToken }))._id,
    };
    try {
      const newNote = new Note(data);
      const note = await newNote.save();

      return { message: 'Successfully Created Note!', note };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create Note',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
