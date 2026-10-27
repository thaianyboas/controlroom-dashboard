# ControlRoom Dashboard — Documento mestre / Contexto para continuar

**Atualizado:** 27/10/2026  
**Status:** Etapa 24 compilou com sucesso (GitHub Actions verde). **Ainda falta atualizar o HACS e testar a nova interface.**

> **Como usar:** No início de uma nova conversa, anexe este arquivo e diga: “Continue o desenvolvimento do ControlRoom Dashboard a partir do estado registrado aqui. Trabalhe uma etapa por vez e entregue arquivos completos.” Atualize o documento após cada etapa confirmada.

## 1. Objetivo

Criar um **Community Dashboard** premium para Home Assistant, com interface elegante inspirada em produtos Apple, responsiva, multilíngue, com navegação própria, descoberta automática de entidades/áreas, editor visual futuro, automações e visualização 3D da residência. O dashboard deve ser instalado pelo HACS e aparecer em **Einstellungen → Dashboards → Dashboard hinzufügen → Community-Dashboards**, como o Simon42.

A imagem de referência enviada pelo usuário tem: menu lateral com Início/Ambientes/Dispositivos/Energia/Segurança/Câmeras/Mídia/Automação/Agenda/Configurações; saudação personalizada; cartões de pessoas, energia, casa, cenas e mídia; efeito glass discreto e visual sofisticado. **Referência visual, não implementação concluída.**

## 2. Repositório e publicação

- GitHub: https://github.com/thaianyboas/controlroom-dashboard
- Branch única de publicação: **`master`**.
- Atualização: **HACS**, sem branches DEV, tags ou releases como fluxo padrão.
- Build: GitHub Actions, Rollup + TypeScript, gera `dist/controlroom-dashboard.js` e o workflow o commita.
- HACS configurado com `hacs.json` (`filename: controlroom-dashboard.js`, `content_in_root: false`).
- Home Assistant executado em LinknLink iSG Display Max; idioma do HA atualmente alemão.
- Existe um dashboard de testes **Macedo Home Test**; não modificar Simon42 nem o projeto separado ControlRoom Music Card.
- Dashboard comunitário **Macedo Home** já criado com sucesso pela opção ControlRoom Dashboard.

## 3. Arquivos conhecidos

- `src/controlroom-dashboard.ts` — componente Lit `@customElement("controlroom-dashboard")`, `type: custom:controlroom-dashboard`; contém layout, traduções e navegação. **Arquivo foi substituído na Etapa 24**.
- `src/controlroom-strategy.ts` — estratégia de dashboard registrada como `ll-strategy-dashboard-controlroom`, com `window.customStrategies` (`type: controlroom`, `strategyType: dashboard`), `static noEditor = true`, `static getCreateSuggestions()`, `static generate()` criando uma view Panel com o cartão ControlRoom. Tem `export {};` no final para corrigir TS2669.
- O arquivo principal importa `./controlroom-strategy.js` na primeira linha.
- `rollup.config.js`, `tsconfig.json`, `package.json`, `.github/workflows/build.yml`, `hacs.json`, `README.md`.

**Nota:** este documento não substitui o código real. Antes de editar, usar o conteúdo mais recente do GitHub. O commit atual da Etapa 24 deve ser verificado no repositório; não foi fornecido o SHA.

## 4. Histórico confirmado

1. Repositório, build e instalação pelo HACS concluídos.
2. Cartão inicial funcionou em visualização Panel; tradução alemã confirmada.
3. Estratégia Community Dashboard criada; corrigido erro TS2669 com `export {};`.
4. Import da estratégia no bundle principal; build verde.
5. **Confirmado por screenshots:** ControlRoom aparece ao lado do Simon42 em **Community-Dashboards**; usuário criou **Macedo Home**; o dashboard abriu e exibiu interface inicial em alemão.
6. **Etapa 24:** usuário substituiu `src/controlroom-dashboard.ts` por versão com menu lateral, páginas, saudação pelo usuário do HA, relógio, data, tradução `en/de/pt` e layout responsivo. **GitHub Actions verde. Não há confirmação de atualização HACS ou de funcionamento visual dessa versão ainda.**

## 5. Funcionalidades da Etapa 24 — implementação atual a validar

