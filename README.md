# &#129302; Discord QR Bot
----
Un bot de discord que proporciona un código QR dada una **dirección url**, o el **nombre de usuario** del que invoca el comando.

Si quieres añadir este bot a tu server accede al siguiente [link](https://discord.com/api/oauth2/authorize?client_id=1046842092208525312&permissions=0&scope=applications.commands%20bot)

#### TABLA DE CONTENIDOS
----
- [Comandos](#comandos)
- [Código](#código)
- [Instalar](#instalar)
  - [Node](#node)
  - [Docker](#docker)
- [Usar](#usar)

#### COMANDOS
---
Una vez ya hayas invitado al bot a tu servidor de discord, podrás utilizar los comandos. 
Para soliciar los códigos QR, se pide al bot mediante comandos slash `/`

- `/url2qr http://example.com Red`  
En el comando `/url2qr` deberás introducir seguidamente una dirección web válida y se abrirá un desplegable para que elijas el color que quiras que tenga el código qr.

- `/user2qr`
El bot te devolverá un código que representará tu nombre de usuario.

#### CÓDIGO
---
De las varias [librerías de terceros](https://discord.com/developers/docs/topics/community-resources#libraries-discord-libraries) publicadas en la documentación de discord, he elegido la librería [discord.js](https://discord.js.org/). Se ve una librería solida y muy activa en github.
Este bot se ha programado con [Typescript](https://www.typescriptlang.org/), creando un entorno de tipado seguro.
Para la creación de los códigos qr se hace uso de la libreria [node-qrcode](https://github.com/soldair/node-qrcode).
Se cuenta con [Jest](https://jestjs.io/) como framework para el desarrollo de tests.

La estructura de carpetas del código es la siguiente:

root
&nbsp;&nbsp;|----src/
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---- commands /
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---- utils /
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---- types /
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---- config.ts
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---- deployCommands.ts
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---- eventHandlers.ts
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|---- index.ts
&nbsp;&nbsp;|----test/

El código del proyecto está en la carpeta **src/**, y el archivo que lo incia es **index.ts**. En este arhivo se efectua el login y regitro de eventos a los que escucharemos. 

Estos eventos, utilizan callbacks como parametro y se encuentran en el archivo **src/eventHandlers.ts** 
Tambien registramos los comandos que utilizaremos extendiendo la clase Client con la propiedad commands. Los comandos se encuentran en la carpeta **src/commands/**, cada comando es un archivo.

Las funciones de utilidad que se utilizan en los comandos se encuentran en la carpeta **src/utils/**.

El script para registrar los comandos en el bot se encuentra en **src/deployCommands.ts**

En el archivo **src/config.ts**, se manejan las variables de entorno. Hará que no nos deje compilar si falta alguna de ellas.

Los test se encuentran en la carpeta **test/**
#### INSTALAR
----
Para desarrollar a partir de este proyecto puedes hacerlo de 2 formas, o directamente con node corriendo en tu máquina o hacer uso de docker si lo prefieres.

***Importante*** : Debes crear una aplicación en el [portal de desarrollo de Discord](https://discord.com/developers/applications). De esta aplicación necesitarás el **bot token** y el **client id**, que deberás introducir en un archivo **.env**. Tienes una plantilla en el archivo _example.env_.

Descarga el código fuente
`git clone https://github.com/davidfers/discord-qr-bot.git`

##### Node
Debes tener Node 16.11 o mayor.
Ejecutar `yarn` o `npm install`

##### Docker
Construir la imagen
`docker build --tag discord-qr-bot .`
Iniciar contenedor
`docker run --name discord-qr-bot --env-file .env -v ${PWD}:/app discord-qr-bot`
o con Docker Compose
`docker-compose up -d`

#### USO
----
Para registrar los comandos en el bot ejecutar el comando
`yarn deploy-commands` o `npm run deploy-commands`
Inicia el bot en modo desarrollo haciendo uso de [ts-node-dev](https://github.com/wclr/ts-node-dev) para contar con reincios automáticos cada vez que modificamos un archivo.
`yarn dev` o `npm run dev`
En docker 
`docker-compose up -d`

Una vez acabado con el desarrollo compilar con
`yarn build` o `npm run build`

Se creará una carpeta dist/ con el código compilado a javascript y podrás inciar el bot con el comando
`yarn start`, `npm start` o directamente `node dist/index.js`

##### TESTS
Este proyecto cuenta con tests unitarios para testear funciones utilitarias o el comportamiento de los comandos. 
Ejecutar los tests con
`yarn test` o `npm run test`
