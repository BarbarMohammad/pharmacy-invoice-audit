"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDiscrepancies = checkDiscrepancies;
function checkDiscrepancies(invoiceRecords, refDrugs) {
    const discrepancies = [];
    
    for (let i = 1; i < invoiceRecords.length; i++) {
        const row = invoiceRecords[i];
        if (!row || !row[1])
            continue; 
        const [, drugName, strength, formulation, , payer, , invUnitPriceRaw] = row;
        const invUnitPrice = parseFloat(invUnitPriceRaw);
        if (!drugName)
            continue;

        const ref = refDrugs.find((d) => d.drugName.trim().toLowerCase() === String(drugName).trim().toLowerCase());
        if (!ref)
            continue;

        const overPct = ((invUnitPrice - ref.standardUnitPrice) / ref.standardUnitPrice) * 100;
        if (overPct > 10) {
            discrepancies.push({
                type: 'Unit Price',
                drugName,
                invPrice: invUnitPrice,
                refPrice: ref.standardUnitPrice,
                percentOver: `+${overPct.toFixed(1)}%`
            });
        }

        if (formulation && formulation.trim().toLowerCase() !== ref.formulation.trim().toLowerCase()) {
            discrepancies.push({
                type: 'Formulation',
                drugName,
                invFormulation: formulation,
                refFormulation: ref.formulation
            });
        }

        if (strength && strength.trim().toLowerCase() !== ref.strength.trim().toLowerCase()) {
            discrepancies.push({
                type: 'Strength',
                drugName,
                invStrength: strength,
                refStrength: ref.strength
            });
        }

        if (payer && payer.trim().toLowerCase() !== ref.payer.trim().toLowerCase()) {
            discrepancies.push({
                type: 'Payer',
                drugName,
                invPayer: payer,
                refPayer: ref.payer
            });
        }
    }
    return discrepancies;
}
