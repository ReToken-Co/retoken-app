import React, { createContext, useReducer, useEffect } from 'react'
import TransactionReducer from './TransactionReducer'

// Create Context
export const TransactionContext = createContext([])

// Provider Component
const TransactionContextProvider = (props) => {

    const [transactions, transactionDispatch] = useReducer(TransactionReducer, [])

    return (
        <TransactionContext.Provider value={{ transactions, transactionDispatch }}>
            {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionContextProvider