pipeline {
    agent any
    environment {
        REV_LIST = ''
        LATEST_TAG = ''
    }
    stages {
        stage('Preparation') {
            steps {
                script {
                    deleteDir() // This deletes the workspace directory
                }
            }
        }
        stage('Get Latest Tag') {
            steps {
                script {
                    // Clone your repository and fetch tags
                    sh 'git clone https://github.com/linkiez/JCMfront2.git && cd JCMfront2 && git fetch --tags'
                    // Fetch the latest tag
                    dir('JCMfront2'){
                        REV_LIST = sh(script: 'git rev-list --tags --max-count=1', returnStdout: true).trim()
                        LATEST_TAG = sh(script: 'git describe --tags '+ REV_LIST, returnStdout: true).trim()
                    }

                }
            }
        }
        stage('Check If Container Exists') {
            steps {
                script {
                    def containerImage = sh(script: 'docker inspect -f "{{.Config.Image}}" JCMFrontend', returnStdout: true).trim()
                    def containerTag = containerImage.tokenize(':')[1]
                        if (containerTag == LATEST_TAG) {
                        error "Container with tag ${LATEST_TAG} already exists. Stopping pipeline."
                        }
                }
            }
        }
        stage('Copy SSL Files') {
            steps {
                // Copy the required files to the workspace
                sh 'cp -r /home/linkiez/ssl /var/lib/jenkins/workspace/JCMFrontend/JCMfront2/'
            }
        }
        stage('Build') {
            steps {
                dir('JCMfront2'){
                    // Build your application/Docker image here using the latest tag
                    sh "docker build . -t linkiez/jcmfrontend:${LATEST_TAG}"
                }
            }
        }
        stage('Deploy') {
            steps {
                dir('JCMfront2'){
                    // Replace the current running container with the new one
                    sh 'docker rm -f JCMFrontend || true'
                    sh 'docker run -d --name JCMFrontend --network NW_JCMMETAIS --ip 172.19.0.4 -p 80:80 -p 443:443 --restart always linkiez/jcmfrontend:' + LATEST_TAG
                }
            }
        }
    }
}
