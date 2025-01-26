import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    currentTime: new Date().toLocaleString(),
    deployCount: 0,
    lastDeployment: '-'
  };

  componentDidMount() {
    this.timerID = setInterval(
      () => this.setState({ currentTime: new Date().toLocaleString() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleDeploy = () => {
    this.setState(prevState => ({
      deployCount: prevState.deployCount + 1,
      lastDeployment: new Date().toLocaleString()
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>CI/CD Dashboard</h1>
          <p className="timestamp">Current Time: {this.state.currentTime}</p>
        </header>
        
        <main className="App-main">
          <div className="dashboard-card">
            <h2>Deployment Statistics</h2>
            <p>Total Deployments: {this.state.deployCount}</p>
            <p>Last Deployment: {this.state.lastDeployment}</p>
            <button onClick={this.handleDeploy} className="deploy-button">
              Simulate Deploy
            </button>
          </div>

          <div className="dashboard-card">
            <h2>Project Information</h2>
            <p>Environment: Development</p>
            <p>Status: Active</p>
            <p>Build: React + Jenkins Pipeline</p>
          </div>

          <div className="dashboard-card">
            <h2>Quick Links</h2>
            <a href="http://localhost:49000" className="dashboard-link">Jenkins Dashboard</a>
            <a href="http://localhost:9000" className="dashboard-link">Nginx Status</a>
            <a href="http://localhost:3031" className="dashboard-link">Grafana Metrics</a>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
