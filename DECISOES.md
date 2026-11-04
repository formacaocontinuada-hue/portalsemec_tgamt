# Decisões do Portal SEMEC

Registro curto do que foi decidido, para que qualquer trabalho futuro siga a mesma linha.

## Regra permanente — um só padrão visual (04/11/2026)

Toda página nova do Portal SEMEC — no GitHub, num Apps Script (sisteminhas), na Central ou em qualquer
ambiente que fizer parte do Portal — segue o mesmo padrão visual. A pessoa não pode sentir que mudou de
sistema ao trocar de tela.
- Sempre o `css/portal.css` do Portal, com os mesmos tokens (cores, fontes, raios, sombras). Nada de
  estilos próprios que repitam ou contrariem o que já existe ali.
- Áreas de trabalho: mesma barra superior e o mesmo menu lateral de todas as páginas da área (mesmos
  grupos e itens, na mesma ordem).
- Entrada: o modelo de `componentes-entrada.html` (Tangará, cartão de entrada), também para a entrada do
  servidor.
- Componentes: os de `componentes.html` (cartões, botões, formulários, janelas, avisos, estados de
  carregando, vazio e erro, com o Tangará correspondente). Quando faltar um componente, ele é criado no
  `portal.css` e documentado em `componentes.html` antes de ser usado.
- Mesma linguagem nos textos: frases curtas, sem termos técnicos, os mesmos nomes para as mesmas coisas.
- Documentos impressos (folheto, carteira) seguem os modelos aprovados pela SEMEC.

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

**Calendário Escolar — impressão mais didática (29/10)**
- No PDF, todo dia com evento mostra a sigla no meio da célula e o número do dia pequeno no canto de cima, à direita.
  Dias com evento letivo (IB, TB, EXF, FEL...) ficam sem cor; os não letivos (F, PF, RE, FS...) continuam coloridos.
  A legenda segue a mesma regra. Dias sem evento continuam só com o número.
- Feriado é só F (saíram Antecipação AF e Transferência TF). Quando o feriado muda de dia, cadastra-se na tela
  Feriados um feriado "só neste ano" com o motivo no nome, ex.: 14/05/2027 "Aniversário da Cidade (13/05)".
- As siglas são desenhadas pelo sistema depois de copiar o modelo; "Guardar como modelo" mantém as fórmulas do modelo.

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

**Quadro de servidores (03/11/2026)**
- Primeira ferramenta nova da Área da Escola: ver quem atua, incluir quem falta (pelo CPF) e marcar quem não atua mais. Sem códigos pessoais e folhetos por enquanto (entram em janeiro, com a entrada do servidor).
- Lê a Base de Dados de Homologação (carga de 07/10), que passa a ser a base oficial: as correções das escolas já valem para janeiro.
- Projeto Apps Script próprio na conta portal.semec (10_APPSCRIPT/01_BACKENDS), separado do projeto de instalação e migrações, para nenhuma função de manutenção ficar ao alcance da tela. App da Web: Executar como Eu, acesso só do domínio. Abre em nova aba pelo cartão do Portal.
- Quem entra: conta ATIVA em CONTAS_INSTITUCIONAIS (planilha Acessos). Escola vê só a própria; SEMEC e Administração escolhem a escola.
- O CPF do servidor não aparece na tela da escola, nem mascarado (decisão de 03/11, substitui a seção 6 do escopo da Etapa 1 para a escola): a escola só digita o CPF para incluir alguém, e ele nunca volta para a tela. A lista mostra nome, cargo e vínculo. Consulta de CPF limitada a 60 por hora por conta. Inclusão e saída pedem o nome de quem opera e vão para LOGS_ALTERACOES; entradas e consultas de CPF, para LOGS_ACESSO.
- Lista de gestores (03/11, estrutura 1.4.0): nova aba GESTORES na planilha de Acessos, com nome, função (diretor, coordenador pedagógico, secretário escolar, equipe da SEMEC, formador, orientador), escola ou grupo formativo e situação. Nas telas, quem opera escolhe o próprio nome na lista; não se digita. Quem não está na lista não consegue salvar e pede à SEMEC para incluir. Conta de escola vê os gestores da escola; conta da SEMEC vê os da unidade SEMEC. Vale para todas as ferramentas (Quadro primeiro; Calendário e as próximas em seguida). O Quadro dá o código GES-#### às linhas novas da aba GESTORES e corrige código repetido.
- Menu lateral do Quadro igual ao das páginas da área: na Escola entra depois de Calendário Escolar; na SEMEC, depois de Gerador de Calendário e Visão da Escola.
- Gerador de Calendário com a lista de gestores (03/11): "Quem está lançando?" deixa de ser nome digitado e passa a ser escolha na aba GESTORES (pessoas ATIVAS da unidade SEMEC). O histórico grava "GES-#### · Nome". Quem entra continua conferido pela aba Escolas da Base de Consulta.
- Publicado em 03/11: cartão "Quadro de servidores" nas Áreas da Escola e da SEMEC e item no menu lateral de todas as páginas das duas áreas (Portal e Central de Certificados), logo depois de Calendário Escolar / Visão da Escola. Abre em nova aba.
- O visual antigo do Codex (Área da Escola e login CPF + senha) era só demonstração, com dados inventados; serviu de referência visual e não foi copiado.

