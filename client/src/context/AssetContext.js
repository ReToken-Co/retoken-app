import React, { createContext, useReducer, useEffect } from 'react'
import AssetReducer from './AssetReducer'

// Create Context
export const AssetContext = createContext([])

// Provider Component
const AssetContextProvider = (props) => {

    const [assets, assetDispatch] = useReducer(AssetReducer, [])

    useEffect(() => {
        // get data from db in first render, set Asset
        assetDispatch({ type: 'GET_ASSETS' })
    }, [])

    return (
        <AssetContext.Provider value={{ assets, assetDispatch }}>
            {props.children}
        </AssetContext.Provider>
    )
}

export default AssetContextProvider