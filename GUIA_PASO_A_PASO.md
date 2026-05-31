# Guía paso a paso para realizar la práctica CI/CD con GitHub, Jenkins, DockerHub, SonarQube y Trivy

Esta guía está escrita para una persona sin perfil informático. Sigue los pasos en orden. No inventes resultados: las capturas y enlaces finales deben salir de tu ejecución real.

## 0. Qué vas a entregar al final

Al terminar tendrás:

1. Un repositorio de GitHub con el código, el Dockerfile y el Jenkinsfile.
2. Un pipeline de Jenkins que clona el repositorio, ejecuta tests, analiza calidad, construye una imagen Docker, analiza vulnerabilidades y publica la imagen en DockerHub.
3. Una imagen publicada en DockerHub.
4. Capturas reales de GitHub, Jenkins, tests, logs, SonarQube, Trivy y DockerHub.
5. Un informe individual completado con tus enlaces y evidencias.

## 1. Cuentas y programas que necesitas

### 1.1. Crear cuenta de GitHub

URL: https://github.com/

1. Entra en la URL.
2. Pulsa **Sign up**.
3. Escribe tu correo, contraseña y nombre de usuario.
4. Confirma el correo desde tu bandeja de entrada.
5. Guarda tu usuario de GitHub. Lo necesitarás para el informe.

### 1.2. Crear cuenta de DockerHub

URL: https://hub.docker.com/

1. Entra en la URL.
2. Pulsa **Sign up**.
3. Crea la cuenta.
4. Confirma el correo.
5. Guarda tu usuario de DockerHub.

### 1.3. Instalar Git

URL: https://git-scm.com/downloads

1. Entra en la URL.
2. Selecciona tu sistema operativo: Windows, macOS o Linux.
3. Descarga el instalador.
4. Ejecuta el instalador.
5. En Windows, deja las opciones por defecto salvo que sepas lo que estás cambiando.
6. Al terminar, abre una terminal:
   - Windows: menú Inicio > escribe **cmd** > Enter.
   - macOS: abre **Terminal**.
   - Linux: abre **Terminal**.
7. Escribe:

```bash
git --version
```

Si aparece una versión, Git está instalado.

### 1.4. Instalar Node.js

URL: https://nodejs.org/

1. Entra en la URL.
2. Descarga la versión **LTS**.
3. Instálala con las opciones por defecto.
4. Abre una terminal y escribe:

```bash
node --version
npm --version
```

Si aparecen dos versiones, Node.js y npm están instalados.

### 1.5. Instalar Docker Desktop

URL: https://www.docker.com/products/docker-desktop/

1. Entra en la URL.
2. Descarga Docker Desktop para tu sistema operativo.
3. Instálalo.
4. Abre Docker Desktop.
5. Espera hasta que indique que Docker está funcionando.
6. Abre una terminal y escribe:

```bash
docker --version
```

Si aparece una versión, Docker está instalado.

### 1.6. Instalar Jenkins

URL: https://www.jenkins.io/download/

1. Entra en la URL.
2. Selecciona tu sistema operativo.
3. Descarga la versión **LTS**.
4. Instala Jenkins.
5. Cuando termine, abre el navegador y entra en:

```text
http://localhost:8080
```

6. Jenkins pedirá una contraseña inicial.
7. Copia la ruta que aparece en pantalla. En Windows suele parecerse a:

```text
C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword
```

8. Abre ese archivo, copia la contraseña y pégala en Jenkins.
9. Pulsa **Continue**.
10. Selecciona **Install suggested plugins**.
11. Crea un usuario administrador. Guarda usuario y contraseña.
12. Cuando Jenkins pregunte por la URL, deja normalmente:

```text
http://localhost:8080/
```

13. Pulsa **Save and Finish**.

### 1.7. Instalar Trivy

URL: https://trivy.dev/latest/getting-started/installation/

En Windows, una forma sencilla es usar PowerShell:

1. Abre PowerShell como administrador.
2. Escribe:

```powershell
winget install AquaSecurity.Trivy
```

3. Cierra y vuelve a abrir la terminal.
4. Comprueba:

```bash
trivy --version
```

Si aparece una versión, Trivy está instalado.

### 1.8. Tener SonarQube disponible

Para esta práctica puedes usar SonarQube local mediante Docker.

