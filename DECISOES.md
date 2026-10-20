# Decisões do Portal SEMEC

Registro curto do que foi decidido, para que qualquer trabalho futuro siga a mesma linha.

## Outubro de 2026 — recomeço limpo

**Nome e formato**
- Endereço: repositório `portalsemec_tgamt` na conta `formacaocontinuada-hue` → `https://formacaocontinuada-hue.github.io/portalsemec_tgamt/` (mesma conta da Central, login compartilhado).
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
- O Portal completo (115 páginas, branch `padronizacao-visual`, commit 67b1eed) foi reencontrado em 14/10 em `Área de Trabalho\Codex\2026-07-02\files-mentioned-by-the-user-prompt\outputs`. Ele é a fonte para reaproveitar páginas aprovadas, a começar pela página inicial pública.
- Do CSS da Central (~23.500 linhas) ficou só o que a vitrine usa, com o valor final.
- Nomes oficiais das unidades vêm de `js/escolas.js` da Central e estão em `dados/escolas.json`.
- Dados fictícios não entram no repositório.
- Brasões das unidades: gerados ou recebidos dos responsáveis; valem sobre a marcação antiga da Central.
- Brasão Haliti Paresi representa a Educação Indígena (`assets/marca/educacao-indigena.webp`) e é usado nas escolas indígenas sem brasão próprio.
- Área da SEMEC: nenhum sisteminha construído ainda; os cartões aparecem como "Em breve".
- Área da Escola identifica a unidade pelo login (mesmo Apps Script e mesma autorização da Central). Conta SEMEC vê a Área da Escola com aviso "Visão da SEMEC". Conta sem cadastro vê "Acesso não autorizado" e pode entrar com outra conta.
- Página inicial pública (14/10): restaurada do Portal do Codex com o mesmo visual. Eventos e Notícias aparecem como "Em breve"; newsletter desativada ("As inscrições ainda não estão abertas"); "Saiba mais" do programa retirado; botão "Área do Servidor" virou "Área da Escola". CSS próprio (`css/publico.css`), só com as regras que a página usa.
- Área da SEMEC (14/10): `semec.html`, mesma porta e mesmo login. Só contas do tipo SEMEC entram; conta de escola vê "Esta área é de outra equipe" e o botão para a Área da Escola. Mostra o nome do setor (aba Escolas). Ferramentas: Central de Certificados (disponível) e os sisteminhas da SEMEC como "Em breve". Menu tem "Visão da Escola". Link no rodapé da página pública.
- Página pública (15/10): o botão do cabeçalho virou "Áreas de trabalho", com a lista das áreas (Escola e SEMEC); no celular, as áreas aparecem agrupadas no fim do menu. Novas áreas entram nessa lista.
- Menu lateral igual em todas as páginas da mesma área, inclusive na Central de Certificados (19/10):
  Escola → Página inicial do Portal, Início da Escola, Central de Certificados, Calendário Escolar;
  SEMEC → Página inicial do Portal, Início da SEMEC, Central de Certificados, Gerador de Calendário, Visão da Escola;
  depois Assistência (Entrar em contato, Política de Privacidade, Acessibilidade) e Conta (Sair), com os mesmos ícones.
  Ferramenta nova com página própria entra no menu das duas pontas (Portal e Central).
- Áreas de trabalho têm "Página inicial do Portal" no menu lateral e "Página inicial" na tela de entrada.
- Ícone da aba do navegador: emblema do Portal em todas as páginas. `assets/marca/emblema-portal-semec.png` existe só para
  os sisteminhas em Apps Script (`setFaviconUrl` não aceita WebP); as páginas do site usam o `.webp`.
- Cartões de ferramenta usam o Tangará (campo `mascote` em `dados/ferramentas.json`).
- Uma ferramenta pode aparecer em mais de uma área (`areas` em `dados/ferramentas.json`).
- Ajuda, contato, privacidade e acessibilidade apontam para as páginas da Central até o Portal ter as suas.

**Login (Apps Script da Central) — funcionando em 14/10**
- `10_sessao_entrada.gs` aceita retorno para `/central-certificados-semec/` e `/portalsemec_tgamt/`; a tela `Entrar` mostra "Portal SEMEC · Área da Escola" ou "Central de Certificados" conforme a origem.
- Implantação institucional: Executar como Eu, acesso somente domínio (é ela que confere a conta).
- Implantação pública: Executar como Eu, acesso **Qualquer pessoa**. Se ficar "somente domínio", o Portal e a Central mostram "Não foi possível falar com o serviço da SEMEC".
- `BASE_CONSULTA_ID` em `00_Config` precisa apontar para a Base_Consulta em uso; se a base for recriada, trocar o ID e publicar nova versão nas duas implantações.

