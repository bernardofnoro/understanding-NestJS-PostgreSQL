# API REST com NestJS, Prisma e PostgreSQL

**NestJS** é um framework que nos ajuda a escalar de forma eficiente as aplicações construídas em cima do **Node.js**. Possui suporte para **JavaScript** e também **TypeScript**. 

Para entendermos como o Nest estrutura e constrói as coisas uma revisão no assunto de **orientação a objetos** será bastante importante.

O Nest possui diversas semelhanças com o **Express** justamente por ter sido construído em cima dele. Em essência,  continuaremos a construir uma API.

## Escopo

Esta API servirá dados sobre cantoras e seus discos.

`GET` /cantoras 

- Esta rota lista todas as cantoras disponíveis em nosso banco de dados.

`GET` /cantoras/:cantoraId

-  Esta rota exibe as informações a respeito da cantora baseada em seu ID no banco de dados.

`POST` /cantoras

- Esta rota criará uma nova cantora e suas informações em nosso banco de dados.

`PUT` /cantoras/:cantoraId

- Esta rota alterará os dados de determinada cantora baseada em seu ID no banco de dados.

`DELETE` /cantoras/:cantoraId

- Esta rota removerá a cantora e suas informações em nossa base de dados pelo seu ID.

----

`GET` /albuns

- Esta rota lista todas os discos disponíveis em nosso banco de dados.

`GET` /albuns/:albumId

- Esta rota exibe as informações a respeito do disco baseado em seu ID no banco de dados.

`GET` /albuns/:albumId/cantoras

- Esta rota lista todos os discos relacionados a uma cantora pelo seu ID no banco de dados.

`PUT` /albuns/:albumId:cantoras/:cantoraId

- Esta rota atualiza as informações de um determinado disco relacionado à cantora pelo ID no banco de dados.

## Preparando o Ambiente

- VS Code
- Node.js: versão 16.13.0
- NestJs: versão 8.1.5
- Prisma: versão

## Organizando e Entendendo o Ambiente

Para começarmos é necessário criar uma pasta para o projeto. Lembre-se que o nome da pasta não deve:

- Conter espaços, e;
- Caracteres especiais.

O nome da pasta deve com toda a certeza **indicar sobre o que o projeto se trata**. Lembre-se que ao programar não está somente consolidando um conhecimento para você, mas também ajudando outras pessoas no processo.

Após criada a pasta, **abra-a** dentro do VS Code.

Agora, vamos instalar um componente do Nest chamado **CLI**. No terminal em seu VS Code execute o seguinte comando.

```` 
npm i -g @nestjs/cli
````

Para nossos colegas usando Linux ou Mac, o comando de instalação deve acompanhar o **sudo**:

```
sudo npm i -g @nestjs/cli
```

Este comando utilizará o gerenciador de pacotes **npm** para instalar **globalmente** a Nest **CLI** na pasta do projeto.

Após a instalação, cheque se a instalação foi feita com sucesso através do comando:

```
nest -v
```

Se instalado corretamente, deverá aparecer em sua tela a **versão** do Nest instalada.

Indicando agora ao nest que queremos criar um novo projeto com sua estrutura, o seguinte comando no terminal nos ajudará:

``` 
nest new nome-do-projeto
```

Através da CLI o comando **nest** cria um novo projeto. No exemplo de hoje o nome do projeto será **nest-singers**.

```
nest new nest-singers
```

Ao executar estes comandos o terminal fará algumas interações com você, como esta aqui:

![image_01](images/image_01.png)

Escolheremos o **npm** como nosso gerenciador de pacotes.

> **_NOTA_**: Você pode escolher pelo yarn, porém, certifique-se de que possui este gerenciador de pacotes instalado em seu PC. 

Ao finalizar a instalação, a tela abaixo deve aparecer:

![image_02](images/image_02.png)

Execute o comando `ls`em seu terminal e cheque se a pasta do projeto criada está lá:

![image_03](images/image_03.png)

