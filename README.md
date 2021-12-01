# API REST com NestJS e Prisma

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
  imports: []
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

## Criando as Rotas





