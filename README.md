# POKE Web - Frontend

_Este proyecto contiene el frontend de POKE Web_

## Objetivo del aplicativo

Poke permite explorar y consultar información sobre Pokémon mediante un frontend React conectado al backend del proyecto. El backend expone una API que consume PokeAPI y mantiene una caché local de información consultada.

Las funciones expuestas por el backend incluyen autenticación, catálogo paginado, búsqueda y detalle de Pokémon, consulta de tipos, habilidades, movimientos e historial de búsquedas. Este alcance orienta el desarrollo del frontend; no implica que todas sus pantallas ya estén implementadas.

---

## Diseño visual

El objetivo funcional, los patrones de interfaz de las capturas y la paleta Pokémon adaptada para Poke están documentados en [docs/diseno-visual.md](../../docs/diseno-visual.md). La guía conserva las reglas de composición, tipografía y espaciado de las referencias y define su aplicación al catálogo, las fichas, los tipos y el historial.

---

## Repositorio

[https://github.com/wmelendez97/poke-frontend](https://github.com/wmelendez97/poke-frontend)

## Backend del proyecto

[https://github.com/wmelendez97/poke-backend](https://github.com/wmelendez97/poke-backend)

---

# Comenzando 📟

Este proyecto está realizado con React 19, TypeScript y Vite 8.

### Pre-requisitos 📋

Para el desarrollo necesitarás Node.js y un administrador de paquetes instalado.

##### Este proyecto fue construido con 🛠️

- React 19+ & TypeScript
- Vite 8
- PrimeReact

##### Node

##### Instalación de Node en Windows

Ir a [sitio web oficial de Node.js](https://nodejs.org/en/download) y descargar el instalador LTS.

Si la instalación fue satisfactoria, deberías ser capaz de ejecutar los siguientes comandos:

```bash
$ node --version
v24.11.0

$ npm --version
11.6.1
```
##### PNPM

Para instalar PNPM y tener mejor seguridad de las dependencias a usar

```
  $ npm install -g pnpm@11.1.2

  $ pnpm --version
  11.1.2
```

##### Vite

Vite ya viene configurado dentro del proyecto como dependencia de desarrollo, no es necesario instalarlo de forma global.

##### Instalación del proyecto 🔧

```bash
$ git clone https://github.com/wmelendez97/poke-frontend.git
$ cd poke-frontend
$ pnpm i
```

# Ejecución del proyecto 🚀

Para poder ejecutar el proyecto debes ejecutar:

```bash
$ pnpm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

# Comandos útiles

```bash
$ pnpm run build
$ pnpm run preview
$ pnpm run lint
```
