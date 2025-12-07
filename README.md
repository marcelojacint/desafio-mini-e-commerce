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
