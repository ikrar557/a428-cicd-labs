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
            stage('Manual Approval') {
                input message: 'Lanjutkan ke tahap Deploy?',
                    ok: 'Proceed'
            }
            stage('Deploy') {
                sh './jenkins/scripts/deliver.sh'
                echo 'Aplikasi sedang berjalan. Tunggu 1 menit sebelum dimatikan...'
                sleep(time: 60, unit: 'SECONDS')
                sh './jenkins/scripts/kill.sh'
            }
        } catch (Exception e) {
            error "Pipeline Error: ${e.message}"
        }
    }
}
