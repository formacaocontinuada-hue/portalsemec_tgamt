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
- Uma ferramenta pode aparecer em mais de uma área (`areas` em `dados/ferramentas.json`).
- Ajuda, contato, privacidade e acessibilidade apontam para as páginas da Central até o Portal ter as suas.

**Login (Apps Script da Central) — funcionando em 14/10**
- `10_sessao_entrada.gs` aceita retorno para `/central-certificados-semec/` e `/portalsemec_tgamt/`; a tela `Entrar` mostra "Portal SEMEC · Área da Escola" ou "Central de Certificados" conforme a origem.
- Implantação institucional: Executar como Eu, acesso somente domínio (é ela que confere a conta).
- Implantação pública: Executar como Eu, acesso **Qualquer pessoa**. Se ficar "somente domínio", o Portal e a Central mostram "Não foi possível falar com o serviço da SEMEC".
- `BASE_CONSULTA_ID` em `00_Config` precisa apontar para a Base_Consulta em uso; se a base for recriada, trocar o ID e publicar nova versão nas duas implantações.

## Pendências
- Endereços publicados das ferramentas (ver campo `pendencia` em `dados/ferramentas.json`).
- Logística: quais ferramentas entram.
