# Example Truffle API

Este proyecto es un ejemplo de cómo interactuar con un contrato inteligente de Ethereum utilizando Truffle y una API construida con Node.js y Express.

## Requisitos

- Node.js v14.x o superior
- npm v6.x o superior
- Truffle v5.x
- Ganache CLI o Ganache GUI para un entorno local de Ethereum

## Instalación de Truffle

Para instalar Truffle globalmente en tu sistema, ejecuta el siguiente comando:

```sh
npm install -g truffle
```

## Configuración del proyecto

1. Clona el repositorio:

```sh
git clone https://github.com/javmo/example-truffle-api.git
```

2. Instala las dependencias del proyecto:
```sh
cd example-truffle-api
npm install
```

3. Inicia Ganache CLI o Ganache GUI para tener una instancia local de Ethereum funcionando.

4. Configura el archivo .env con las variables de entorno necesarias:
```sh 
URI_PROVIDER=http://localhost:7545 # Cambiar a la dirección de tu proveedor Ethereum
```

5. Realiza la migración del contrato inteligente:
```sh 
truffle migrate --reset
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

## Estructura de carpetas
```
example-truffle-api/
├─ build/             # Carpeta generada automáticamente con los contratos compilados
├─ contracts/         # Contratos inteligentes de Solidity
├─ migrations/        # Scripts de migración de Truffle
├─ src/               # Código fuente de la API
│ ├─ controllers/     # Controladores para manejar las solicitudes de la API
│ ├─ routes/          # Definición de rutas para la API
│ ├─ services/        # Servicios utilizados en la aplicación, como la configuración de web3
│ └─ app.js           # Archivo principal de la aplicación de Express
├─ test/              # Pruebas del contrato inteligente
├─ .env.example       # Ejemplo de archivo de variables de entorno
├─ .gitignore         # Archivo de configuración de Git para ignorar archivos y carpetas específicas
├─ package.json       # Dependencias y configuración del proyecto
├─ README.md          # Documentación del proyecto (este archivo)
└─ truffle-config.js  # Configuración de Truffle
```

