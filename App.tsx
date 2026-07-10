import React from 'react';
import { TriageProvider } from './src/context/TriageContext';
import TriageScreen from './src/screens/TriageScreen';

export default function App() {
  return (
    <TriageProvider>
      <TriageScreen />
    </TriageProvider>
  );
}