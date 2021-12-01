import { Controller, Get, Post, Delete } from '@nestjs/common';

@Controller('cantoras')
export class CantorasController {
  @Get()
  getCantoras() {
    return 'Todas as cantoras';
  }

  @Get('/:cantoraId')
  getCantoraById() {
    return 'Mostrando Cantora pelo ID';
  }

  @Post()
  criandoCantora() {
    return 'Cantora Criada';
  }

  @Delete('/:cantoraId')
  removendoCantora() {
    return 'Cantora Removida';
  }
}
