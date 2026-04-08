# Agenda Digital - Comércio S.A.

Sistema de gestão de contatos desenvolvido como desafio do Programa de Estágio da Muralis Tecnologia 2026.

---

## Estrutura do Projeto

projeto_muralis/
├── entregaveis/                         ← Fluxograma e vídeo demonstrativo
│   ├── fluxograma_cadastro_cliente.png
│   └── video_demonstrativo.mp4
│
├── agenda-backend/                      ← API REST em Java com Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/com/comerciosa/agenda/
│   │       │   ├── config/              ← Configuração de CORS
│   │       │   ├── controller/          ← Endpoints da API REST
│   │       │   ├── model/               ← Entidades do banco de dados
│   │       │   ├── repository/          ← Acesso ao banco via Spring Data JPA
│   │       │   └── service/             ← Regras de negócio
│   │       └── resources/
│   │           └── application.properties
│   ├── script.sql                       ← Script de criação do banco
│   └── pom.xml                          ← Dependências Maven
│
└── agenda-frontend/                     ← Interface em React
└── src/
├── pages/                       ← Telas da aplicação
│   ├── ListaClientes.jsx        ← Listagem e busca de clientes
│   ├── FormCliente.jsx          ← Cadastro e edição de clientes
│   └── ListaContatos.jsx        ← Gestão de contatos do cliente
├── services/
│   └── api.js                   ← Configuração do Axios
└── App.jsx                      ← Roteamento principal

---

## Tecnologias Utilizadas

**Backend**
- Java 17+
- Spring Boot 4.x
- Spring Data JPA / Hibernate
- PostgreSQL
- Maven

**Frontend**
- React 18
- Vite
- Axios

---

## Dependências

**Backend — pom.xml**
- `spring-boot-starter-web` — API REST
- `spring-boot-starter-data-jpa` — Acesso ao banco de dados
- `spring-boot-starter-validation` — Validação dos dados
- `postgresql` — Driver de conexão com PostgreSQL

**Frontend — package.json**
- `react` e `react-dom` — Framework de interface
- `vite` — Servidor de desenvolvimento
- `axios` — Requisições HTTP para a API

---

## Configuração do Banco de Dados

1. Acesse o PostgreSQL pelo pgAdmin ou terminal
2. Crie o banco de dados:

```sql
CREATE DATABASE agenda_db;
```

3. O Spring Boot criará as tabelas automaticamente ao iniciar a aplicação.
   Opcionalmente, execute o script completo com dados de exemplo:

```bash
psql -U postgres -d agenda_db -f script.sql
```

---

## Configuração do Backend

Abra o arquivo `agenda-backend/src/main/resources/application.properties` e ajuste:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/agenda_db
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA
spring.jpa.hibernate.ddl-auto=update
```

---

## Instruções para Execução

### Backend

Abra o terminal na pasta `agenda-backend` e rode:

```bash
# Windows
mvnw spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

O servidor iniciará em: `http://localhost:8080`

### Frontend

Abra outro terminal na pasta `agenda-frontend` e rode:

```bash
npm install
npm run dev
```

A aplicação abrirá em: `http://localhost:5173`

---

## Endpoints da API

### Clientes

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/api/clientes` | Lista todos os clientes |
| GET | `/api/clientes/{id}` | Busca cliente por ID |
| GET | `/api/clientes/buscar?nome=` | Busca cliente por nome |
| GET | `/api/clientes/cpf/{cpf}` | Busca cliente por CPF |
| POST | `/api/clientes` | Cadastra novo cliente |
| PUT | `/api/clientes/{id}` | Edita cliente |
| DELETE | `/api/clientes/{id}` | Exclui cliente |

### Contatos

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/api/clientes/{id}/contatos` | Lista contatos do cliente |
| POST | `/api/clientes/{id}/contatos` | Cadastra contato |
| PUT | `/api/clientes/{id}/contatos/{cid}` | Edita contato |
| DELETE | `/api/clientes/{id}/contatos/{cid}` | Exclui contato |

---

## Checklist de Requisitos Implementados

### Requisitos Funcionais

- [x] RF01 — Cadastro de clientes com Nome, CPF, Data de Nascimento e Endereço
- [x] RF02 — Edição dos dados de um cliente cadastrado
- [x] RF03 — Exclusão de um cliente cadastrado
- [x] RF04 — Listagem de todos os clientes cadastrados
- [x] RF05 — Busca de cliente por Nome ou CPF
- [x] RF06 — Cadastro de contatos com Tipo, Valor e Observação
- [x] RF07 — Edição dos contatos de um cliente
- [x] RF08 — Exclusão de um contato de um cliente
- [x] RF09 — Listagem de todos os contatos de um cliente específico

### Regras de Negócio

- [x] RN01 — Nome e CPF obrigatórios no cadastro do cliente
- [x] RN02 — Tipo e Valor obrigatórios no cadastro do contato
- [x] RN03 — CPF único no sistema
- [x] RN04 — Nome do cliente não pode estar vazio
- [x] RN05 — Data de nascimento válida
- [x] RN06 — Cliente pode ter mais de um contato cadastrado
- [x] RN07 — Ao excluir cliente, todos os contatos são removidos automaticamente
- [x] RN08 — Validação dos dados antes de cadastrar ou editar

---

## Referências Utilizadas

- [Documentação oficial do Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Documentação oficial do React](https://react.dev/)
- [Documentação do Spring Data JPA](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Documentação do Axios](https://axios-http.com/docs/intro)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Vite — Guia de início rápido](https://vitejs.dev/guide/)

---

## Uso de Inteligência Artificial

Durante o desenvolvimento deste desafio, foi utilizado o assistente de IA **Claude (Anthropic)** como ferramenta de apoio.

**Como foi utilizado:**
- Orientação no passo a passo da configuração do ambiente de desenvolvimento
- Auxílio na resolução de erros de compilação e configuração
- Sugestão de estrutura de pastas e organização do projeto
- Geração de trechos de código específicos explicados didaticamente

**Impacto no desenvolvimento:**
O uso da IA acelerou a resolução de problemas técnicos relacionados à configuração do ambiente (packages Java incorretos, configuração do PostgreSQL, CORS), permitindo foco maior na compreensão da lógica de negócio e na implementação dos requisitos. Todo o código foi revisado, compreendido e adaptado pelo candidato durante o processo.

---

## Autor

Desenvolvido para o Processo Seletivo — Programa de Estágio Muralis Tecnologia 2026

Desenvolvido por Gustavo Henrique Barbosa da Silva

---