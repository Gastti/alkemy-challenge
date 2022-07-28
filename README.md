# Disney API - Alkemy Challenge
Hola, mi nombre es Gastón Gutierrez y esta es mi resolución al challenge de Backend con Node Js propuesto en la plataforma de Alkemy.

Hice el deployment de la API en Heroku y la base de datos esta en Hostinger para que todo pueda ser testeado con mas facilidad. Todos los Endpoints estan documentados en Postman, acá abajo dejo el enlace.

https://www.getpostman.com/collections/0566ac15f19562ad8b5e

En caso de que el enlace no funcione, debajo están los endpoints.

Muchas gracias por su tiempo. 

Autentificación
---
- Registro
```
https://alkemy-challenge-gastti.herokuapp.com/auth/register
```

- Inicio de Sesión
- Es necesario iniciar sesión para obtener el token ya que la mayoria de los endpoints lo necesitan mediante la key "token" en los headers.
```
https://alkemy-challenge-gastti.herokuapp.com/auth/login
```

Personajes
---
- Crear / Listar
```
https://alkemy-challenge-gastti.herokuapp.com/characters
```

- Listar con Detalles
```
https://alkemy-challenge-gastti.herokuapp.com/characters/:id
```

- Editar / Eliminar
```
https://alkemy-challenge-gastti.herokuapp.com/characters/:id
```

- Agregar Película
```
https://alkemy-challenge-gastti.herokuapp.com/characters/:id/addmovie/:id
```

Películas
---
- Crear / Listar
```
https://alkemy-challenge-gastti.herokuapp.com/movies
```

- Listar con Detalles
```
https://alkemy-challenge-gastti.herokuapp.com/movies/:id
```

- Editar / Eliminar
```
https://alkemy-challenge-gastti.herokuapp.com/movies/:id
```

Géneros
---
- Crear / Listar
```
https://alkemy-challenge-gastti.herokuapp.com/genres
```
