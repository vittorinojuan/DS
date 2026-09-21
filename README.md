# Site da Ágora

Site estático de uma página (HTML, CSS e JS puros, sem build) para a Ágora, marketing digital para microempresas.

```
site/     ← o site publicável (index.html, privacidade.html, 404.html, styles.css, main.js, assets/)
docs/     ← materiais de apoio (ficha de diagnóstico, respostas rápidas do WhatsApp). Não vão para o ar.
legacy/   ← versão antiga em .dc.html (não publicar)
```

## Rodar local

```bash
npx --yes serve site
```

Abra a URL que o comando imprimir (se a porta estiver ocupada, ele escolhe outra e avisa). O `serve` se comporta como o Cloudflare Pages: `/privacidade` abre sem `.html` e uma rota inexistente mostra `404.html`.

Teste também com JavaScript desligado (DevTools → Settings → Debugger → *Disable JavaScript*): a página tem que continuar inteira.

## Antes de publicar

Ainda há valores pendentes, marcados com tokens. Veja [site/PLACEHOLDERS.md](site/PLACEHOLDERS.md) para a lista completa e os passos manuais.

O gate obrigatório (o comando está em `site/PLACEHOLDERS.md`) tem que voltar vazio. Antes do deploy final, atualize o `<lastmod>` de `site/sitemap.xml` para a data do deploy.

## Publicar no Cloudflare Pages

O Pages só lê a pasta `site/`. Enquanto o gate não voltar vazio, publique apenas em `*.pages.dev`, nunca no domínio final.

1. **Git.** Crie um repositório **privado** no GitHub e envie a branch `master`.
   Alternativa sem GitHub: `npx wrangler login` e depois `npx wrangler pages deploy site --project-name agora`.
2. **Projeto.** Cloudflare → Workers & Pages → Create → Pages → Connect to Git. *Production branch*: `master`. *Build command*: vazio. *Build output directory*: `site`.
3. **Valide em `*.pages.dev`** (checklist abaixo).
4. **Domínio.** Adicione `agoratlas.com.br` como site no Cloudflare (plano Free) e troque os nameservers no Registro.br pelos que a Cloudflare indicar. Depois, em Pages → Custom domains, adicione `agoratlas.com.br` e `www.agoratlas.com.br`.
5. **www → apex.** O `_redirects` do Pages não aceita domínio na origem, então use uma *Redirect Rule*: Rules → Redirect Rules → *Custom filter*, `Hostname equals www.agoratlas.com.br`, ação *Dynamic*, expressão `concat("https://agoratlas.com.br", http.request.uri.path)`, código 301, *preserve query string* ligado. O registro DNS do `www` precisa estar com o proxy ligado (nuvem laranja).
6. **HTTPS.** SSL/TLS em *Full* e *Always Use HTTPS* ligado.

Os cabeçalhos de segurança e de cache estão em `site/_headers`; a página 404 é `site/404.html` (o Pages a usa sozinho).

### Checklist pós-deploy

```bash
curl -sI https://agoratlas.com.br/            # 200 e os headers do _headers
curl -sI https://www.agoratlas.com.br/        # 301 para https://agoratlas.com.br/
curl -sI https://agoratlas.com.br/privacidade # 200
curl -sI https://agoratlas.com.br/xyz         # 404, com a página própria
```

- PageSpeed Insights (mobile): 90 ou mais em Performance, SEO e Acessibilidade.
- Colar o link numa conversa de WhatsApp mostra o preview com a `og-image.png`.
- GA4 DebugView recebe `clique_whatsapp` de cada CTA.
- Cada botão abre o WhatsApp no número certo, com a mensagem certa.
