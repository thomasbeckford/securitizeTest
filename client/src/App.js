import React, { useState, useEffect } from 'react'
import { Container, Form, Card } from 'react-bootstrap'
import PencilSquare from './Icons/PencilSquare.svg'
import Check from './Icons/Check.svg'
import Cancel from './Icons/Cancel.svg'
import AlertWarningComponent from './AlertWarningComponent'
import axios from 'axios'
import './App.css'

function App() {
    const [walletInfo, setWalletInfo] = useState(null)
    const [exchangeRates, setExchangeRates] = useState(null)
    const [balance, setBalance] = useState(null)
    const [selectedCurrency, setSelectedCurrency] = useState(null)
    const [editableInput, setEditableInput] = useState(false)
    const [currentBalance, setCurrentBalance] = useState(null)

    // We can make this by 'fetch' too, so as not to use axios package, but I prefer using axios because looks cleaner.
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/getbalance')
            setBalance(response.data.result?.toFixed(2) || 10000) // We set || 10000 because API has calls restricted.
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/getcurrencyexchangerates')
            setExchangeRates(response.data)
            setSelectedCurrency(Object.keys(response.data)[0])
        }
        fetchData()
    }, [])

    const handleSaveBalance = () => {
        setBalance(currentBalance || balance)
        setEditableInput(false)
    }

    return (
        <Container className="p-3">
            <AlertWarningComponent walletInfo={walletInfo} setWalletInfo={setWalletInfo} />
            <div className="cards-body-container">
                <Card className="card-body-component" body>
                    <div style={{ textAlign: 'right' }}>
                        {editableInput ? (
                            <div>
                                <img src={Check} alt="check" onClick={() => handleSaveBalance()} />
                                <img src={Cancel} alt="cancel" onClick={() => setEditableInput(false)} />
                            </div>
                        ) : (
                            <img src={PencilSquare} alt="pencilSquare" onClick={() => setEditableInput(true)} />
                        )}
                    </div>
                    <Form.Group controlId="formBasicEmail">
                        {editableInput ? (
                            <Form.Control
                                type="number"
                                onChange={(e) => setCurrentBalance(e.target.value)}
                                placeholder="Set new ethereum value"
                                defaultValue={balance}
                            />
                        ) : (
                            <div style={{ marginTop: '1em' }}>
                                <Card.Text style={{ fontWeight: 'bold' }}>{balance ? balance : 10000}</Card.Text>
                            </div>
                        )}
                    </Form.Group>
                </Card>
                <Card className="card-body-component" body>
                    <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                        <Form.Control
                            onChange={(e) => setSelectedCurrency(e.target.value)}
                            style={{ width: '10em' }}
                            as="select"
                            size="lg"
                            custom
                        >
                            {exchangeRates && Object.keys(exchangeRates).map((key) => <option key={key}>{key}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Card.Text style={{ fontWeight: 'bold' }}>
                        {selectedCurrency === 'EUR' ? '€ ' : '$ ' }
                        {exchangeRates && balance ? (balance * exchangeRates[selectedCurrency]).toFixed(2) : null}
                    </Card.Text>
                </Card>
            </div>
        </Container>
    )
}

export default App
