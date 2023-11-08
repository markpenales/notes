import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { NoteController } from './note/note.controller';
import { NoteModule } from './note/note.module';
import { NoteService } from './note/note.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [PassportModule, NoteModule, ConfigModule.forRoot()],
  controllers: [AppController, NoteController],
  providers: [AppService, NoteService, GoogleStrategy],
})
export class AppModule {}
