import { Controller, Get } from '@nestjs/common'; //Importanto o Decorator Controller e o Método GET

@Controller('cantoras') //Dizendo ao Decorator que todas as rotas começam com /cantoras
//Criando e exportando a classe CantorasController
export class CantorasController {
  // Método GET adicionado
  @Get()
  //Recebendo verbo GET
  getCantoras() {
    // Retornando mensagem na tela
    return 'Todas as cantoras';
  }
}
