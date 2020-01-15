pipeline {

    environment {
        dockerImageName = "botmasterzzz-yourapi-frontend"
        registryUrl = "https://rusberbank.ru"
        registry = "rusberbank.ru/${dockerImageName}"
        registryCredential = "ourHubPwd"
        dockerExternalPort = "0.0.0.0:8040"
        dockerInternalPort = "80"
        remoteHost = "5.189.146.63"
    }

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checkout'
            }
        }

        stage('NPM Dependencies Install') {
            steps {
                echo 'Installing dependencies'
                nodejs('Node 10.15.0 LTS') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Testing cases'
                nodejs('Node 10.15.0 LTS') {
                    sh 'npm run-script test'
                }
            }
        }

        stage('Build NPM') {
            steps {
                echo 'Building npm'
                nodejs('Node 10.15.0 LTS') {
                    sh 'npm run-script build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building image: $registry:$BUILD_NUMBER"
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Pushing image: $registry:$BUILD_NUMBER"
                script {
                    docker.withRegistry(registryUrl, registryCredential) {
                        dockerImage.push()
                    }

                }
            }
        }

        stage('Remove Unused Docker Image') {
            steps {
                echo "Removing image: $registry:$BUILD_NUMBER"
                sh "docker rmi --force $registry:$BUILD_NUMBER"
                sshagent(credentials: ['second']) {
                    echo "Removing remote image: $registry:$currentBuild.previousBuild.getNumber()"
                    sh "ssh root@$remoteHost docker rmi --force $registry:$currentBuild.previousBuild.getNumber()"
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(credentials: ['second']) {
                    echo '## Deploy remote ##'
                    echo "Stopping docker container: $dockerImageName"
                    sh "ssh root@$remoteHost docker container ls -a -f name=$dockerImageName -q | ssh root@$remoteHost xargs --no-run-if-empty docker container stop"
                    echo "Removing docker container: $dockerImageName"
                    sh "ssh root@$remoteHost docker container ls -a -f name=$dockerImageName -q | ssh root@$remoteHost xargs -r docker container rm"
                    echo "Running docker image: $registry:$BUILD_NUMBER"
                    script {
                        docker.withRegistry(registryUrl, registryCredential) {
                            sh "ssh root@$remoteHost docker run -v /etc/localtime:/etc/localtime --name $dockerImageName -d -p $dockerExternalPort:$dockerInternalPort --restart always $registry:$BUILD_NUMBER"
                        }
                    }
                }
                sh 'printenv'
            }
        }
    }
}