
import * as MicroStacks from '@micro-stacks/react';
import { Connect } from '@stacks/connect-react'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WalletStandardProvider } from '@wallet-standard/react';

import "./index.scss"

const CloseButton = ({ closeToast }) => (
  <button style={{marginRight: 20}} aria-label="close" onClick={closeToast} className="Vue-Toastification__close-button">×</button>
);

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <MicroStacks.ClientProvider
      appName="My sick app"
      network="mainnet"
    >
      <WalletStandardProvider>
        <Connect >
        <App />
        </Connect>
      </WalletStandardProvider>
 
    <ToastContainer closeButton={CloseButton} limit={3}/>
  </MicroStacks.ClientProvider>
);
