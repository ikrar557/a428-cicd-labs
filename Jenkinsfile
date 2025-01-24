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
            stage('Deploy') {
                sh './jenkins/scripts/deploy.sh'
                input message: 'Sudah selesai menggunakan React App? (Klik "Proceed" untuk mengakhiri)'
                sh './jenkins/scripts/kill.sh'
            }
        } catch (Exception e) {
            error "Pipeline Error: ${e.message}"
        }
    }
}
