pipeline {
    agent any

    environment {
        DOCKERHUB_REPO = 'juliotechsys/agile-devops-practica'
        DOCKER_IMAGE = "${DOCKERHUB_REPO}:${env.BUILD_NUMBER}"
        DOCKER_IMAGE_LATEST = "${DOCKERHUB_REPO}:latest"
    }

    stages {
        stage('Clonado del repositorio') {
            steps {
                checkout scm
            }
        }

        stage('Instalación de dependencias') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Tests automatizados') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Análisis de calidad con SonarQube') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    script {
                        if (isUnix()) {
                            sh 'npx sonar-scanner'
                        } else {
                            bat 'npx sonar-scanner'
                        }
                    }
                }
            }
        }

        stage('Construcción de imagen Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t $DOCKER_IMAGE -t $DOCKER_IMAGE_LATEST .'
                    } else {
                        bat 'docker build -t %DOCKER_IMAGE% -t %DOCKER_IMAGE_LATEST% .'
                    }
                }
            }
        }
        
        stage('Análisis de seguridad con Trivy') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'trivy image --severity HIGH,CRITICAL $DOCKER_IMAGE || true'
                    } else {
                        bat 'trivy image --severity HIGH,CRITICAL %DOCKER_IMAGE% || exit /b 0'
                    }
                }
    	    }
	}


        stage('Publicación en DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_TOKEN')]) {
                    script {
                        if (isUnix()) {
                            sh 'echo $DOCKERHUB_TOKEN | docker login -u $DOCKERHUB_USER --password-stdin'
                            sh 'docker push $DOCKER_IMAGE'
                            sh 'docker push $DOCKER_IMAGE_LATEST'
                        } else {
                            bat '''
                                docker login -u %DOCKERHUB_USER% -p %DOCKERHUB_TOKEN%
                                docker push %DOCKER_IMAGE%
                                docker push %DOCKER_IMAGE_LATEST%
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (isUnix()) {
                    sh 'docker logout || true'
                } else {
                    bat 'docker logout || exit /b 0'
                }
            }
        }
        success {
            echo 'Pipeline finalizado correctamente.'
        }
        failure {
            echo 'Pipeline fallido. Revisar logs de Jenkins, tests, SonarQube o Trivy.'
        }
    }
}
