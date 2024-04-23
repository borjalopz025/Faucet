import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Layout } from './Layout';

export const Transferencia = () => {
    const [cuenta, setCuenta] = useState('');
    const [tx, setTx] = useState(null);
    const [saldo, setSaldo] = useState(null);
    const [click, setClick] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiConfig, setConfettiConfig] = useState({
        numberOfPieces: 100,
        gravity: 0.5,
        wind: 0.01,
    });

    useEffect(() => {
        window.ethereum.request({
            method: "eth_requestAccounts"
        }).then(cuenta => {
            setCuenta(cuenta[0]);
            window.ethereum.on("accountsChanged", (cuenta) => {
                setCuenta(cuenta[0]);
            })
        })
    }, []);

    const enviar = async () => {
        try {
            const url = `http://localhost:777/faucet/${cuenta}`;

            const response = await fetch(url);

            const json = await response.json();
            console.log(json);

            setTx(json);
            setClick(true);
            setShowConfetti(true);

        } catch (err) {
            console.log('hay un error en el front ' + err);
        }
    }

    return (
        <div className='cuerpo'>
            <h1>Faucet</h1>
            <div className='caja'>
                <input type="text" placeholder="Introduce tu cuenta de Metamask" />
                <button className='btn' onClick={() => enviar()}>Transferir</button>
            </div>
            <div className='respuesta2'>
                {showConfetti && <Confetti {...confettiConfig} />} 
                {click && 
                    <div className='res2'>
                        <div className='titu'>
                            <h3>Transferencia Realizada con Exito!!</h3>    
                        </div>
                        <div className="transaction-hash">
                            <p ><strong>Número de Bloque: </strong>{tx.blockNumber}</p>
                        </div>
                    </div>
                   
                }
            </div>
        </div>
    )
}
