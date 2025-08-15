import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DiscrepancyDashboard from './components/DiscrepancyDashboard';

export interface Discrepancy {
  type: string;
  drugName: string;
  refPrice?: number;
  invPrice?: number;
  percentOver?: string;
  refFormulation?: string;
  invFormulation?: string;
  refStrength?: string;
  invStrength?: string;
  refPayer?: string;
  invPayer?: string;
}

function App() {
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);


  


  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Pharmacy Invoice Audit</h1>
      <FileUpload setDiscrepancies={setDiscrepancies} />
      <DiscrepancyDashboard discrepancies={discrepancies} />
    </div>
  );
}

export default App;