- Menu lateral: Início, Ambientes, Dispositivos, Energia, Segurança, Câmeras, Mídia, Automação, Agenda, Configurações.
- Botões de navegação alteram a página interna do cartão (estado Lit `activePage`).
- Início mostra saudação conforme horário e `hass.user.name`, cartões provisórios e subtítulo.
- Relógio e data com `Intl.DateTimeFormat`, atualização por intervalo de 30 segundos e limpeza do intervalo ao desconectar o componente.
- Idioma deriva de `hass.language`: `de`, `pt`, `en` (fallback inglês).
- Menu responsivo para telas menores, ícones `ha-icon` do Home Assistant.
- Páginas secundárias **ainda são placeholders**, sem dados reais dos dispositivos.
- Menu lateral do ControlRoom é interno ao cartão; **a barra lateral nativa do Home Assistant ainda existe**.

## 6. Próxima ação exata

**Etapa 25 — testar a navegação recém-compilada:**

1. No Home Assistant, abrir HACS → ControlRoom Dashboard.
2. Atualizar informações / baixar novamente a versão do repositório, conforme a interface disponível.
3. Recarregar a página forçadamente (`Ctrl + Shift + R`) ou reabrir o HA.
4. Abrir **Macedo Home**.
5. Confirmar visual do menu, saudação, relógio, navegação e responsividade; enviar screenshot.
6. Se houver problema, diagnosticar antes de acrescentar funcionalidades.

**Não assumir que a Etapa 24 já foi testada no HA.**

## 7. Roadmap combinado (ainda não concluído)

- Refinar layout premium e experiência de navegação (inclusive mobile/tablet).
- Descoberta automática de áreas, dispositivos e entidades do Home Assistant, evitando IDs pessoais fixos no produto distribuído.
- Painel inicial com dados reais: pessoas, presença, iluminação, climatização, energia, segurança, mídia.
- Editor visual para personalizar sem YAML; temas claro/escuro/automático e opções de glass.
- **Lixo hoje e amanhã:** widget sempre visível; integração de coleta deve ser **refeita do zero** porque o calendário antigo deixou de funcionar e foi excluído. Não presumir entidade de calendário existente.
- **Mapa 3D da residência:** representação animada de portas/janelas abertas/fechadas e iluminação ligada/desligada, baseada em sensores e luzes existentes. Depende de dados de sensores e modelo 3D; é objetivo futuro, não recurso atual.
- Câmeras, cenas rápidas, automações, Spotify/mídia e modos da casa.
- Localização dos textos conforme idioma do Home Assistant em toda a interface.

## 8. Preferências e regras de colaboração

- Conversar em **português brasileiro**, linguagem leve e direta.
- **Uma etapa por vez**; aguardar confirmação de build verde ou screenshot antes da próxima.
- Para alterações de código, enviar **arquivo completo pronto para substituir**, não fragmentos (salvo correções triviais de uma linha, quando explicitamente conveniente).
- Informar **caminho exato**, cliques no GitHub e **mensagem do commit**.
- **Não publicar ou presumir testes bem-sucedidos** antes de confirmação do usuário.
- **Nunca quebrar a versão funcional deliberadamente**; preservar integrações e estratégia.
- Não misturar ControlRoom Dashboard com o projeto **ControlRoom Music Card**, que tem seu próprio fluxo e baseline.

## 9. Registro de decisões / cuidados técnicos

- Erro anterior: `private translate()` colidiu com `HTMLElement.translate`; função de tradução foi renomeada para `private t()`.
- Erro anterior: TS2669 no `declare global` da estratégia; corrigido com `export {};`.
- `window.customStrategies` foi confirmado funcional no ambiente atual do usuário pela aparição no seletor Community-Dashboards.
- O registro da estratégia cria uma view `type: panel` contendo `custom:controlroom-dashboard`.
- Visualização full-width no HA **não equivale a fullscreen do navegador**; header e sidebar nativos podem continuar visíveis.
- O calendário de lixo antigo **não existe mais**.

## 10. Log de continuidade (atualizar em cada sessão)

| Data | Etapa | Resultado | Próxima ação |
|---|---|---|---|
| 27/10/2026 | Community Dashboard | Registrado e testado; Macedo Home criado | Desenvolver UI |
| 27/10/2026 | Etapa 24 — navegação premium | Build verde no GitHub | Atualizar HACS e testar interface |

---

**Mensagem sugerida para nova conversa:**

“Estou desenvolvendo o ControlRoom Dashboard. Leia o documento mestre anexado e continue exatamente da próxima etapa. Não altere nosso fluxo `master`/HACS, trabalhe uma etapa por vez, forneça arquivos completos e espere minha confirmação antes de avançar.”
