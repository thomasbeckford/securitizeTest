import React, {useEffect} from 'react'
import WarningAlert from './Icons/WarningAlert.svg'
import { Alert } from 'react-bootstrap'
import axios from 'axios'

export default function AlertWarningComponent(props) {

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/getwalletinfo')
            props.setWalletInfo(response)
        }
        fetchData()
    }, [props])

    return (
            props.walletInfo? (
                <Alert variant = "danger" >
                    <img style={{ marginRight: '5px' }} src={WarningAlert} alt="warning" />
                    Wallet is old!
                </Alert>
            ) : null
    )
}