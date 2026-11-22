# [Análisis y Desarrollo de Software · Cristian Rivera](https://riveracrist.github.io/)

sitio web GitHub page estático donde se presenta de forma general el rol del Analista y Desarrollador de Software y las tareas asociadas a esta profesión.

## Tecnologías

Astro 6 genera HTML estático; la interfaz emplea HTML semántico, CSS propio y JavaScript nativo. Node.js 24 ejecuta el entorno de desarrollo. GitHub Actions construye y despliega `dist/` a GitHub Pages. No hay servidor de aplicación.

## Desarrollo

Requiere Node.js 24 o posterior.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

Para compilar bajo el subdirectorio de un repositorio:

```sh
PAGES_BASE=/github_page_mejora/ npm run build
```

La demo usa `localStorage`; los datos pertenecen solo al navegador actual. No se envían a un servidor.

## Publicar

Sube el contenido de esta carpeta a un repositorio independiente y usa `main` como rama. En Settings → Pages elige GitHub Actions. `.github/workflows/deploy.yml` instala dependencias, ejecuta pruebas, compila Astro con la ruta del repositorio y publica `dist/`.

Para un repositorio de proyecto, la URL tendrá el formato `https://riveracrist.github.io/nombre-del-repositorio/`. Para el repositorio de usuario `riveracrist.github.io`, se usa la raíz del dominio y `PAGES_BASE=/`.

## Arquitectura y directorios

```text
src/components/   tarjetas de las fases
src/data/         contenido educativo e historias
src/layouts/      navegación y estructura HTML común
src/pages/        inicio, guía y caso práctico estáticos
src/scripts/      interacción CRUD de Taskflow
src/styles/       estilos responsive
public/           recursos estáticos
.github/workflows publicación de Pages
```

Astro produce tres páginas HTML prerenderizadas. `src/data/phases.js` comparte fichas entre el inicio y la guía. Los enlaces usan la base de despliegue. La demo no hidrata un framework ni requiere backend.

## Caso Taskflow

El MVP permite crear, consultar, editar, eliminar, priorizar, filtrar y completar tareas. El caso documenta problema, alcance, requisitos, historias, criterios, modelos conceptuales, arquitectura estática, pruebas, despliegue y evolución. El modelo relacional es una propuesta para una futura API multiusuario.

Git, GitHub Issues, Mermaid, diagrams.net, Node, Astro, Vitest/Node test runner, Playwright y GitHub Actions apoyan diferentes fases. Jira, Azure DevOps, Figma, Lucidchart, BrowserStack, Netlify y Cloudflare Pages son opciones comerciales.

## Mantener

Edita `src/data/phases.js`, páginas Astro y `src/styles/site.css`. Ejecuta `npm test` y `npm run build`; revisa el preview y publica los cambios a `main`. GitHub Pages aloja contenido estático, por lo que autenticación, API y sincronización requieren servicios adicionales.
