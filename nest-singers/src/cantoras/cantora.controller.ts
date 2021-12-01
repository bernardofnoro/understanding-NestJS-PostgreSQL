import { Controller, Get, Post } from '@nestjs/common';

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
}
