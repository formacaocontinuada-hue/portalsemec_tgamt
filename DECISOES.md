# Decisões do Portal SEMEC

Registro curto do que foi decidido, para que qualquer trabalho futuro siga a mesma linha.

## Outubro de 2026 — recomeço limpo

**Nome e formato**
- "Portal SEMEC" é o nome guarda-chuva (o mesmo do e-mail institucional).
- O portal é uma vitrine: parte pública + porta de entrada + áreas de trabalho.
- Publicação: GitHub Pages, repositório novo e limpo, gratuito. Repositório público,
  portanto sem dados ou segredos no código.
- A segurança fica em cada ferramenta (Apps Script conferindo o e-mail cadastrado),
  não no site.

**Público**
- Fica: página inicial, eventos abertos ao público externo, validação de certificado
  (somente por QR Code), perguntas frequentes, contato, privacidade, acessibilidade.
- Sai: Programas e Ações, Editais e Chamamentos (a prefeitura já publica),
  Serviços, Transparência (dados vão para o Tangará em Dados).
- Talvez: Notícias (Instagram e site da prefeitura já cobrem).
- "A SEMEC" vira um "Sobre" curto, com a história do Portal e a autoria.

**Contas pessoais**
- Perfil público e perfil do servidor não têm área de trabalho.
- Ajuda e Contato Técnico viram uma página só.

**Áreas de trabalho**
- Escola, Grupos Formativos (antiga Coordenação de Formação), Logística (área própria)
  e Gestão (Coordenação Geral + Administração).
- Construção área por área, perfil por perfil. Primeira entrega: Escola e SEMEC.
- Leitores de QR deixam de ser perfis separados e viram ferramentas dentro das áreas.
- Cada grupo formativo poderá gerar seus certificados, com modelo e validação centralizados.
- Nada de módulo sob medida por formador: poucas ferramentas, com opções de ajuste.
- Orientação de correção pelo 1Doc fica dentro da Central de Certificados (sem cartão próprio).

**Código e visual**
- Referência visual: o padrão aprovado e publicado na Central de Certificados
  (repositório `central-certificados-semec`, out/2026): menu lateral azul-escuro com o
  emblema do Portal, barra superior com caminho e título, cartões claros com rótulos
  dourados, tela de entrada com o Tangará e o banner de acesso. Fonte Arial.
- O protótipo antigo (pasta "Portal Semec", jun/2026, rodapé azul com fonte Alice) é legado.
- As 115 páginas do Portal local foram perdidas com o computador antigo e não serão
  reconstruídas como protótipo.
- Do CSS da Central (~23.500 linhas) ficou só o que a vitrine usa, com o valor final.
- Nomes oficiais das unidades vêm de `js/escolas.js` da Central e estão em `dados/escolas.json`.
- Dados fictícios não entram no repositório.
- Brasões das unidades: gerados ou recebidos dos responsáveis; valem sobre a marcação antiga da Central.
- Brasão Haliti Paresi representa a Educação Indígena (`assets/marca/educacao-indigena.webp`) e é usado nas escolas indígenas sem brasão próprio.
- Área da SEMEC: nenhum sisteminha construído ainda; os cartões aparecem como "Em breve".
- Área da Escola identifica a unidade pelo login (mesmo Apps Script e mesma autorização da Central). Conta SEMEC vê a Área da Escola com aviso "Visão da SEMEC". Conta sem cadastro vê "Acesso não autorizado" e pode entrar com outra conta.
- Ajuda, contato, privacidade e acessibilidade apontam para as páginas da Central até o Portal ter as suas.

## Pendências
- Apps Script da Central (`10_sessao_entrada.gs`, `urlRetornoSegura_`): hoje só devolve a entrada para `/central-certificados-semec/`. Incluir `/portal-semec/` na lista de caminhos permitidos e publicar nova versão da implantação. O repositório do Portal precisa se chamar `portal-semec` no GitHub `formacaocontinuada-hue`.
- Endereços publicados das ferramentas (ver campo `pendencia` em `dados/ferramentas.json`).
- Logística: quais ferramentas entram.
