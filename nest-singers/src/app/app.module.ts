import { Module } from '@nestjs/common';
import { CantorasController } from '../cantoras/cantora.controller';

@Module({
  imports: [],
  controllers: [CantorasController],
})
export class AppModule {}