**Funções adicionais e Tangará Sorteia (03/11/2026)**
- Nova seção "Funções adicionais" nas Áreas da Escola e da SEMEC, abaixo das Ferramentas: ferramentas de apoio que não usam dados de servidores. Em `dados/ferramentas.json`, o campo `grupo: "adicional"` coloca o cartão nessa seção; seção sem cartão não aparece.
- Primeiro item: Tangará Sorteia (https://formacaocontinuada-hue.github.io/tangara-sorteia/), app próprio com visual de evento; abre em nova aba e não passa pelo login do Portal. Cartão com o Tangará do presente.
- Menu lateral: grupo "Funções adicionais" logo depois de Principal, em todas as páginas das áreas (Portal, Central de Certificados, Quadro de servidores e Gerador de Calendário).

**Gerador de Calendário no padrão do Portal (03/11/2026)**
- A tela usa o `css/portal.css` do Portal, o mesmo menu lateral da Área da SEMEC, a barra superior e as janelas no mesmo formato. Funções e regras do gerador não mudaram (anos, eventos, feriados, ver calendário, rascunho e publicação).
- O ano aberto, "Quem está lançando", Gerar PDF e Publicar ficam num painel no alto; o aviso da última publicação fica logo abaixo.
- A página de acesso não autorizado também segue o padrão (Tangará de acesso negado).

**Acesso do servidor — definição (04/11/2026)**
- Valem as regras do escopo da Etapa 1 (07/10), seções 3.2 e 7.2–7.3: CPF + código pessoal de 8 caracteres gerado pelo sistema (ex.: `K7QX-M3PA`, sem 0/O, 1/I/L), que não vence; 5 tentativas erradas bloqueiam por 15 min, com mensagem neutra; a planilha guarda só o hash; sessão que não desconecta sozinha (30 dias sem uso), com a opção "computador compartilhado"; Sair e reemissão encerram as sessões.
- Entrada pela página `entrar.html` do Portal (GitHub), que conversa com um Apps Script público (sem conta Google). Esse acesso só faz o login e as consultas do próprio servidor; nada da escola.
- Os folhetos e a reemissão ficam dentro do Quadro de servidores: botão "Gerar folhetos de quem ainda não tem código" (lote) e, em cada pessoa, "Gerar novo código". Como a planilha não guarda o código legível, reimprimir sempre gera um código novo e o anterior deixa de valer; a tela avisa antes. O PDF é baixado e não fica no Drive.
- Folheto em meia folha A4 (2 por folha, linha de corte): Tangará, nome, cargo e escola, código grande, 3 passos, QR para a página de entrada, aviso "não compartilhe / perdeu, peça na escola", "No Portal você encontra" (certificados, perfil e foto, crachá) e data de emissão. Sem CPF. Modelo visual aprovado em 04/11/2026.
- Servidor em mais de uma escola: qualquer escola onde ele está Atuando pode gerar o código; vale o último. A auditoria registra a escola e o gestor que gerou.
- Janeiro de 2027 (muda a sequência 1A/1B do escopo): o servidor já encontra tudo de uma vez — Meus certificados de 2026, perfil e contato, foto e crachá com QR opaco. A escola envia e recusa fotos pelo Quadro.
- O crachá é a **Carteira Funcional e de Benefícios** (modelo da SEMEC, frente e verso; benefício da Lei 2.668/2007, redação da Lei 6.794/2025). Além de identificar nas formações, dá ao servidor um motivo para manter os dados atualizados. Digital (na página do servidor) e impressa pela escola. O modelo fica no Drive da portal.semec, nunca no GitHub.
- Frente: nome, cargo/função, escola, foto, QR e o ano no selo de validade. Verso: nome, matrícula, CPF **mascarado**, data de nascimento e cargo/função.
- **Data de nascimento volta para o Portal** (muda a decisão de 07/10, que a deixava de fora): é exigida pela carteira de benefício. Vem da Base de Consulta na carga e o servidor confere e atualiza no perfil; toda alteração vai para a auditoria. Não aparece nas telas da escola. Pede mudança na estrutura (`SERVIDORES`).
- QR só para presença nas formações: código opaco, sem CPF; ninguém de fora valida a carteira pelo QR.
- Validade: um ano, o ano letivo de 2027 (selo "Validade 2027").
- **Cargo/função só a escola altera** (pelo Quadro). No perfil, o servidor vê o cargo, mas não edita.
- **Foto de perfil uma vez por ano:** o servidor (ou a escola por ele) envia antes da emissão da carteira do ano. Se a escola recusar, ele envia de novo (recusa não conta). Quando a escola emite a carteira, a foto trava até o ano seguinte.
- **Sem foto, sem carteira e sem formações** (substitui o item 5 da seção 5 do escopo de 07/10, que previa presença manual sem foto): não há como registrar a presença. Cada escola é responsável por cobrar a foto e emitir as carteiras do seu quadro. A escola vê no Quadro quem está sem foto e sem carteira.
- Quem entra na rede durante o ano: a escola inclui no Quadro, a foto é enviada e a escola emite a carteira na hora.
- **Impressão:** frente e verso lado a lado, como no modelo; recortar, dobrar ao meio e plastificar. 4 carteiras por folha A4 deitada (paisagem), cada face com 7,1 × 9,5 cm (70% do modelo; cabe no porta-documentos da carteira, como o RG antigo), com marcas de dobra e régua de 10 cm. O PDF já sai configurado para imprimir em "Tamanho real" (sem ajustar à página). Antes do lote, a escola imprime uma página de teste com régua de 10 cm para conferir a escala. A tela de emissão traz o passo a passo da impressora (A4, colorido, qualidade alta, tamanho real/100%, tipo de papel correspondente) e a recomendação de papel: couché fosco ou papel fotográfico fosco de 170 a 180 g/m² (dobra sem rachar), plastificação de 125 micras. Papel sulfite comum e modo rascunho/econômico não são recomendados.
- Estrutura 1.5.0 (04/11): `SERVIDORES.DATA_NASCIMENTO` (só nessa aba; o validador recusa em outras), preenchida pela Base de Consulta ligando pelo CPF; data diferente para a mesma pessoa ou impossível fica em branco. `CRACHAS`: `QR_IDENTIFICADOR` (código opaco impresso; não é senha), `ANO_VALIDADE`; sem `ARQUIVO_PDF_ID` (o PDF não fica no Drive).
- Estrutura 1.5.0 instalada e verificada em 04/11/2026: 1.626 dos 1.636 servidores com data de nascimento; os 10 sem data preenchem no perfil.
- Modelo da carteira no Drive da portal.semec (Google Apresentações "TEMPLATE_CRACHA_1"), com os campos `{{NOME_COMPLETO}}`, `{{CARGO}}`, `{{LOCAL_TRABALHO}}`, `{{ANO_VALIDADE}}`, `{{MATRICULA}}`, `{{CPF}}` (mascarado) e `{{DATA_NASCIMENTO}}`; foto e QR entram nos dois quadros cinza, identificados pelo texto alternativo (Descrição) `PLACEHOLDER_FOTO` e `PLACEHOLDER_QR`; o ano cabe no selo (testado pela SEMEC). Linhas do verso ajustadas pela SEMEC (estavam inclinadas).
- **Backend do acesso (04/11):** projeto Apps Script novo "Acesso do Servidor" (público, Executar como portal.semec, Qualquer pessoa), que só entra, confere a sessão e sai. A emissão dos códigos fica no Quadro de servidores (`emitirCodigos`: lote de quem não tem código, ou código novo para uma pessoa, que revoga o anterior e encerra as sessões dela). Hash = SHA-256 de chave secreta + sal individual + código; a chave `PORTAL_CHAVE_CODIGOS` é criada no Quadro e copiada, igual, para o projeto público. Tentativas erradas contadas por CPF (inclusive CPF que não existe, para não revelar quem existe). Sessão em "computador compartilhado" também vence em 12 h no servidor. Sessões encerradas ou vencidas são apagadas por rotina diária. Servidor com cadastro BLOQUEADO não recebe código nem entra.
- **Telas do acesso (04/11):** no Quadro, painel "Folhetos de acesso ao Portal" (lote de quem não tem código, contagem "Sem código pessoal", "Gerar código / Gerar novo código" em cada linha, passo a passo de impressão). Os folhetos saem pela janela de impressão do navegador (A4, 2 por folha, no modelo aprovado; "Salvar como PDF" quando não for imprimir na hora); a janela "Folhetos prontos" só fecha pelo botão e apaga os códigos da página ao fechar. No Portal, `entrar.html` (modelo da entrada, com CPF, código e "computador compartilhado") e `js/servidor.js` (sessão). Enquanto o endereço do Apps Script público não for preenchido em `js/servidor.js`, a página mostra "A entrada dos servidores abre em janeiro de 2027". Novos componentes no `portal.css`: `.check` e `.auth-form`.
- **Perfil (04/11):** o próprio servidor atualiza e-mail de contato, telefone de contato (pedido como "telefone com WhatsApp") e data de nascimento; cada alteração vai para a auditoria. O nome social não é editado pelo servidor. **A escola passa a ver o telefone de contato** de quem está no seu quadro (muda a seção 6 do escopo de 07/10, em que a escola não via contato); o e-mail continua sem aparecer para a escola. A carteira digital aparece no celular do servidor só depois que a escola emitir a carteira do ano.
- **Área do Servidor construída (04/11):** `servidor.html` (boas-vindas com foto, avisos de pendência, resumo da foto e da carteira, próxima formação, "Você sabia?"), `perfil.html` (foto 3:4 recortada e reduzida no próprio aparelho, contato com WhatsApp, nascimento, dados do cadastro só para leitura), `carteira.html` (situação da carteira do ano) e `certificados.html` (Meus certificados: lê, sem alterar, a aba `CERTIFICADOS_EMITIDOS` da planilha `REGISTRO_CERTIFICADOS_2026`, a mesma da Central; liga pelo `ID_SRV` escrito em `OBSERVACAO`, nunca pelo nome; cancelados e substituídos não aparecem; o PDF é entregue pelo próprio Portal, porque a maioria dos servidores não tem conta @edu para abrir o Drive; Ver, Baixar e Validar; toda pesquisa, visualização e download vai para `LOGS_CONSULTAS_CERTIFICADOS`). Mesma porta "Verificando o acesso" das outras áreas e menu próprio: Início, Meu perfil, Minha carteira, Meus certificados, Assistência e Sair. Fotos guardadas em Portal SEMEC > 05_CRACHAS > FOTOS (restrita); só a última foto de cada pessoa fica guardada, a anterior vai para a lixeira. A auditoria do perfil registra quais campos mudaram, sem o valor.
- **Área do Servidor** reaproveita a organização da tela do Codex (saudação com foto, próxima formação, resumo, "Você sabia?") e o menu (Início, Meu perfil, Meu crachá, Histórico de formações, Certificados, Eventos, Ajuda, Política de Privacidade, Sair), sempre com `portal.css`; o `styles.css` e o `script.js` do Codex não são usados.
- **"Você sabia?" (04/11):** cartões que deslizam (setas, pontos, arrastar no celular, teclado), com filtro por tema — Direitos, Deveres, Formação, Benefícios, Portal e dados —, o Tangará do tema, o público (ex.: Professores) e "Onde está escrito" com a lei. Começa num cartão diferente a cada dia. Textos num arquivo só (`dados/voce-sabia.json`), trocado pela SEMEC no GitHub. Conteúdo tirado de leis pesquisadas em sites oficiais (Constituição, LDB, Lei do Piso, LGPD, LC municipais 006/1994 e 019/1996, Lei 2.668/2007); **só vai ao ar o cartão marcado como conferido pela SEMEC** (`"conferido": true`), porque as leis municipais têm alterações que não estão consolidadas nos textos publicados. Formato aprovado em 04/11/2026; os textos serão atualizados depois pela SEMEC.
- **Emissão da carteira (04/11):** no Quadro, "Foto e carteira" em cada pessoa (ver a foto, enviar pela pessoa, recusar — a recusa apaga a foto —, emitir, reemitir com novo QR, imprimir de novo) e "Emitir carteiras de quem já tem foto" (uma por vez, com barra de progresso). A carteira é gerada de uma cópia temporária do modelo (09_TEMPORARIOS, apagada em seguida); a imagem fica em 05_CRACHAS > CARTEIRAS (só a da carteira ativa) e aparece no celular do servidor com o QR em tamanho grande. Impressão: 4 por A4 deitada, com página de teste (régua de 10 cm). Estrutura 1.6.0: `CRACHAS.ARQUIVO_IMAGEM_ID`. O QR é gerado no próprio Apps Script (biblioteca QRCode de Kazuhiko Arase, licença MIT).
- Modelo aprovado em 04/11/2026 (versão ajustada pela SEMEC): foto 3:4 na moldura de cima da frente, QR ocupando toda a moldura quadrada de baixo; texto da lei resumido no próprio modelo (Lei nº 2.668/2007, art. 1º, redação da Lei nº 6.794/2025), em letra maior para ficar legível no tamanho impresso.

## Pendências
- Endereços publicados das ferramentas (ver campo `pendencia` em `dados/ferramentas.json`).
- Logística: quais ferramentas entram.
- Acesso do servidor: preencher em `js/servidor.js` o endereço do Apps Script público quando a SEMEC decidir abrir a entrada (previsto para janeiro de 2027).
- "Você sabia?": a SEMEC confere os cartões de lei e marca `"conferido": true` em `dados/voce-sabia.json`.
