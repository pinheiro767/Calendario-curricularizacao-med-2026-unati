# Semana 6 — PWA corrigido

Este pacote possui espaços reais para todas as imagens informadas.

## Coloque em assets/img

capa-semana6.png
fundo-neuro.png
painel-missao.png
robo-neuro.png
robo-falando.png
robo-celebrando.png
1.png
2.png
3.png
4.png
5.png
6.png
7.png
memoria.png
sudoku.png
caca-palavras.png
quiz.png
cartas.png
bolhas.png
acessibilidade.png
libras.png
publico60.png
missao-iniciada.png
etapa-concluida.png
trofeu.png
jogo-pronto.png
certificado-visual.png
offline.png

## Coloque em assets/audio

abertura.mp3
passo1.mp3
passo2.mp3
passo3.mp3
passo4.mp3
passo5.mp3
passo6.mp3
passo7.mp3
clique.mp3
acerto.mp3
erro.mp3
mudanca-fase.mp3
conclusao.mp3

## Coloque em assets/libras

instrucoes.mp4

## Coloque em assets/icons

icon-192.png
icon-512.png
maskable-512.png
favicon.png

Quando uma imagem estiver faltando, o PWA mostrará um espaço visível indicando o nome do arquivo que deve ser colocado.

## Sons usados nesta versão

Coloque exatamente estes quatro arquivos em `assets/audio/`:

- ambiente.mp3
- clique.mp3
- erro.mp3
- vitoria.mp3

O aplicativo agora possui um Painel de Sons visível para testar cada arquivo. O som ambiente começa somente depois de um toque do usuário, pois celulares e navegadores bloqueiam reprodução automática.


## Alterações desta versão

- O arquivo `painel-missao.png` não é mais necessário.
- A missão aparece diretamente sobre a imagem `capa-semana6.png`.
- O botão e o endereço do **Exemplo Neuro** original foram preservados:
  https://pinheiro767.github.io/gameneuro/
- Foi acrescentado o botão **Jogar exemplo: Sudoku Neuro** na abertura.
- Foi incluído um card com os dois exemplos na seção **Jogos dos grupos**.
- Ao selecionar **Sudoku**, também aparece um link direto para o exemplo jogável.
- O novo botão do Sudoku abre:
  https://pinheiro767.github.io/sudoku-game-neuro/
- A seção “Espaços das imagens essenciais do layout” foi removida.
- Os sons `ambiente.mp3`, `clique.mp3`, `erro.mp3` e `vitoria.mp3` continuam integrados.


## Relatório do dia e PDF

Esta versão inclui uma nova seção de relatório com:

- data, grupo, jogo e participantes;
- Introdução;
- Metodologia;
- Resultados;
- Dificuldades e soluções;
- Considerações finais;
- preenchimento manual;
- preenchimento inicial pelo Robô Neuro;
- salvamento local no dispositivo;
- seleção de imagens do game;
- inclusão automática das imagens do aplicativo;
- índice de imagens com legendas;
- geração de PDF por meio da opção de impressão do navegador.

Ao clicar em **Gerar PDF**, escolha **Salvar como PDF**.
O CSS de impressão usa `object-fit: contain` e bloqueios de quebra de página para manter as imagens inteiras, sem cortes.


## Correção das imagens auxiliares
As imagens `acessibilidade.png`, `libras.png` e `publico60.png` agora são opcionais.
Quando alguma delas não estiver na pasta `assets/img`, o respectivo card é ocultado automaticamente, sem mostrar ícone de imagem quebrada ou nome do arquivo.
Se houver apenas `libras.png`, somente essa imagem será exibida e centralizada.
