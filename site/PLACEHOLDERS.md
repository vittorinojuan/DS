# Placeholders e gate de deploy

Valores que ainda não existem entram como token grepável. Nada de `#`, `00.000.000/0001-00` ou `5583900000000`.

| Token | O que é | Onde aparece | Status |
|---|---|---|---|
| WhatsApp `5511921527692` | número da Ágora (+55 11 92152-7692) | links `wa.me`, schema `telephone` | resolvido, sem token |
| Domínio `https://agoratlas.com.br` | domínio final, sem barra final | canonical, og:url, og:image, schema, robots, sitemap | resolvido, sem token |
| `__CNPJ__` | CNPJ do MEI | rodapé, `privacidade.html` | **pendente** (usuário) |
| `__GA4_ID__` | measurement ID `G-XXXXXXXXXX` | snippet gtag em `index.html` e `privacidade.html` | **pendente** (usuário) |

## Passos manuais do usuário

- Criar a propriedade GA4 e informar o measurement ID.
- Marcar o evento `clique_whatsapp` como conversão na interface do GA4.
- Cadastrar o Google Meu Negócio da Ágora.
- Ligar o Search Console e submeter `https://agoratlas.com.br/sitemap.xml`.

## Gate obrigatório antes de qualquer deploy

```bash
grep -rn "__WHATSAPP_E164__\|__CNPJ__\|__DOMINIO__\|__GA4_ID__\|5583900000000\|00\.000\.000" site/
```

Tem que voltar vazio (o próprio `PLACEHOLDERS.md` cita os tokens e deve ser excluído do grep: `--exclude=PLACEHOLDERS.md`). Enquanto não voltar, o site não sobe.
