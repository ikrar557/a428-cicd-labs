node {
    stage('Checkout') {
        checkout scm
    }

    docker.image('node:16-buster-slim').inside('-p 3000:3000') {
        try {
            stage('Build') {
                sh 'npm install'
            }

            stage('Test') {
                sh './jenkins/scripts/test.sh'
            }
        } catch (Exception e) {
            error "Pipeline failed: ${e.message}"
        }
    }
}
