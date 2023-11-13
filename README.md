This Nestjs backend application is being built following:-

- Hexagonal-Architecture (application, domain, infrastructure)
- CQRS pattern 

for highly modular and testable codebase and improving performance and scalability.

For running it locally: 

- Clone this repository:
```
git clone https://github.com/syedfawzulazim/Nestjs-CQRS-Boilerplate.git
```

- Create .env file as .env.dist file.

- Run this application locally with a single command by docker-compose: 
```
docker-compose up -d --build
```
- Run migrations by Make file:
```
make dc-db-migrations
```

The application will be live at port: 3000
and swagger at http://localhost:3000/docs/
