# GameLab 60+ — Semana 7
PWA estático para avaliação acadêmica de jogabilidade de jogos educacionais adaptados ao público 60+.

## Publicar no GitHub Pages
1. Crie um repositório e envie todo o conteúdo desta pasta para a raiz.
2. Em Settings > Pages, selecione Deploy from a branch, branch `main`, pasta `/root`.
3. Abra a URL publicada. O PWA pode ser instalado pelo navegador compatível.

## Libras
Substitua `assets/libras/instrucoes.mp4` por um vídeo em Libras validado. O app não alega tradução automática.

## Dados
Os dados ficam no navegador (localStorage). Use Exportar/Importar JSON para backup. Não há servidor nem envio de dados.

## PDF
A geração usa jsPDF + AutoTable carregados por CDN. Para gerar PDF é recomendável estar online ao menos na primeira abertura. Fotografias são inseridas mantendo a proporção e, se necessário, iniciadas em nova página.


## QR Code e chamada
A seção “Chamada para o Teste” detecta automaticamente a URL publicada no GitHub Pages e cria um QR Code para esse endereço. Não é necessário editar o link manualmente. Há botões para copiar, compartilhar e projetar a chamada em tela cheia.
