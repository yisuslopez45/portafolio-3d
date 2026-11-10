# Portafolio 3D

Portafolio personal interactivo construido con **React Three Fiber**. Una escena 3D a pantalla completa, con contenido HTML superpuesto cuando haga falta.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/)
- [@react-three/drei](https://github.com/pmndrs/drei) (helpers: `useGLTF`, `Loader`…)
- ESLint (typescript-eslint, react-hooks, react-refresh)

## Scripts

| Comando           | Descripción                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Servidor de desarrollo con HMR       |
| `npm run build`   | Comprueba tipos y genera `dist/`     |
| `npm run preview` | Sirve el build de producción         |
| `npm run lint`    | Ejecuta ESLint                       |

## Estructura

```
├── public/                 # Archivos estáticos servidos tal cual (favicon, etc.)
├── src/
│   ├── main.tsx            # Punto de entrada de React
│   ├── App.tsx             # <Canvas> de R3F y composición general
│   ├── index.css           # Estilos globales (canvas a pantalla completa)
│   ├── components/
│   │   ├── canvas/         # Componentes 3D (viven dentro del <Canvas>)
│   │   └── ui/             # Componentes HTML/DOM (header, loader, overlays)
│   ├── scenes/             # Secciones del portafolio (Hero, Proyectos, Contacto…)
│   ├── hooks/              # Hooks reutilizables
│   ├── data/               # Contenido en TS (proyectos, skills, enlaces)
│   ├── utils/              # Funciones auxiliares
│   ├── types/              # Tipos compartidos
│   └── assets/
│       ├── models/         # Modelos .glb / .gltf
│       ├── textures/       # Texturas e imágenes
│       └── fonts/          # Fuentes
└── vite.config.ts          # Configuración de Vite (incluye el alias `@`)
```

### Convenciones

- **Alias `@`** apunta a `src/`: `import { Experience } from '@/components/canvas/Experience'`.
- **`components/canvas`** solo contiene lo que se renderiza dentro del `<Canvas>`; **`components/ui`** lo que va en el DOM. No se mezclan.
- **`scenes/`** agrupa componentes 3D por sección; cada escena compone piezas de `components/canvas`.
- **Contenido separado del código**: textos y listas de proyectos van en `data/`, no dentro de los componentes.
- **Assets**: los que se importan desde código van en `src/assets/`; los que se referencian por URL fija, en `public/`.
- Las carpetas vacías contienen un `.gitkeep`; se puede borrar cuando tengan archivos.

## Estado actual

Concepto: **POV desktop**. La cámara es la vista de una persona sentada frente a un escritorio, y cada objeto sobre él lleva a una sección del portafolio.

- `DesktopModel.tsx` carga `assets/models/desktop-model.glb` (el escritorio base, exportado en cm; se escala a metros).
- `CameraRig.tsx` fija el punto de vista y añade un leve parallax con el mouse.
- `Experience.tsx` compone luces, cámara y modelo.

## Próximos pasos

- Colocar objetos sobre el escritorio (monitor, teléfono, libreta…) como componentes en `components/canvas`.
- Hacerlos interactivos: al hacer clic, la cámara se acerca y se muestra la sección (proyectos, sobre mí, contacto).
- Definir los objetos y su contenido en `data/`.
- Iluminación y ambiente definitivos.
