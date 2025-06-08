// src/components/Loader.js

import React from 'react';

const Loader = () => (
  <div style={styles.container}>
    <div className="spinner-wrapper">
      <div className="spinner outer orange"></div>
      <div className="spinner inner black"></div>
    </div>
    <p style={{ marginTop: '20px', fontSize: '16px', color: '#333' }}>Loading...</p>

    <style>{`
      .spinner-wrapper {
        position: relative;
        width: 90px;
        height: 90px;
      }

      .spinner {
        position: absolute;
        border: 6px solid transparent;
        border-radius: 50%;
      }

      .outer {
        width: 90px;
        height: 90px;
        top: 0;
        left: 0;
      }

      .inner {
        width: 60px;
        height: 60px;
        top: 15px; /* 0.4 cm from edge */
        left: 15px;
      }

      .orange {
        border-top: 6px solid orange;
        animation: spinClockwise 1s linear infinite;
      }

      .black {
        border-bottom: 6px solid black;
        animation: spinAntiClockwise 1.2s linear infinite;
      }

      @keyframes spinClockwise {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes spinAntiClockwise {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }
    `}</style>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
};

export default Loader;
