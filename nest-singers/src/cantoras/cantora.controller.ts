import { Controller, Get } from '@nestjs/common';

@Controller('cantoras')
export class CantorasController {
  @Get()
  getCantoras() {
    return 'Todas as cantoras';
  }

  @Get('/:cantoraId') // Especificando que esta rota recebe um ID na requisição
  getCantoraById() {
    return 'Mostrando Cantora pelo ID';
  }
}
