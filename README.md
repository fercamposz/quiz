# Treasure Hunt

Um jogo de caca ao tesouro em estilo pixel/kawaii feito com React, Vite, Tailwind CSS, Framer Motion e Zustand.

O jogador percorre um mapa vertical, responde quizzes de conhecimentos gerais, coleta pistas no inventario e usa a palavra final para abrir o portal do premio.

## Visual do jogo

- Tela inicial com fundo pixelado, brilho, coracoes e painel de instrucoes.
- Mapa vertical responsivo com estrelas fixas no caminho.
- Quiz animado para cada estrela.
- Inventario com pistas em formato de balao.
- Portal final com senha e animacao de estrela girando.
- Premio final com brilho e clima de jogo retrô.

## Tecnologias

- React
- Vite
- Tailwind CSS
- Framer Motion
- Zustand
- React Router

## Como rodar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:5173
```

## Scripts

Rodar em modo desenvolvimento:

```bash
npm run dev
```

Gerar build de producao:

```bash
npm run build
```

Verificar o codigo com ESLint:

```bash
npm run lint
```

Visualizar o build localmente:

```bash
npm run preview
```

## Rotas

```text
/            Tela inicial
/map         Mapa principal
/inventory   Inventario de pistas
/final       Portal final
/ending      Premio final
```

## Como jogar

1. Clique em Play na tela inicial.
2. Toque na estrela liberada no mapa.
3. Responda corretamente ao quiz.
4. Colete a pista no inventario.
5. Complete as 10 estrelas.
6. Descubra a palavra final.
7. Digite a senha no portal.
8. Abra o premio.

## Palavra final

As pistas do inventario levam ate a palavra:

```text
ESTRELA
```

Ela so e confirmada depois da estrela 10.

## Estrutura principal

```text
src/
  assets/pixel/       Imagens e assets pixelados
  components/         Modais, botoes, dialogs e cards
  data/               Quizzes e pistas
  pages/              Telas do jogo
  store/              Estado global do jogo
```

## Observacoes

- O progresso fica salvo no `localStorage`.
- O botao de reiniciar aparece no Game Over e na tela final.
- O jogo nao usa GPS; e uma experiencia fechada de caca ao tesouro.