**Calendário Escolar (19/10)**
- Planilha e Apps Script do calendário passaram para a conta `portal.semec@` (a Formação continua editora).
- Área da SEMEC: cartão "Gerador de Calendário Escolar" abre o sisteminha (lançar, conferir, publicar) em nova aba.
- Área da Escola: cartão "Calendário Escolar" abre `calendario.html`, página da própria área (mesmo login)
  que mostra a pasta publicada embutida, com as miniaturas dos dois calendários, e um botão para abrir a pasta.
- No sisteminha, "Gerar PDF" é rascunho para a SEMEC conferir; "Publicar para as escolas" grava os dois PDFs
  na pasta fixa "Calendário Escolar — Publicado" (Drive da portal.semec@, leitura para quem tem o link).
  O endereço da pasta não muda; é ele que vai no cartão da Área da Escola.
- O calendário é documento público, então a pasta publicada não precisa de login.
- O sisteminha só abre para os e-mails (Email 1 e Email 2) das linhas do tipo SEMEC em atividade na aba
  Escolas da Base de Consulta (mesma lista da Central). Implantação: Executar como Eu, acesso somente domínio.
  Se a Base for recriada, trocar `ACESSO.PLANILHA_ID` no Código.gs do calendário e publicar nova versão.
- Cartão da SEMEC usa o endereço com `/a/macros/edu.tangaradaserra.mt.gov.br/` (evita o erro de quem tem
  duas contas Google abertas no navegador).

**Calendário Escolar — gerador mais moldável (20/10)**
- Vários anos na mesma planilha: um ano aberto por vez (o que todos veem no gerador). Ao trocar, o que foi
  lançado à mão no ano que sai fica guardado na aba oculta `_ANOS`; ano novo começa só com fins de semana e
  feriados. O que está publicado para as escolas só muda quando alguém clica em "Publicar".
- Eventos (códigos) podem mudar nome, sigla, cor e letivo/não letivo a qualquer hora; a sigla nova é trocada em
  todos os dias, anos guardados e feriados. F, IB e TB não mudam de sigla nem podem ser apagados (usados nos cálculos).
- Apagar evento em uso: o sistema mostra onde ele está e pergunta; confirmado, esses dias voltam ao automático
  e feriados que o usavam passam a F.
- Feriados no próprio gerador: ligar/desligar qualquer um; cadastrar feriado municipal ou ponto facultativo
  ("todo ano" ou "só neste ano"). Os que vieram prontos só ligam/desligam.
- "Ver calendário" mostra uma prévia dos 12 meses na tela; o PDF oficial continua saindo por "Gerar PDF".

**Central de Certificados — envio por e-mail, entrada e página única de ajuda (20/10)**
- Cartão de cada pessoa: botão "Enviar por e-mail" ao lado de "Relatório anual 2026". Cada certificado ativo tem
  "Selecionar"; o envio pode ser só dos selecionados ou de todos. Vai um e-mail só com os PDFs anexados; se passar
  do tamanho, divide em mais de um. Só certificados ativos e da mesma pessoa; cada um fica registrado no histórico.
- Entrada: continua com a conta Google @edu, mas a autorização vale 30 dias no mesmo navegador ("Sair" encerra na
  hora). A página do Google confirma a conta sem segunda espera. O backend guarda por 10 min a lista de unidades e
  por 5 min o registro de certificados (antes lia tudo a cada clique). Unidade desativada perde o acesso em até
  10 min; certificado novo aparece em até 5 min (ou na hora, rodando `limparCacheCentral()` no editor).
- Ajuda e Entrar em contato viraram uma página só (`entrar-em-contato.html`); `ajuda.html` só redireciona.
  O item "Ajuda" saiu dos menus do Portal e da Central.
- Lista de certificados: cada pessoa é uma faixa azul (nome, cargo, quantidade, escola) que abre e fecha; começa
  fechada, e abre sozinha quando a pesquisa acha uma pessoa só. Cada certificado é uma linha: caixinha, nome do
  evento, "formação · data · carga horária" e os botões Ver / Baixar / Enviar. A situação só aparece quando não é
  ativo. No celular, o brasão sai do topo da página (fica no cartão da unidade).
- Página mais leve: brasões das unidades em arquivos `.webp` separados (antes, 14 scripts com todas as imagens
  embutidas em toda página) e versões leves do brasão, do mascote e do banner.

## Pendências
- Endereços publicados das ferramentas (ver campo `pendencia` em `dados/ferramentas.json`).
- Logística: quais ferramentas entram.
