# GwenTech — sitio web

Página de una sola vista para GwenTech, servicio técnico freelance de
reparación y mantenimiento de computadoras en Playa del Carmen, Quintana Roo.

Sitio estático (HTML + CSS + JS, sin frameworks ni proceso de build) pensado
para publicarse gratis en **GitHub Pages**.

## Ver en local

No requiere instalar nada. Basta con servir la carpeta con cualquier
servidor estático, por ejemplo:

```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```

(Abrir `index.html` directamente con doble clic también funciona, aunque
algunos navegadores restringen ciertas rutas relativas al usar `file://`).

## Estructura

```
index.html      Contenido y estructura de la página (una sola vista)
styles.css      Estilos: paleta oscura, animaciones, responsive
script.js       Menú móvil, pestañas de servicios, animaciones al hacer scroll,
                fondo animado de partículas tipo "circuito"
favicon.svg     Ícono de pestaña del navegador
robots.txt      Indexación para buscadores
sitemap.xml     Mapa del sitio para Google
.nojekyll       Evita que GitHub Pages procese el sitio con Jekyll
```

## Publicar en GitHub Pages (gratis)

1. Entrar a **Settings → Pages** del repositorio:
   `https://github.com/GwenIwnl/pagina_gwentech/settings/pages`
2. En **Build and deployment → Source**, elegir **Deploy from a branch**.
3. En **Branch**, elegir `main` y la carpeta `/ (root)`. Guardar.
4. GitHub publica el sitio en 1-2 minutos en:
   `https://gweniwnl.github.io/pagina_gwentech/`

Después de esto, cualquier cambio que se suba a `main` se publica solo
(no hace falta repetir estos pasos).

## Editar contenido

- **WhatsApp / teléfono**: buscar `529841082210` en `index.html` (aparece en
  varios botones) y reemplazar por el nuevo número en el mismo formato
  (`52` + 10 dígitos, sin espacios).
- **Servicios**: cada tarjeta está dentro de `#tab-hardware` o
  `#tab-software` en `index.html`.
- **Sección "Próximamente"**: bloque `<section id="proximamente">`, incluye
  la fecha (noviembre 2026) y la lista de qué incluye el mantenimiento de
  GPU.
- **Colores**: variables al inicio de `styles.css`, dentro de `:root`.
