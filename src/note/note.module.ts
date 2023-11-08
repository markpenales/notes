import { MiddlewareConsumer, Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { IsAuthorizedMiddleware } from 'src/middlewares/is-authorized.middleware';

@Module({
  imports: [NoteModule],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAuthorizedMiddleware).forRoutes(NoteController);
  }
}
