# Coloquios-app
## Requisitos 
Instalar los siguientes programas:
* Visual Studio Code
* Node

## Descarga e instalación del proyecto
1. Instalar angular cli
```
npm i @angular/cli
```
2. Instalar ionic cli
```
npm install -g @ionic/cli
```
3. Crear una carpeta
4. Abrir la terminal, entrar en el directorio de la carpeta y ejecutar el siguiente comando comando:
```
git clone https://github.com/dmveintimilla/coloquios-app.git
```
5. En la termina entrar a la carpeta que se creó del proyecto.
6. Dentro del proyecto, abrir la terminal y ejecutar el comando:
```
npm install
```
### Navegador: Ejecutar el proyecto en [localhost:8100](http://localhost:8100/)
En la terminar correr el siguiente comando:
```
ionic serve
```
### Móvil: Ejecutar el proyecto en Android o iOS
Si desea emular en el sistema operativo Android, ejecutar los siguientes comandos:
```
ionic capacitor add android
ionic capacitor sync ios
ionic capacitor copy android
```
Si desea emular en el sistema operativo iOS, ejecutar los siguientes comandos:
```
ionic capacitor add ios
ionic capacitor update
ionic capacitor copy ios
```
