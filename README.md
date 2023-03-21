# Example Truffle API

Este proyecto es un ejemplo de cómo interactuar con un contrato inteligente de Ethereum utilizando Truffle y una API construida con Node.js y Express.

## Requisitos

- Node.js v14.x o superior
- npm v6.x o superior
- Truffle v5.x
- Ganache CLI o Ganache GUI para un entorno local de Ethereum

## Configuración del proyecto

1. Clona el repositorio:

```sh
git clone https://github.com/javmo/example-truffle-api.git
```

2. Instala las dependencias del proyecto:
cd example-truffle-api
```sh npm install
```

3. Inicia Ganache CLI o Ganache GUI para tener una instancia local de Ethereum funcionando.

4. Configura el archivo .env con las variables de entorno necesarias:
```sh URI_PROVIDER=http://localhost:7545 # Cambiar a la dirección de tu proveedor Ethereum
```

5. Realiza la migración del contrato inteligente:
```sh truffle migrate --reset
```

## Ejecución de la API
Para iniciar la API, ejecuta el siguiente comando:

```sh
npm start
```

La API estará disponible en http://localhost:3000.

## Rutas de la API
- `GET /api/accounts`: Devuelve todas las cuentas.
- `POST /api/accounts`: Agrega una nueva cuenta.
- `GET /api/accounts/:name`: Devuelve una cuenta por su nombre.

