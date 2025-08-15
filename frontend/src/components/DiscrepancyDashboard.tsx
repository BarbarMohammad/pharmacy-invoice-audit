import React from 'react';
import '../App.css'; // Import the CSS from above
import { Discrepancy } from '../App';

interface Props { discrepancies: Discrepancy[]; }

const DiscrepancyDashboard: React.FC<Props> = ({ discrepancies }) => {
  const group = (type: string) => discrepancies.filter(d => d.type === type);

  const price = group('Unit Price');
  const formulation = group('Formulation');
  const strength = group('Strength');
  const payer = group('Payer');
  const totalOvercharge = price.reduce((sum, d) => sum + ((d.invPrice ?? 0) - (d.refPrice ?? 0)), 0);

  return (
    <div>

      {/* Unit Price Section */}
      {price.length > 0 && (
        <div className="section-card price">
          <div className="section-title">
            <span className="badge price">💲</span>
            Unit Price Discrepancy Analysis
          </div>
          <table className="table-audit">
            <thead>
              <tr>
                <th>Drug Name</th><th>Recorded Price</th><th>Expected Price</th>
                <th>Est. Overcharge</th><th>% Discrepancy</th>
              </tr>
            </thead>
            <tbody>
              {price.map((d, i) => (
                <tr key={i}>
                  <td>{d.drugName}</td>
                  <td>${d.invPrice}</td>
                  <td>${d.refPrice}</td>
                  <td>${(d.invPrice! - d.refPrice!).toFixed(2)}</td>
                  <td>{d.percentOver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Formulation Section */}
      {formulation.length > 0 && (
        <div className="section-card formulation">
          <div className="section-title">
            <span className="badge formulation">🧴</span>
            Formulation Discrepancy Analysis
          </div>
          <table className="table-audit">
            <thead>
              <tr><th>Drug Name</th><th>Recorded Formulation</th><th>Expected Formulation</th></tr>
            </thead>
            <tbody>
              {formulation.map((d, i) => (
                <tr key={i}>
                  <td>{d.drugName}</td>
                  <td>{d.invFormulation}</td>
                  <td>{d.refFormulation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Strength Section */}
      {strength.length > 0 && (
        <div className="section-card strength">
          <div className="section-title">
            <span className="badge strength">💊</span>
            Strength Discrepancy Analysis
          </div>
          <table className="table-audit">
            <thead>
              <tr><th>Drug Name</th><th>Recorded Strength</th><th>Expected Strength</th></tr>
            </thead>
            <tbody>
              {strength.map((d, i) => (
                <tr key={i}>
                  <td>{d.drugName}</td>
                  <td>{d.invStrength}</td>
                  <td>{d.refStrength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Payer Section */}
      {payer.length > 0 && (
        <div className="section-card payer">
          <div className="section-title">
            <span className="badge payer">🏦</span>
            Payer Discrepancy Analysis
          </div>
          <table className="table-audit">
            <thead>
              <tr><th>Drug Name</th><th>Recorded Payer</th><th>Expected Payer</th></tr>
            </thead>
            <tbody>
              {payer.map((d, i) => (
                <tr key={i}>
                  <td>{d.drugName}</td>
                  <td>{d.invPayer}</td>
                  <td>{d.refPayer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {discrepancies.length === 0 && (
        <div style={{margin: '28px 0', textAlign: 'center', color: '#3ea44c', fontWeight: 600}}>
          No discrepancies detected 🎉
        </div>
      )}

      {/* Summary Counts */}
      <div className="summary-metrics">
        <div className="summary-metric">
          <span className="highlight-num">{price.length}</span><br />Price Discrepancies
          <div style={{ fontSize: "0.98em", color: "#eb5757", fontWeight: "500" }}>
            ${totalOvercharge.toFixed(2)} Total Overcharge
          </div>
        </div>
        <div className="summary-metric">
          <span className="highlight-num">{formulation.length}</span><br />Formulation Issues
          <div style={{ fontSize: "0.94em", color: "#27ae60" }}>Billing Error</div>
        </div>
        <div className="summary-metric">
          <span className="highlight-num">{strength.length}</span><br />Strength Errors
          <div style={{ fontSize: "0.94em", color: "#fbbc05" }}>Safety Concern</div>
        </div>
        <div className="summary-metric">
          <span className="highlight-num">{payer.length}</span><br />Payer Mismatches
          <div style={{ fontSize: "0.94em", color: "#2962ff" }}>Claims Review Needed</div>
        </div>
        <div className="summary-metric">
          <span className="highlight-num">{discrepancies.length}</span><br />Total Issues
          <div style={{ fontSize: "0.94em", color: "#333" }}>Requires Action</div>
        </div>
      </div>
    </div>
  );
};

export default DiscrepancyDashboard;
