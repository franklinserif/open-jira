# Open-Jira

Open-Jira es una aplicación de seguimiento de proyectos y problemas inspirada en el software JIRA. Está construida con Next.js, Docker y MongoDB.

## Requisitos previos

- [Node.js](https://nodejs.org/en/) (v14 o superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Informacionción adicional

- MongoDB URL Local

```bash
mongodb://localhost:27017/entriesdb
```

## Configurar variables de enternos

Renombrar el archivo **.env.template** a **.env**

## Llenar la base de datos con datos de pruebas

Llamar

```
http://localhost:3000/api/seed
```

## Instalación

1. First list

   ```bash
   git clone https://github.com/<usuario>/open-jira.git
    cd open-jira
   ```

2. Instalar las dependencias del proyecto:

   ```bash
    npm install
   ```

3. Crear un archivo .env.local en la raíz del proyecto con las variables de entorno necesarias:

   ```bash
    MONGODB_URI=mongodb://mongo:27017/openjira-db
    NEXT_PUBLIC_API_URL=http://localhost:3000/api/
   ```

4. Construir y ejecutar los contenedores Docker para la base de datos MongoDB:

   ```bash
   docker-compose up -d --build mongo-db mongo-express-admin
   ```

5. Iniciar la aplicación en modo desarrollo:

   ```bash
   docker-compose up -d --build mongo-db mongo-express-admin
   ```

   La aplicación estará disponible en http://localhost:3000.

## Contribución

Agradecemos cualquier contribución a este proyecto, ya sea mediante reporte de errores, sugerencias o mejoras al código.

1. Realice un fork del repositorio.
2. Cree una nueva rama para sus cambios (git checkout -b feature nombre-de-la-nueva-caracteristica).
3. Haga commit de sus cambios (git commit -m 'Descripción breve').
4. Haga push a su rama (git push origin feature nombre-de-la-nueva-caracteristica).
5. Cree un nuevo Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulte el archivo LICENSE para más detalles.
