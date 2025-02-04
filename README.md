# Gestion de Empleados

## Descripción
Un sistema de gestión de empleados que permite administrar información del personal de manera eficiente y organizada. Incluye funciones de autenticación (LOGIN) y operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de empleados.
## Tecnologías Utilizadas
- **Frontend:** React + Vite + TailwindCSS

## Diseño y Decisiones Tomadas

Se optó por un diseño sencillo pero intuitivo, priorizando la experiencia del usuario.
Colores Representativos
- Se asignaron colores específicos según la funcionalidad para mejorar la comprensión visual:
✅ Verde: Aceptar
✏️ Amarillo: Editar
❌ Rojo: Cancelar

- Para la apariencia general de la aplicación, se utilizó el color azul como fondo en:
La pantalla de inicio de sesión (Login).
La barra lateral (Sidebar) del dashboard.

Validación de Formularios

- Se tomó la decisión de validar todos los formularios, asegurando que cada campo sea obligatorio.
Navegación
- Se utilizó React Router DOM para gestionar la navegación dentro de la aplicación.

Manejo de Rutas No Existentes
- Al acceder a rutas inexistentes (por ejemplo: http://localhost:5173/dashboards%7D), no se mostraba nada. Para solucionar esto, se implementó una página 404 personalizada.

## Instalación
Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Descarga el repositorio y accede a la ruta central del proyecto:
   ```sh
   cd ./Gestion-Trabajadores/
   ```
2. Si es necesario, instala las dependencias con el siguiente comando:
   ```sh
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```sh
   npm run dev
   ```
4. Es importante descargar la API de Guillermo Godoy y seguir los pasos descritos en su README para asegurar el correcto funcionamiento del frontend:
   [EmployeeAPI - Guillermo Godoy](https://github.com/GuillermoGodoy/EmployeeAPI)

## Uso
Abre tu navegador y accede a `http://localhost:5173` para visualizar la aplicación en ejecución.
