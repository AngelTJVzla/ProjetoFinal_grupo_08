# Proyecto Final Grupo 08

## Instrucciones para correr el proyecto

### 1. Clonar el repositorio

```sh
git clone https://github.com/AngelTJVzla/ProjetoFinal_grupo_08.git
cd ProjetoFinal_grupo_08
```

---

### 2. Instalar dependencias

#### Backend
```sh
cd Backend
npm install
```

#### Frontend
```sh
cd ../Fronted
npm install
```

---

### 3. Ejecutar el backend

Desde la carpeta `Backend`:
```sh
node server.js
```
O si tienes nodemon:
```sh
npx nodemon server.js
```

---

### 4. Ejecutar el frontend

Desde la carpeta `Fronted`:
```sh
npm run dev
```

---

### 5. Acceder a la app
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

---

## Dependencias principales

### Backend
- express
- cors
- sqlite3

### Frontend
- react
- react-dom
- react-router-dom
- vite
- tailwindcss

---

## Notas
- El archivo `empresa.db` (base de datos SQLite) se crea automáticamente.
- No subas `empresa.db` ni `node_modules` al repositorio (ya está en `.gitignore`).
- Si tienes dudas, revisa el `.gitignore` y este README.

---

¡Listo para trabajar en equipo!
