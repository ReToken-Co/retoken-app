import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { InputForm } from '../components'
import { AssetContext } from '../context/AssetContext'
//import { Web3Context } from '../context/Web3Context'

export default function AddAsset() {

//  const { account } = useContext(Web3Context)
const account = ''
const { assets, dispatch } = useContext(AssetContext)
  const history = useHistory()

  const addAssetDB = async (data) => {

    console.log(`addasset ${JSON.stringify(data)}`)
    dispatch({
      type: 'ADD_ASSET', 
      payload: {
        id: assets ? assets.length : 0,
        title: data.title,
        owner: account,
        image: data.image,
        startbid: Number(data.startbid),
        reservebid: Number(data.startbid),
        duration: Number(data.duration),
        description: data.description,
        currentbid: 0,
        numbid: 0,
        bcid: 0,
        starttime: '',
        dstarttime: '',
        status: 0,
        transactionhash: ''
      }
    })

    history.push('/assets')

  }

  return (
    <>
      <InputForm
        seller={account}
        addAsset={addAssetDB}
      />
    </>
  );
}
