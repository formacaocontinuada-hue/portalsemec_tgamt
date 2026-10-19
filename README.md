# Portal SEMEC

Vitrine de acesso às ferramentas da Secretaria Municipal de Educação de Tangará da Serra-MT.
Site estático publicado pelo GitHub Pages em https://formacaocontinuada-hue.github.io/portalsemec_tgamt/. O site não guarda dados: cada ferramenta continua
no seu próprio lugar (Apps Script, planilhas) e confere sozinha quem pode usá-la.

## Estrutura

```
portalsemec_tgamt/
├── index.html              página pública (visual aprovado no Portal do Codex)
├── escola.html             Área da Escola: porta + área de trabalho da unidade
├── semec.html              Área da SEMEC: porta + área de trabalho dos setores da SEMEC
├── calendario.html         Área da Escola: calendário escolar publicado pela SEMEC (pasta do Drive embutida)
├── componentes.html        guia visual das áreas internas (conferência; não é linkada no site)
├── componentes-entrada.html guia visual da tela de entrada (conferência)
├── css/publico.css         estilos da página pública
├── css/portal.css          estilos das áreas internas
├── js/publico.js           menu do celular da página pública
├── js/portal.js            menu lateral e cartões de ferramenta
├── js/acesso.js            entrada com a conta institucional (mesmo backend da Central)
├── js/area.js              estados da porta e identificação da unidade (as duas áreas)
├── dados/ferramentas.json  lista única de ferramentas (folha de rosto)
├── dados/escolas.json      nomes oficiais das unidades e brasão de cada uma
└── assets/
    ├── marca/              emblema do Portal, brasões de Tangará e da Educação Indígena, prefeitura, banner
    ├── brasoes/            brasões das escolas (nome do arquivo = identificador da escola)
    ├── publico/            banners e foto da página pública
    └── mascote/            estados do Tangará usados no site
```

## Como incluir um sisteminha novo

1. Abra `dados/ferramentas.json`.
2. Acrescente um item com `areas` (lista com `escola` e/ou `semec`), `nome`, `descricao`, `mascote`,
   `situacao` e `endereco`.
3. O cartão aparece sozinho em cada área da lista. Ele só vira link quando `situacao` é `pronta`
   e o `endereco` está preenchido.

Antes de marcar como `pronta`: a ferramenta precisa recusar quem não estiver cadastrado,
mesmo que alguém copie o link.

## Regras deste repositório

- Repositório público: nada de senhas, chaves, IDs de planilhas sensíveis ou dados pessoais.
- Imagens em WebP, no tamanho em que aparecem na tela. Originais ficam fora do repositório.
- Modelos de certificado e crachá não entram aqui (ficam no Drive).
- Decisões do projeto ficam em `DECISOES.md`.

## Entrada com a conta institucional

As Áreas da Escola e da SEMEC usam o mesmo Apps Script da Central de Certificados:
o botão "Entrar" leva à página de entrada do Google e volta com uma autorização temporária;
a escola é identificada pelo backend (`IDENTIFICAR_UNIDADE`) e o nome e o brasão vêm de
`dados/escolas.json`. Portal e Central ficam no mesmo endereço base do GitHub Pages, então
a entrada vale para os dois.

Antes de publicar, confirme no Apps Script que o endereço do Portal é aceito como `retorno`.
