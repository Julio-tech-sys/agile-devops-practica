# Práctica CI/CD - Agile Developments and Software DevOps

Proyecto mínimo para demostrar un flujo CI/CD completo con GitHub, Jenkins, DockerHub, SonarQube y Trivy.

## Requisitos locales

- Node.js 20 o superior
- npm
- Git
- Docker
- Jenkins con acceso a Docker
- SonarQube configurado en Jenkins con el nombre `SonarQube`
- Trivy instalado en el agente de Jenkins
- Credencial de Jenkins `dockerhub-credentials` de tipo username/password

## Ejecución local

```bash
npm ci
npm test
npm start
```

La aplicación expone dos endpoints:

- `GET /`
- `GET /health`

## Construcción Docker local

```bash
docker build -t agile-devops-practica:local .
docker run --rm -p 3000:3000 agile-devops-practica:local
```

## Jenkins

Antes de ejecutar el pipeline, edita el Jenkinsfile y sustituye:

```groovy
DOCKERHUB_REPO = 'TU_USUARIO_DOCKERHUB/agile-devops-practica'
```

por tu repositorio real de DockerHub.

No se incluyen capturas reales ni logs inventados. Debes generarlos durante tu ejecución en Jenkins y guardarlos en `docs/capturas` y `docs/logs`.
