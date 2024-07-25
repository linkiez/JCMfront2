pipeline {
    agent any
    environment {
        REV_LIST = ''
        LATEST_TAG = ''
        BASE_IMAGE = 'linkiez/jcmfrontend'
        CHROME_BIN = '/usr/bin/google-chrome'
    }
    stages {
        stage('Install Chrome') {
            steps {
                script {
                    installChrome()
                }
            }
        }
        stage('Preparation') {
            steps {
                script {
                    prepareWorkspace()
                }
            }
        }
        stage('Verify Tag') {
            steps {
                script {
                    verifyTag()
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    dockerImageBuild()
                }
            }
        }
        stage('Deploy Production') {
            steps {
                script {
                    deployProduction()
                }
            }
        }
        stage('Push to Registry') {
            steps {
                script {
                    pushToRegistry()
                }
            }
        }
    }
}

void installChrome() {
    sh '''
        if ! [ -x "$(command -v google-chrome)" ]; then
            wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
            sudo apt-get install -y ./google-chrome-stable_current_amd64.deb
            rm google-chrome-stable_current_amd64.deb
        fi
    '''
}

void prepareWorkspace() {
    deleteDir() // This deletes the workspace directory
}

void verifyTag() {
    // Clone your repository and fetch tags
    sh 'git clone https://github.com/linkiez/JCMfront2 && cd JCMfront2 && git fetch --tags'
    // Fetch the latest tag
    dir('JCMfront2') {
        REV_LIST = sh(script: 'git rev-list --tags --max-count=1', returnStdout: true).trim()
        LATEST_TAG = sh(script: "git describe --tags ${REV_LIST}", returnStdout: true).trim()
    }
    containerExists = false // Assume container does not exist initially
    try {
        sh(script: "docker inspect --format='{{.State.Running}}' JCMFrontend", returnStdout: true).trim()
        containerExists = true
    } catch (e) {
        echo 'No existing container found. Proceeding with deployment.'
    }
    if (containerExists) {
        containerImage = sh(
            script: 'docker inspect -f "{{.Config.Image}}" JCMFrontend',
            returnStdout: true
        ).trim()
        containerTag = containerImage.tokenize(':')[1]
        if (containerTag == LATEST_TAG) {
            error "Container with tag ${LATEST_TAG} already exists and is running. Stopping pipeline."
        } else {
            echo 'Container exists but with a different tag. Proceeding.'
        }
    }
}

void dockerImageBuild() {
    dir('JCMfront2') {
        retry(3) {
            // Check if the Docker image already exists and remove it
            imageExists = sh(
                script: "docker images -q ${BASE_IMAGE}:${LATEST_TAG}",
                returnStdout: true
            ).trim()
            if (imageExists) {
                sh "docker rmi ${BASE_IMAGE}:${LATEST_TAG}"
                echo "Existing Docker image ${BASE_IMAGE}:${LATEST_TAG} removed."
            }
            // Build the Docker image
            sh "docker build . -t ${BASE_IMAGE}:${LATEST_TAG}"
        }
    }
}

void deployProduction() {
    // Remove Production Container if it exists
    sh 'docker rm -f JCMFrontend || true'
    // Proceed with deployment of the main container
    withCredentials([string(credentialsId: 'SSL', variable: 'urlSSL')]) {
        docker.image("${BASE_IMAGE}:${LATEST_TAG}").run(
            "--name JCMFrontend --volume ${urlSSL}:/app/ssl --network NW_JCMMETAIS " +
            '--ip 172.19.0.4 -p 40001:80 -p 40002:443 --restart always'
        )
    }
}

void pushToRegistry() {
    docker.withRegistry('https://index.docker.io/v1/', '902264b9-7caf-4364-872d-0148f17a72e7') {
        docker.image("${BASE_IMAGE}:${LATEST_TAG}").push()
    }
}
