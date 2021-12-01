import { Module } from '@nestjs/common';
import { CantorasController } from '../cantoras/cantora.controller'; // Importando arquivo de configuração

@Module({
  imports: [],
  // Criando Key e Array com a Classe CantorasController
  controllers: [CantorasController],
})
export class AppModule {}
