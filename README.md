# Site da Ágora

Site estático de uma página (HTML, CSS e JS puros, sem build) para a Ágora, marketing digital para microempresas.

```
site/     ← o site publicável (index.html, privacidade.html, styles.css, main.js, assets/)
legacy/   ← versão antiga em .dc.html (não publicar)
```

## Rodar local

```bash
npx serve site
```

Abra a URL que o comando imprimir. Teste também com JavaScript desligado (DevTools → Settings → Debugger → *Disable JavaScript*): a página tem que continuar inteira.

## Antes de publicar

Ainda há valores pendentes, marcados com tokens. Veja [site/PLACEHOLDERS.md](site/PLACEHOLDERS.md) para a lista completa e os passos manuais (GA4, Search Console, Google Meu Negócio).

Gate obrigatório, tem que voltar vazio:

```bash
grep -rn --exclude=PLACEHOLDERS.md "__WHATSAPP_E164__\|__CNPJ__\|__DOMINIO__\|__GA4_ID__\|5583900000000\|00\.000\.000" site/
```

Publicar é copiar a pasta `site/` para qualquer hospedagem estática, com o domínio `https://agoratlas.com.br` apontando para a raiz.
