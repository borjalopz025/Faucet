import React, { useEffect, useState } from 'react';
import { Layout } from './Layout';

export const Datos = () => {

    const [transferHas, setTransferHas] = useState('');
    const [transactionData, setTransactionData] = useState(null);

    const adquirirDatos = async () => {
        try {
            console.log('TransferHas:', transferHas);
            const response = await fetch(`http://localhost:777/block/${transferHas}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setTransactionData(data);

        } catch (error) {
            console.error("error:", error);
        }
    }

    useEffect(() => {
        console.log(transactionData);
    }, [transactionData]);

    return (
        <div className='cuerpo'>
            <h1>Datos Transferencia</h1>
            <div className='caja'>
                <input type="text" placeholder='Introduce número de bloque' onChange={(e) => setTransferHas(e.target.value)} />
                <button className='btn' onClick={() => adquirirDatos()}>Mostrar</button>
            </div>
            
           {transactionData && (
                <div className='respuesta'>
                <p><strong>Date:</strong> {new Date (transactionData.blockDate).toLocaleDateString()}</p>
                <p><strong>Transaction Hash:</strong> {transactionData.transactions[0].hash}</p>
                <p><strong>from:</strong>{transactionData.transactions[0].from}</p>
                <p><strong>to:</strong> {transactionData.transactions[0].to}</p>
                <p><strong>value:</strong> {transactionData.transactions[0].value} Eth</p>
                
            </div>
            )} 
        </div>
    );
}
