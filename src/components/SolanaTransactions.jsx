// src/components/SolanaTransactions.js

import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const SolanaTransactions = ({ walletAddress, refreshInterval = 60000 }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);

      try {
        const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=8b9b0b6f-d61b-4132-b1d7-5bfe0631d190');
        const publicKey = new PublicKey(walletAddress);

        // Fetch the signatures of the latest transactions
        const transactionSignatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });

        // Fetch the detailed transaction data
        const transactionDetails = await Promise.all(
          transactionSignatures.map(async (signatureInfo) => {
            return await connection.getTransaction(signatureInfo.signature);
          })
        );

        setTransactions(transactionDetails);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }

      setLoading(false);
    };

    // Fetch transactions immediately
    fetchTransactions();

    // Set up the interval to refresh transactions
    const intervalId = setInterval(fetchTransactions, refreshInterval);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [walletAddress, refreshInterval]);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div>
      <h3>Latest Transactions for Wallet: {walletAddress}</h3>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            <p><strong>Signature:</strong> {tx.transaction.signatures[0]}</p>
            <p><strong>Block Time:</strong> {new Date(tx.blockTime * 1000).toLocaleString()}</p>
            <p><strong>Transaction Details:</strong> {JSON.stringify(tx.transaction.message, null, 2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolanaTransactions;
