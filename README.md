# Mini E-Commerce

Aplicação frontend em Angular para um mini e-commerce com cadastro, listagem e gerenciamento de produtos e categorias, incluindo carrinho com persistência em `localStorage`.

## Arquitetura
- Framework: Angular 21 (Standalone Components)
- Estilo: Bootstrap 5 + estilos globais (`src/styles.css`)
- Roteamento: `src/app/app.routes.ts` com páginas para produtos, categorias e carrinho
- Serviços (HTTP): `src/app/core/services/*` consumindo API externa (`http://localhost:8080`)
- Domínios:
  - Produtos: listagem em cards, criação e atualização
  - Categorias: criação e exclusão
  - Carrinho: adicionar itens, remover, limpar com confirmação, persistência em `localStorage`
- Componentes compartilhados: `src/app/shared/header` com navegação entre páginas

## Pré-requisitos
- Node.js 18+ (recomendado 20+)
- NPM (vem com Node)
- Backend/API rodando em `http://localhost:8080`
  - Base URL de produtos: `http://localhost:8080/products` (configurada em `src/app/core/services/product.service.ts:9`)

## Clonar, instalar e rodar
```bash
# Clonar o repositório
git clone https://github.com/<seu-usuario>/<seu-repo>.git
cd <seu-repo>

# Instalar dependências
npm install

# Rodar em desenvolvimento (http://localhost:4200)
npm start
```

## Scripts úteis
- `npm start` → inicia o servidor de desenvolvimento
- `npm run build` → gera o build de produção em `dist/mini-e-commerce`
- `npm test` → executa a suíte de testes (se aplicável)

## Configuração da API
- A base da API de produtos está definida em `src/app/core/services/product.service.ts:9`.
- Ajuste se necessário para seu ambiente (ex.: alterar host/porta).

## Estrutura de diretórios (parcial)
```
src/
  app/
    core/
      models/
      services/
    products/
      product-list/
      product-form/
      product-update/
      product-delete/
    categories/
      category-create/
      category-delete/
    cart/
      cart-page/
    shared/
      header/
  styles.css
```

## Testes
### Tecnologias
- Runner integrado do Angular 21 com Vitest
- Ambiente `jsdom`
- Mocks com `vi`, `HttpClientTestingModule` para HTTP, `RouterTestingModule` para rotas

### Dependências para testes
- Já inclusas no projeto:
  - `vitest`, `@vitest/coverage-v8`, `jsdom`
  - `@angular/platform-browser-dynamic` (necessário para inicializar `TestBed` quando usando Vitest)
- Arquivos de suporte:
  - `vitest.config.ts` (configura cobertura HTML/LCOV em `coverage/mini-e-commerce`)
  - `src/test-setup.ts` (inicializa `TestBed`)

### Como rodar testes
- Modo padrão (Angular runner, watch):
  - `npm test`
  - Mostra total de testes/arquivos passando
- Cobertura (Vitest, serviços):
  - `npx vitest run --coverage`
  - Abrir relatório: `coverage/mini-e-commerce/index.html`

### Cobertura atual
- Serviços cobertos com relatório HTML/LCOV:
  - `ProductService`: 100%
  - `CartService`: ~97% linhas (um caminho não utilizado)
- Testes de componentes rodam com `npm test` e estão 100% verdes, mas a cobertura HTML via Vitest está focada em serviços por padrão.

### Escopo dos testes
- `ProductService`: `getAll`, `getById`, `create`, `update`, `delete` e validação de URLs/payloads
- `CartService`: `add`, `remove`, `clear`, `total`, persistência/restore via `localStorage`
- `ProductForm`: inválido → mensagem; sucesso → mensagem e reset
- `ProductUpdate`: erro de `getById` → “Product not found.”
- `CartPageComponent`: remove item; limpar carrinho com confirmação
- `ProductListComponent`: “Add to Cart” chama `CartService.add(...)`
- `CategoryCreate`: inválido/sucesso/erro com mensagens
- `Header`: badge de contagem do carrinho
- `App`: criação e título na navbar