Acesse a pasta do projeto-nest com o comando:

`cd nome-do-projeto`. 

No nosso exemplo: 

`cd nest-singers`

No menu do VS Code podemos ver que diversos arquivos e uma estrutura de pastas foi criada, alguns conhecemos e outros precisaremos conhecer:

![image_04](images/image_04.png)

- package.json
  - lista todas as dependências que o projeto usa juntamente com as suas versões,e;
  - facilita o compartilhamento com outras pessoas desenvolvedoras
- .gitignore
  - Possui uma lista de arquivos e diretórios que são ignorados no momento de subir a estrutura para o GitHub.
- *.ts
  - 'asterisco' em T.I. representa **tudo**. Aqui estamos falando de todos os arquivos em TypeScript.
- .eslintrc.js
  - Arquivo de configuração do ESLINT, uma ferramenta que identifica e reporta padrões no código, nos retornando erros ou não, e;
  - Evita bugs e torna o código mais consistente.

Na pasta **src**, faça a remoção destes três arquivos:

- app.controller.spec.ts
- app.controller.ts
- app.service.ts

Na pasta **src**, crie a pasta **app** e coloque o arquivo **app.modulde.ts** dentro dela. A árvore de arquivos dentro da pasta do projeto deve estar como abaixo:

![image_05](images/image_05.png)

Observe que temos alguns pontos em **vermelho**, indicando que algo de errado não está certo! Se abrirmos o arquivo `app.modules.ts` e na barra de opções clicarmos em **problemas**, veremos sobre o quê essas reclamações se tratam.

![image_06](images/image_06.png)

Estes erros se tratam justamente dos arquivos que excluímos e para resolver este problema, removemos as linhas `2, 3, 7 e 8` do código, deixando-o assim:

```
import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class AppModule {}
```

Por hora, não vamos nos preocupar com a funcionalidade do código e sim, ter em mente que este arquivo, **app.modules.ts** é o principal arquivo contendo toda a lógica de funcionamento da nossa API.

No arquivo **main.ts** precisamos dizer que movemos o arquivo **app.module.ts** de lugar:

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

- `async function bootstrap()` - nesta função está acontecendo a inicialização da nossa API
- `const app = await NestFactory.create(AppModule)` - estamos criando uma aplicação Nest através do **NestFactory** e passando para ela onde está a lógica de funcionamento através de **(AppModule)**
- `await app.listen(3000)` - função que diz que estamos rodando nossa aplicação na porta 300
- `bootstrap()` - precisamos chamar nossa função bootstrap() para dar início a todo processo

Altere também o caminho no arquivo **app.e2e-spec.ts** na pasta **test** para o ESLINT não seguir reclamando:

```
import { AppModule } from './../src/app/app.module';
```

### ESLINT Reclamando de Parsing Error :boom:

Caso as bolinhas vermelhas no VS Code persistam e ao checar a aba problemas você encontrar a seguinte mensagem abaixo escrita:

```
Parsing error: File '.......tsconfig.json' not found.eslint
```

Vá até o arquivo **.eslintrc.js** e faça uma alteração no nome do projeto. Mude de:

```
project: 'tsconfig.json',
```

para:

```
project: 'nome-do-projeto/tsconfig.json',
```

No nosso exemplo:

```
project: 'nest-singers/tsconfig.json',
```

## Criando as Rotas

Em Nest as rotas são criadas através dos **_Controllers_**. Mas o que são eles? O que comem?

- Os _controllers_ são responsáveis por **receber** as requisições **HTTP** e **devolver** uma resposta para o cliente.
- Um único _controller_ podem lidar com `n` rotas configuradas dentro deles.
- Uma aplicação pode ter múltiplos _controllers_ e é recomendável que o tenha para organizar o grupo de rotas que uma determinada funcionalidade da aplicação terá.

A lógica de funcionamento e caminhos da aplicação não fica dentro destes arquivos, mas eles são os responsáveis por chamá-la em outro.

