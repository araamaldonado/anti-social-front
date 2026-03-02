# Anti-Social Front-End

Front-end de la aplicación **Anti-Social**, desarrollado con **React + TypeScript + Vite**. Esta interfaz consume la API backend construida con **MongoDB (docker), Express y Mongoose**, para mostrar y permitir la interacción con usuarios, publicaciones y comentarios de una red social básica.

---

## 📌 Descripción del proyecto

Interfaz de usuario responsiva y moderna para la red social **Anti-Social**, construida con React y TypeScript.  
Se conecta a la API REST creada en el proyecto de backend con **MongoDB dockerizado**, consumiendo datos y permitiendo:

- Visualizar publicaciones
- Interactuar con comentarios
- Navegar entre vistas
- Realizar operaciones básicas de usuario

Este front-end fue desarrollado como parte del **Trabajo Práctico 2 – Interfaces de Usuario, Grupo 10**.

---

## 🚀 Tecnologías y herramientas

- **React** con **TypeScript**
- **Vite** (bundler rápido para desarrollo)
- **Bootstrap** (framework CSS)
- **Axios / fetch** para consumo de API
- HTML semántico y componentes reutilizables

---

## 🛠️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/araamaldonado/anti-social-front.git
cd anti-social-front
```
### 2. Instalar dependencias

```bash
npm install
```
### 3. Configurar backend

Este proyecto requiere que la API backend de MongoDB esté corriendo.
Cloná y levantá la API desde:

🔗 https://github.com/araamaldonado/antisocial_mongo_back

Arrancá la base de datos y el backend con Docker y npm:

```bash
docker-compose up -d
npm run dev
```
Asegurate de tener Docker instalado en tu máquina!

### 📱 Flujo de la aplicación

1- El usuario abre la app en el navegador
2- La app realiza peticiones a la API backend
3- Se muestran publicaciones y comentarios
4- Se pueden crear nuevas publicaciones o interactuar con contenido

## 😁 Desarrolladores

Proyecto frontend desarrollado originalmente en el marco del Trabajo Práctico de la materia Construcción de Interfaces de Usuario junto a:
Fausto Romay, Lautaro Farias, Maldonado Araceli Carina

Fork realizado por Araceli Maldonado con modificaciones y mejoras posteriores.