1. Abre Docker Desktop.
2. Abre una terminal.
3. Ejecuta:

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
```

4. Espera uno o dos minutos.
5. Entra en:

```text
http://localhost:9000
```

6. Usuario inicial: `admin`.
7. Contraseña inicial: `admin`.
8. SonarQube te pedirá cambiar la contraseña. Cámbiala y guárdala.

## 2. Preparar el proyecto en tu ordenador

### 2.1. Descomprimir el ZIP del código

1. Localiza el archivo `practica-cicd-codigo-jenkinsfile.zip`.
2. Haz clic derecho sobre él.
3. Selecciona **Extraer todo** o **Extract all**.
4. El resultado será una carpeta llamada `practica-cicd`.
5. Entra en esa carpeta y comprueba que ves archivos como:
   - `package.json`
   - `Dockerfile`
   - `Jenkinsfile`
   - `sonar-project.properties`
   - carpeta `src`
   - carpeta `test`

### 2.2. Probar que el proyecto funciona antes de subirlo

1. Abre una terminal dentro de la carpeta `practica-cicd`.
   - En Windows: entra en la carpeta, haz clic en la barra superior donde aparece la ruta, escribe `cmd` y pulsa Enter.
2. Ejecuta:

```bash
npm install
npm test
```

3. Si los tests terminan en verde, haz una captura.
4. Guarda la captura con un nombre claro, por ejemplo:

```text
01_tests_locales.png
```

## 3. Crear el repositorio en GitHub

URL: https://github.com/

1. Entra en GitHub.
2. Inicia sesión.
3. Pulsa el botón **+** de la esquina superior derecha.
4. Selecciona **New repository**.
5. En **Repository name**, escribe:

```text
agile-devops-practica
```

6. En **Description**, puedes escribir:

```text
Práctica académica de Agile Developments and Software DevOps con Jenkins, DockerHub, SonarQube y Trivy.
```

7. Selecciona **Public** si quieres que el profesor pueda acceder sin permisos especiales. Si seleccionas **Private**, tendrás que dar acceso al profesor.
8. No marques todavía **Add a README file**, porque el proyecto ya trae README.
9. Pulsa **Create repository**.
10. GitHub te mostrará una pantalla con comandos. Déjala abierta.

## 4. Subir el proyecto a GitHub

1. Abre una terminal dentro de la carpeta `practica-cicd`.
2. Escribe estos comandos, sustituyendo `TU_USUARIO_GITHUB` por tu usuario real:

```bash
git init
git add .
git commit -m "chore: entrega inicial de la practica cicd"
git branch -M main
git remote add origin https://github.com/TU_USUARIO_GITHUB/agile-devops-practica.git
git push -u origin main
```

3. Vuelve a GitHub y actualiza la página.
4. Comprueba que aparecen tus archivos.
5. Haz una captura de la pantalla del repositorio.
6. Guarda la URL del repositorio. Tendrá este formato:

```text
https://github.com/TU_USUARIO_GITHUB/agile-devops-practica
```

## 5. Simular trabajo ágil con rama y pull request

La práctica pide usar GitHub como si trabajaras en equipo. Aunque trabajes solo, puedes demostrarlo con una rama y un pull request.

### 5.1. Crear una rama

En la terminal, dentro de `practica-cicd`, escribe:

```bash
git checkout -b feature/documentacion-pipeline
```

### 5.2. Hacer un pequeño cambio real

1. Abre el archivo `README.md`.
2. Añade una línea sencilla, por ejemplo:

```text
Este proyecto se ha desarrollado siguiendo un flujo de trabajo basado en ramas, commits y pull requests.
```

3. Guarda el archivo.
4. En la terminal, escribe:

```bash
git add README.md
git commit -m "docs: ampliar descripcion del flujo agile"
git push -u origin feature/documentacion-pipeline
```

### 5.3. Crear el pull request en GitHub

1. Entra en tu repositorio de GitHub.
2. GitHub normalmente mostrará un aviso amarillo indicando que has subido una nueva rama.
3. Pulsa **Compare & pull request**.
4. En el título escribe:

```text
docs: ampliar descripcion del flujo agile
```

5. En la descripción escribe:

```text
Se añade una breve explicación del flujo de trabajo seguido con ramas, commits y pull request.
```

6. Pulsa **Create pull request**.
7. Haz una captura del pull request abierto.
8. Pulsa **Merge pull request**.
9. Pulsa **Confirm merge**.
10. Haz una captura del pull request ya fusionado.
11. En tu terminal, vuelve a la rama principal:

```bash
git checkout main
git pull origin main
```

## 6. Crear el repositorio de DockerHub

URL: https://hub.docker.com/

1. Entra en DockerHub.
2. Inicia sesión.
3. En el menú superior o lateral, selecciona **Repositories**.
4. Pulsa **Create repository**.
5. En **Repository name**, escribe:

```text
agile-devops-practica
```

6. En visibilidad, selecciona **Public** para que el profesor pueda verlo fácilmente.
7. Pulsa **Create**.
8. Guarda la URL del repositorio. Tendrá un formato parecido a:

```text
https://hub.docker.com/r/TU_USUARIO_DOCKERHUB/agile-devops-practica
```

## 7. Crear un token de DockerHub para Jenkins

No uses tu contraseña personal en Jenkins. Usa un token.

1. En DockerHub, pulsa tu avatar o icono de usuario, arriba a la derecha.
2. Selecciona **Account settings**.
3. Busca **Personal access tokens** o **Security**.
4. Pulsa **Generate new token**.
5. Ponle un nombre, por ejemplo:

```text
jenkins-token-practica
```

6. Selecciona permisos de lectura/escritura si DockerHub te pregunta.
7. Pulsa **Generate**.
8. Copia el token y guárdalo temporalmente en un sitio seguro. DockerHub puede no volver a mostrarlo.

## 8. Cambiar el Jenkinsfile con tu usuario de DockerHub

1. Abre el archivo `Jenkinsfile`.
2. Busca esta línea:

```groovy
DOCKERHUB_REPO = 'TU_USUARIO_DOCKERHUB/agile-devops-practica'
```

3. Sustituye `TU_USUARIO_DOCKERHUB` por tu usuario real. Ejemplo:

```groovy
DOCKERHUB_REPO = 'julio123/agile-devops-practica'
```

4. Guarda el archivo.
5. Sube el cambio a GitHub:

```bash
git add Jenkinsfile
git commit -m "ci: configurar repositorio dockerhub"
git push origin main
```

## 9. Configurar Jenkins para usar DockerHub

URL local de Jenkins:

```text
http://localhost:8080
```

1. Entra en Jenkins.
2. En el menú izquierdo, pulsa **Manage Jenkins**.
3. Busca **Credentials**.
4. Pulsa **System**.
5. Pulsa **Global credentials (unrestricted)**.
6. Pulsa **Add Credentials**.
7. En **Kind**, selecciona **Username with password**.
8. En **Username**, escribe tu usuario de DockerHub.
9. En **Password**, pega el token de DockerHub.
10. En **ID**, escribe exactamente:

```text
dockerhub-credentials
```

11. En **Description**, puedes escribir:

```text
Credenciales DockerHub para publicar imagen de la practica
```

12. Pulsa **Create**.

## 10. Configurar Jenkins para usar SonarQube

### 10.1. Crear token en SonarQube

1. Entra en:

```text
http://localhost:9000
```

2. Inicia sesión.
3. Pulsa tu icono de usuario, arriba a la derecha.
4. Selecciona **My Account**.
5. Entra en **Security**.
6. En **Generate Tokens**, escribe:

```text
jenkins-token
```

7. Pulsa **Generate**.
8. Copia el token.

### 10.2. Guardar token de SonarQube en Jenkins

1. En Jenkins, entra en **Manage Jenkins**.
2. Entra en **Credentials**.
3. Pulsa **System**.
4. Pulsa **Global credentials (unrestricted)**.
5. Pulsa **Add Credentials**.
6. En **Kind**, selecciona **Secret text**.
7. En **Secret**, pega el token de SonarQube.
8. En **ID**, escribe:

```text
sonarqube-token
```

9. Pulsa **Create**.

### 10.3. Instalar plugin de SonarQube en Jenkins

1. En Jenkins, entra en **Manage Jenkins**.
2. Pulsa **Plugins**.
3. Entra en **Available plugins**.
4. Busca:

```text
SonarQube Scanner
```

5. Marca el plugin.
6. Pulsa **Install**.
7. Si Jenkins pide reiniciar, acepta reiniciar cuando no haya trabajos ejecutándose.

### 10.4. Dar de alta el servidor SonarQube en Jenkins

1. En Jenkins, entra en **Manage Jenkins**.
2. Pulsa **System**.
3. Busca la sección **SonarQube servers**.
4. Marca **Environment variables** si aparece.
5. Pulsa **Add SonarQube**.
6. En **Name**, escribe exactamente:

```text
SonarQube
```

7. En **Server URL**, escribe:

```text
http://localhost:9000
```

8. En **Server authentication token**, selecciona `sonarqube-token`.
9. Pulsa **Save**.

## 11. Crear el pipeline en Jenkins

1. Entra en Jenkins:

```text
http://localhost:8080
```

2. Pulsa **New Item**.
3. En **Enter an item name**, escribe:

```text
agile-devops-practica
```

4. Selecciona **Pipeline**.
5. Pulsa **OK**.
6. Baja hasta la sección **Pipeline**.
7. En **Definition**, selecciona:

```text
Pipeline script from SCM
```

8. En **SCM**, selecciona:

```text
Git
```

9. En **Repository URL**, pega tu URL de GitHub:

```text
https://github.com/TU_USUARIO_GITHUB/agile-devops-practica.git
```

10. En **Branch Specifier**, escribe:

```text
*/main
```

11. En **Script Path**, deja:

```text
Jenkinsfile
```

12. Pulsa **Save**.

## 12. Ejecutar el pipeline

1. Dentro del trabajo `agile-devops-practica`, pulsa **Build Now**.
2. En la parte izquierda aparecerá un número de ejecución, por ejemplo `#1`.
3. Pulsa sobre ese número.
4. Pulsa **Console Output**.
5. Observa cómo Jenkins ejecuta las fases.
6. Haz capturas de:
   - Vista general del pipeline.
   - Console Output donde se vea `npm test`.
   - Console Output donde se vea `docker build`.
   - Console Output donde se vea `trivy image`.
   - Console Output donde se vea `docker push`.