Vamos criar nosso _controller_ para 'cantoras'.

Na pasta **src** vamos criar a pasta '**cantoras**' e tudo que está relacionado à cantoras ficará dentro deste diretório.

Dentro de `src -> cantoras` vamos criar o arquivo `cantora.controller.ts`

Em Nest, para especificar que vamos criar um _controller_ precisamos de um _**Decorator**_ (O que é isso? O que come?).

Um _decorator_ identifica o que é a coisa que estamos criando e nos ajuda a fazer isso através de seus acessórios.

> Grande parte dos _decorators_ em Nest ficam dentro de @nestjs/commom

Vamos importar o **Decorator** chamado **Controller** para o nosso arquivo:

```
import { Controller } from '@nestjs/common';
```

O que estamos dizendo aqui é que estamos importando uma classe chamada '**Controller**' que contém uma série de métodos dentro dela e estes métodos serão chamados ao configurarmos as rotas.

Agora vamos criar uma classe e decorá-la com o Decorator:

```
import { Controller } from '@nestjs/common';

@Controller()
class CantorasController {
  
}
```

O que estamos fazendo aqui é criar a classe **Cantoras** e dizendo ao Nest que '**CantorasController**' é uma classe-controller adicionando a função '**@Controller()**' acima.

> Todas as rotas devem ser definidas **dentro** da classe-controller

Olha só que interessante... se observarmos com atenção notaremos um padrão em nossas rotas:

`GET` /cantoras 

`GET` /cantoras/:cantoraId

`POST` /cantoras

`PUT` /cantoras/:cantoraId

`DELETE` /cantoras/:cantoraId

**Elas possuem /cantoras** e nós podemos dizer ao _decorator_ que todas **começam** com 'cantoras' dentro da função `Controller()`.

```
import { Controller } from '@nestjs/common';

@Controller('cantoras')
class CantorasController {
  
}
```

Cada médoto dentro do _controller_ vai começar com `/cantoras`.

### `GET` /cantoras 

Vamos dizer ao Nest que estamos criando esta rota que receberá um **GET** via HTTP e vai **retornar** alguma coisa.

```
import { Controller } from '@nestjs/common';

@Controller('cantoras')
class CantorasController {
  getCantoras() {
    return 'Todas as cantoras';
  }
}
```

`getCantoras` é um método que estamos chamando quando a requisição chega. Pera, mas como o método sabe que a requisição é o GET?

Nós o importamos como um _decorator_:

```
import { Controller, Get } from '@nestjs/common';
```

E dizemos ao Nest que **getCantoras()** é um método **GET** adicionando-o acima, como fizemos com a Classe:

```
import { Controller, Get } from '@nestjs/common';

@Controller('cantoras')
class CantorasController {
  @Get()
  getCantoras() {
    return 'Todas as cantoras';
  }
}
```

Note que @Get() também assume a função de _decorator_, ou seja, uma requisição **GET** em **/cantoras** é direcionada para **getCantoras()**. (Certeza que sua cabeça explodiu agora, né?!)

Agora é a hora que a gente testa, certo?!

WAIT, NOT AINDA... a gente não disse pra nossa aplicação que **cantora.controller** existe! Pra quem a gente diz isso? Pro cara que controla toda a lógica: `app.modules.ts`. 

Nós estamos dizendo que a **chave** controllers recebe um **array** de todos os controller que queremos:

```
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
})
export class AppModule {}
```

Contudo, a gente precisa antes exportar a nossa classe em **cantora.controller.ts** para que a rota funcione:

```
import { Controller, Get } from '@nestjs/common';

@Controller('cantoras')
export class CantorasController {
  @Get()
  getCantoras() {
    return 'Todas as cantoras';
  }
}

```

Agora podemos fazer a importação no arquivo **app.modules.ts**:

```
import { Module } from '@nestjs/common';
import { CantorasController } from '../cantoras/cantora.controller';

@Module({
  imports: [],
  controllers: [CantorasController],
})
export class AppModule {}

```

