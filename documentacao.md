## Requisitos

### 1.1 Requisitos Funcionais do Sistema

| ID | Requisito | Descrição |
| --- | --- | --- |
| RF01 | Realizar Login | Autentica a senha, se não foi possível realizar login, exibir mensagem de erro.|
| RF02 | Exibir Tela Principal | Após a autenticação do usuário, o sistema deve exibir a página principal, mostrando o usuário logado, o menu de navegação e a opção sair.|
| RF03 | Cadastrar Cliente | Possibilitar a criação de um cadastro exigindo, desde que o CPF e o nome não tenham sido cadastrados em outra conta.|
| RF04 | Consultar Cliente| Possibilidade de buscar clientes por nome ou CPF.|
| RF05 | Atualizar Cliente | Funcionalidade deve permitir alteração de nome e de CPF de um cliente através do id.|
| RF06 | Excluir Cliente | Funcionalidade deve permitir clientes que não tenham imóveis anunciados.
| RF07 | Anunciar Imóvel | Funcionalidade de anunciar um imóvel para aluguel permitida apenas para clientes.
| RF08 | Atualizar Imóvel | Funcionalidade de editar valor de anúncio, a disponibilidade de um imóvel e propriedades, permitida apenas para clientes.
| RF09 | Excluir Imóvel | Funcionalidade de excluir um imóvel, permitida apenas para clientes, desde que o imóvel não esteja alugado.
| RF10 | Cadastrar Agendamento | Funcionalidade permitida para usuários, cria agendamento com data e imóvel.|
| RF11 | Atualizar Agendamento | Funcionalidade permitida para usuários, disponibilizando a atualização de data, do número de hóspedes.
| RF12 | Listar Agendamento | Funcionalidade permitida para usuários, deve exibir data, informações do imóvel e dados do cliente.|
| RF13 | Excluir Agendamento | Funcionalidade permitida para usuários, exclui por id.|
| RF14 | Encerrar Login | Encerra a sessão apagando o token, se o login não for encerrado manualmente pelo usuário, ele expira automaticamente em 1h.|

### 1.2 Requisitos Não Funcionais

| ID | Requisito | Descrição |
| --- | --- | --- |

## 2 Requisitos de Infraestrutura

| Tecnologia | Versão / ambiente |
| --- | --- |
| JavaScript | Node.js 24 |
| Next.js | 16 |
| React e React DOM | 19 |
| bcryptjs | 3 |
| jsonwebtoken | 9 |
| node:crypto | Integrado ao Node.js |
| PostgreSQL | 18 |
| Prisma e Prisma Client | 6 |
| Ant Design | 6 |
