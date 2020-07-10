import React from 'react'
import WarningAlert from './Icons/WarningAlert.svg'
import { Alert } from 'react-bootstrap'

export default function AlertWarningComponent(props) {

    return (
            props.walletInfo? (
                <Alert variant = "danger" >
                    <img style={{ marginRight: '5px' }} src={WarningAlert} alt="warning" />
                    Wallet is old!
                </Alert>
            ) : null
    )
}