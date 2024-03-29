pipeline {
    agent any
    environment {
        REV_LIST = ''
        LATEST_TAG = ''
        BASE_IMAGE = 'linkiez/jcmfrontend'
    }
    stages {
        stage('Preparation') {
            steps {
                script {
                    deleteDir() // This deletes the workspace directory
                }
            }
        }
        stage('Verify Tag') {
            steps {
                script {
                    // Clone your repository and fetch tags
                    sh 'git clone https://github.com/linkiez/JCMfront2 && cd JCMfront2 && git fetch --tags'
                    // Fetch the latest tag
                    dir('JCMfront2') {
                        REV_LIST = sh(script: 'git rev-list --tags --max-count=1', returnStdout: true).trim()
                        LATEST_TAG = sh(script: 'git describe --tags ' + REV_LIST, returnStdout: true).trim()
                    }
                    def containerExists = true // Assume container exists initially
                    try {
                        sh(script: "docker inspect --format='{{.State.Running}}' JCMFrontend", returnStdout: true).trim()
            } catch (Exception e) {
                        containerExists = false // If docker inspect command fails, container doesn't exist
                    }
                    if (containerExists) {
                        def containerImage = sh(script: 'docker inspect -f "{{.Config.Image}}" JCMFrontend', returnStdout: true).trim()
                        def containerTag = containerImage.tokenize(':')[1]
                        if (containerTag == LATEST_TAG) {
                            error "Container with tag ${LATEST_TAG} already exists and is running. Stopping pipeline."
                } else {
                            echo 'Container exists but with a different tag. Proceeding.'
                        // Any further actions like stopping/removing the existing container can be scripted here.
                        }
            } else {
                        echo 'No existing container found. Proceeding with deployment.'
                    // Proceed with the pipeline as the container doesn't exist.
                    }
                }
            }
        }
        stage('Build') {
            steps {
                dir('JCMfront2') {
                    script {
                        // Initialize the attempt counter
                        def attempts = 0
                        def maxAttempts = 3
                        def success = false

                        // Loop to attempt the build up to maxAttempts times
                        while (!success && attempts < maxAttempts) {
                            // Increment the attempt counter at the beginning of each iteration
                            attempts++
                            try {
                                // Check if the Docker image already exists
                                def imageExists = sh(script: "docker images -q ${BASE_IMAGE}:${LATEST_TAG}", returnStdout: true).trim()
                                // If the image exists, remove it
                                if (imageExists) {
                                    sh "docker rmi ${BASE_IMAGE}:${LATEST_TAG}"
                                    println("Existing Docker image ${BASE_IMAGE}:${LATEST_TAG} removed.")
                                }
                                // Build the Docker image
                                sh "docker build . -t ${BASE_IMAGE}:${LATEST_TAG}"
                                // If the command succeeds, set success to true to exit the loop
                                success = true
                            } catch (Exception e) {
                                // If an exception is caught, print an error message
                                println("Attempt ${attempts} failed.")
                                // Sleep for a brief period before retrying
                                sleep(time: 10, unit: 'SECONDS')
                            }
                        }

                        // Check if the build was unsuccessful after maxAttempts
                        if (!success) {
                            error "Build failed after ${maxAttempts} attempts."
                        }
                    }
                }
            }
        }
        stage('Deploy Production') {
            steps {
                script {
                    // Remove Production Container if it exists
                    sh 'docker rm -f JCMFrontend || true'
                    // Proceed with deployment of the main container
                    withCredentials([string(credentialsId: 'SSL', variable: 'urlSSL')]) {
                        docker.image("${BASE_IMAGE}:${LATEST_TAG}").run("--name JCMFrontend --volume ${urlSSL}:/app/ssl --network NW_JCMMETAIS --ip 172.19.0.4 -p 40001:80 -p 40002:443 --restart always")
                    }
                }
            }
        }
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', '902264b9-7caf-4364-872d-0148f17a72e7') {
                        docker.image("${BASE_IMAGE}:${LATEST_TAG}").push()
                    }
                }
            }
        }
    }
}
