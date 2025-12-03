Projeto Alpha - Testes de Software com Playwright
📋 Descrição
Projeto de automação de testes de software utilizando Playwright para testes end-to-end (E2E) e de API. O projeto inclui testes automatizados para a plataforma BugBank e API BookStore, com integração contínua via GitHub Actions.

🏗️ Estrutura do Projeto
projetoAlpha/
├── tests/                    # Testes automatizados
│   ├── api/                 # Testes de API
│   │   └── bookstore.spec.js
│   ├── e2e/                 # Testes end-to-end
│   │   └── bugbank.spec.js
│   └── example.spec.js
├── utils/                    # Utilitários compartilhados
│   └── helpers.js           # Funções auxiliares
├── playwright-report/        # Relatórios de execução
├── test-results/            # Resultados dos testes
├── .github/workflows/        # Automação CI/CD
│   └── playwright.yml
├── playwright.config.js      # Configuração do Playwright
└── package.json             # Dependências do 

🧪 Testes Implementados
1️⃣ Desafio 1 - BookStore API (bookstore.spec.js)
Testes de API REST para a plataforma BookStore:

01 - Criar Usuário: Valida criação de novo usuário
02 - Gerar Token: Testa autenticação e geração de token
03 - Listar Livros: Verifica listagem de livros disponíveis
04 - Adicionar livro à coleção: Fluxo completo de compra de livro
2️⃣ Desafio 2 - BugBank E2E (bugbank.spec.js)
Testes end-to-end para a aplicação BugBank:

01 - Cadastro com sucesso: Validação de registro com saldo inicial
02 - Login e validação de saldo: Fluxo de autenticação e verificação de saldo (R$ 1.000,00)
03 - Transferência para conta inválida: Teste de validação de erro
🛠️ Tecnologias
Playwright: Framework de automação cross-browser
Node.js: Runtime JavaScript
GitHub Actions: CI/CD pipeline
📦 Instalação
Clone o repositório ou acesse a pasta do projeto
Instale as dependências:
npm install
Instale os navegadores do Playwright:
npx playwright install

▶️ Executando os Testes
Modo Headless (padrão)

npx playwright test

Modo UI (visualizador interativo)
npx playwright test --ui

Navegador Específico

npx playwright test --project=chromium
npx playwright test --project=firefox

Teste Específico

npx playwright test bugbank.spec.js
npx playwright test bookstore.spec.js

Configuração do Projeto
Veja playwright.config.js para detalhes de configuração:

URL Base: https://bugbank.netlify.app
Navegadores: Chromium e Firefox
Relatórios: HTML com screenshots em caso de falha
Screenshots: Capturados apenas quando há falhas
Traces: Ativados na primeira tentativa de falha
🔧 Utilitários Disponíveis
helpers.js oferece funções para dados aleatórios:

generateRandomEmail() - Email único com timestamp
generateRandomUsername() - Usuário único com timestamp
generateRandomPassword() - Senha segura (12 caracteres com maiúsculas, minúsculas, números e símbolos)

CI/CD com GitHub Actions
O arquivo playwright.yml executa testes automaticamente em:

Push para branches main ou master
Pull Requests para branches main ou master
Os relatórios são armazenados por 30 dias no artefato playwright-report.

📈 Visualizando Relatórios
Após executar os testes, abra o relatório HTML:

npx playwright show-report

Notas
Os testes E2E usam a estratégia .serial() para executar em sequência
Senha fixa utilizada nos testes: Qa@123456
Dados aleatórios são gerados para evitar conflitos entre execuções