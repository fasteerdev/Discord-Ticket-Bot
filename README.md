# Bot de Ticket para Discord

Esse simples bot serve para gerenciar tickets no Discord, permitindo que os usuários abram tickets para suporte e fechem quando o problema for resolvido. Ele foi feito utilizando a biblioteca `discord.js` e funciona com interações de comandos e botões.

## Funcionalidades

- **Configuração de Tickets**: Administradores podem configurar o sistema de tickets em um canal específico, com um botão para os usuários abrirem um ticket.
- **Abertura de Ticket**: Usuários podem abrir um ticket, criando um canal privado só para eles e para a equipe de suporte.
- **Fechamento de Ticket**: O usuário ou a equipe de suporte pode fechar o ticket com um botão de confirmação, excluindo o canal após a confirmação.

## Requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn
- Conta no [Discord Developer Portal](https://discord.com/developers/applications)

## Como usar

### Passo 1: Clone o repositório

```bash
git clone https://github.com/fasteerdev/Discord-Ticket-Bot.git
cd bot-ticket-discord

Passo 2: Instale as dependências
npm install

Passo 3: Configuração do arquivo .env
Crie um arquivo .env na raiz do projeto e adicione o seguinte conteúdo:

TOKEN=seu_token_do_discord
Troque seu_token_do_discord pelo token do seu bot.

Passo 4: Registrar os comandos
Execute o script deploy-commands.js para registrar os comandos do bot no Discord:

node deploy-commands.js

Passo 5: Inicie o bot
Para iniciar o bot, rode o comando:
node index.js


Comandos
/ticketsetup: Configura o sistema de tickets no canal atual. Apenas administradores podem usar esse comando.
Botões:
Abrir Ticket: Cria um canal de ticket privado para o usuário.
Fechar Ticket: Envia uma confirmação para fechar o ticket e deleta o canal após a confirmação.

Personalização
Categoria de Tickets: No arquivo interactionCreate.js, altere 'YOUR_CATEGORY_ID_HERE' pela ID da categoria onde os tickets serão criados no seu servidor.
Função de Fechamento de Ticket: No mesmo arquivo, altere 'YOUR_STAFF_ROLE_ID_HERE' pela ID do cargo que deve ter permissão para ver os tickets.


Estrutura de Diretórios
├── src/
│   ├── commands/
│   │   ├── ticketSetup.js
│   ├── events/
│   │   ├── interactionCreate.js
├── deploy-commands.js
├── index.js
├── .env
└── package.json

Contribuição
Se quiser contribuir, fique à vontade! Basta fazer um fork, ajustar o que for necessário e abrir um pull request.

Licença
Este projeto está licenciado sob a MIT License.
