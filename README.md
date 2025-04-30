# Prueba Técnica:

Generador Dinámico de Formularios con Validaciones Avanzadas y Vuetify 3

## Objetivo

Desarrollar una aplicación en Vue 3 utilizando TypeScript y Vuetify 3 que
interprete un JSON de configuración para generar formularios de manera
dinámica. El módulo debe:

1. Implementar validaciones avanzadas, incluyendo validaciones
   condicionales basadas en el valor de otros campos.
2. Permitir agregar nuevos campos al JSON inicial y que éstos se reflejen
   automáticamente en el formulario.
3. Permitir añadir nuevas reglas de validación (por ejemplo, validación de
   que un email pertenezca a un dominio corporativo, validación de que un
   número esté dentro de un rango determinado, validación de que dos
   campos coincidan, etc.) sin necesidad de tocar la lógica de generación de
   componentes.

# Proceso

El proceso en primera medida fue un poco caótico, ya que si bien estaba familiarizado con typescript por su cercanía con javascript, había trabajado con proyectos en React. Si bien son similares, las diferencias son sustanciales al momento de plantear y procesar los datos, entre las que puedo mencionar e encuentran el sistema propio de plantillas, las etructuración de los componente, la ectructura del proyecto/carpetas, la nomenclatura de muchas funcionalidades en general, etc.
Otra cosa importante a mencionar fue que no poseía experiencia en el manejo de storages dentro apps, además de tomar la desición de crear un pequeño editor de JSON, para facilitar la interoperabilidad entre ambas "vistas" (formulario dinámico + Editor de JSON), lo que hizo un poco cuesta arriba mi avance.

# Desarrollo (lineas generales)

Opté por una interfaz de tipo One imple Page que separe el formulario del la edición, donde solo se habilite la visualización del formulario una vez que el Archivo JSON ha sido validado. Esto es en función de la posibilidad de editar los campos de van en el formulario de forma dinámica.
Esto quiere decir, que e ha comprobado que es un archivo JSON válido.

Se tomó en cuenta el almacenamiento en torage de lo datos utilizados. Básicamente un arreglo para procear el JSON y ordenar básicamente las reglas de validación (rules), una variable la visibilidad del pinner y otra para almacenar el contenido del formulario.

# Finalización

El presente proyecto demuestra correctamente mis habilidades de desarrollo, ya que en menos de una semana aprendí las bases de Vue con un proyecto muy interesante. La App está funcional y las correcciones que le quedan las voy a ir trabajando con los issues.

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
