// src/App.js

// import React from 'react';
import SolanaTransactions from './components/SolanaTransactions';

function App() {
  const walletAddress = 'CdaxmWBGbe9Fc7hmwzrULSR35ud6Cnoeij96PFt8zTsU'; 

  return (
    <div className="App">
      <h1>Solana Wallet Transactions</h1>
      <SolanaTransactions walletAddress={walletAddress} />
    </div>
  );
}

export default App;