## 13. Comprobar la imagen en DockerHub

1. Entra en DockerHub:

```text
https://hub.docker.com/
```

2. Entra en **Repositories**.
3. Abre `agile-devops-practica`.
4. Comprueba que aparecen etiquetas como:

```text
latest
1
```

5. Haz una captura donde se vea la imagen publicada.

## 14. Comprobar el análisis de SonarQube

1. Entra en:

```text
http://localhost:9000
```

2. Busca el proyecto `agile-devops-practica`.
3. Entra en el proyecto.
4. Haz una captura del resumen de calidad.
5. No inventes el resultado: copia en el informe lo que aparezca realmente.

## 15. Qué hacer si Jenkins falla

### Error: `npm` no se reconoce

Solución:

1. Comprueba que Node.js está instalado:

```bash
node --version
npm --version
```

2. Reinicia el ordenador.
3. Reinicia Jenkins.
4. Ejecuta de nuevo el pipeline.

### Error: Docker no funciona en Jenkins

Solución:

1. Abre Docker Desktop.
2. Espera a que Docker esté activo.
3. En una terminal prueba:

```bash
docker ps
```

4. Reinicia Jenkins.
5. Ejecuta de nuevo el pipeline.

### Error: Trivy encuentra vulnerabilidades HIGH o CRITICAL

