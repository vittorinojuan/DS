# Placeholders e gate de deploy

Valores que ainda não existem entram como token grepável. Nada de `#`, `00.000.000/0001-00` ou `5583900000000`.

| Token | O que é | Onde aparece | Status |
|---|---|---|---|
| WhatsApp `5511921527692` | número da Ágora (+55 11 92152-7692) | links `wa.me` | resolvido, sem token |
| Domínio `https://agoratlas.com.br` | domínio final, sem barra final | canonical, og:url, og:image, schema, robots, sitemap | resolvido, sem token |
| `__CNPJ__` | CNPJ do MEI | rodapé e `privacidade.html`, `404.html` | **pendente** (usuário) |
| `__GA4_ID__` | measurement ID `G-XXXXXXXXXX` | snippet gtag em `index.html`, `privacidade.html` e `404.html` | **pendente** (usuário) |
| `__META_PIXEL_ID__` | ID do Meta Pixel (15 a 16 dígitos) | snippet do Pixel e `<noscript>` em `index.html`, `privacidade.html` e `404.html` | **pendente** (usuário). Decidido: a Ágora vai rodar Meta Ads |

## Passos manuais do usuário

**Publicar** (detalhes no [README](../README.md#publicar-no-cloudflare-pages))
- Criar o repositório privado no GitHub e enviar a `master` (o ambiente de desenvolvimento não tem `gh` nem remote configurado).
- Criar o projeto no Cloudflare Pages (output `site`), validar em `*.pages.dev`.
- Colocar `agoratlas.com.br` no Cloudflare, trocar os nameservers no Registro.br, ligar os custom domains e criar a Redirect Rule www → apex.
- Atualizar o `<lastmod>` do `sitemap.xml` no dia do deploy.

**Medir**
- Criar a propriedade GA4 e informar o measurement ID (substitui `__GA4_ID__` nos 3 arquivos).
- Marcar o evento `clique_whatsapp` como **evento-chave** na interface do GA4 e validar no DebugView.
- Criar o Pixel no Gerenciador de Eventos da Meta e informar o ID (substitui `__META_PIXEL_ID__` nos 3 arquivos). Validar com a extensão Meta Pixel Helper que o `PageView` e o `Contact` (com o parâmetro `cta`) disparam, e escolher `Contact` como evento de conversão nas campanhas.
- Ligar o Search Console como propriedade de **domínio** (verificação por TXT no DNS) e enviar `https://agoratlas.com.br/sitemap.xml`.
- Cadastrar o Google Meu Negócio da Ágora como empresa de área de serviço (endereço oculto), com o site e a categoria "Agência de marketing". Depois de verificado, adicionar `"sameAs": ["<link do perfil>"]` ao JSON-LD do `index.html`.

**Antes de o site ir ao ar**
- Ficha de diagnóstico pronta: rascunho em [`docs/ficha-diagnostico.md`](../docs/ficha-diagnostico.md). O site promete essa ficha nos CTAs.
- Respostas rápidas do WhatsApp Business: rascunho em [`docs/whatsapp-respostas-rapidas.md`](../docs/whatsapp-respostas-rapidas.md).
- Sócio ciente de que o contrato mínimo saiu do site (gestão mensal sem fidelidade).
- CNPJ informado.

## Gate obrigatório antes de qualquer deploy

```bash
grep -rn --exclude=PLACEHOLDERS.md '__CNPJ__\|__GA4_ID__\|__META_PIXEL_ID__\|5583900000000\|00\.000\.000\|contrato mínimo\|João Pessoa\|JP-0\|privacidade\.html\|href="#"' site/
```

Tem que voltar vazio (o próprio `PLACEHOLDERS.md` cita os tokens e fica fora do grep pelo `--exclude`). Enquanto não voltar, o site não sobe no domínio final.
