import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/usersContext';
import { BrowserRouter } from 'react-router-dom';
import { TourProvider } from '@reactour/tour'

const root = ReactDOM.createRoot(document.getElementById('root'));
const steps = [
  {
    selector: '.dash',
    content: 'Welcome to MsaadaFund! This is your dashboard, where you can easily navigate through all the features of the app.',
  },
  {
    selector: '.create-campaign',
    content: 'To start a new fundraising effort, click here to create a new campaign.',
  },
  {
    selector: '.view-campaigns',
    content: 'Here, you can view all the campaigns you have created and manage them.',
  },
  {
    selector: '.view-contributions',
    content: 'Check all contributions made to your campaigns by visiting this section.',
  },
  {
    selector: '.view-signatories',
    content: 'Add and manage your signatories, who will approve transactions, by clicking here.',
  },
  {
    selector: '.add-withdrawal-account',
    content: 'Set up your M-Pesa and Bank withdrawal accounts in this section to enable fund withdrawals.',
  },
  {
    selector: '.withdraw-funds',
    content: 'To transfer your campaign funds to your withdrawal accounts, click here.',
  },
  {
    selector: '.paybills',
    content: 'You can pay your bills directly from your campaign funds by visiting this section.',
  },
  {
    selector: '.buy-goods',
    content: 'Purchase goods and services using your campaign funds by clicking here.',
  },
  {
    selector: '.airtime',
    content: 'Buy airtime for your phone using your campaign funds from this section.',
  },
  {
    selector: '.view-withdrawals',
    content: 'View the history of all your withdrawals here.',
  },
  {
    selector: '.view-transactions',
    content: 'Check all transactions related to your campaigns in this section.',
  },
  {
    selector: '.view-approvals',
    content: 'See all pending approvals from your signatories for various actions related to your campaigns here.',
  },
  {
    selector: '.view-quick',
    content: 'Quickly access important features of the app here.',
  },
];

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <TourProvider steps={steps}>
    <AuthProvider>
      <App />
    </AuthProvider>
    </TourProvider>
    </BrowserRouter>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