Esto no significa que hayas hecho mal el trabajo. Significa que Trivy ha detectado vulnerabilidades. Tienes dos opciones:

1. Documentar el problema en el informe y explicar que Trivy ha bloqueado el pipeline por seguridad.
2. Cambiar la imagen base del Dockerfile por una versión más segura y volver a ejecutar.

No borres Trivy ni ocultes el resultado.

### Error: SonarQube no conecta

Solución:

1. Comprueba que SonarQube está funcionando:

```text
http://localhost:9000
```

2. Comprueba que en Jenkins el servidor se llama exactamente `SonarQube`.
3. Comprueba que el token está guardado como `sonarqube-token`.
4. Ejecuta de nuevo el pipeline.

## 16. Capturas mínimas que debes incluir

Guarda las capturas en `docs/capturas` con nombres claros:

1. `01_github_repositorio.png`: repositorio en GitHub.
2. `02_github_pull_request_abierto.png`: pull request abierto.
3. `03_github_pull_request_mergeado.png`: pull request fusionado.
4. `04_jenkins_pipeline.png`: pipeline de Jenkins.
5. `05_jenkins_tests.png`: logs de tests.
6. `06_jenkins_docker_build.png`: logs de construcción Docker.
7. `07_jenkins_trivy.png`: logs de Trivy.
8. `08_jenkins_docker_push.png`: logs de subida a DockerHub.
9. `09_dockerhub_imagen.png`: imagen publicada en DockerHub.
10. `10_sonarqube_resultado.png`: resultado del análisis de SonarQube.

## 17. Enlaces que debes pegar en el informe

En el informe sustituye los campos pendientes por tus enlaces reales:

```text
Repositorio GitHub: https://github.com/TU_USUARIO_GITHUB/agile-devops-practica
Imagen DockerHub: https://hub.docker.com/r/TU_USUARIO_DOCKERHUB/agile-devops-practica
```

## 18. Paquete final de entrega

Tu entrega final debe contener:

1. Código fuente completo.
2. `Jenkinsfile`.
3. `Dockerfile`.
4. Informe individual completado.
5. Capturas reales.
6. Logs reales si el profesor los pide.
7. Enlace de GitHub.
8. Enlace de DockerHub.

Antes de entregar, abre el ZIP final y comprueba que realmente contiene todo.
