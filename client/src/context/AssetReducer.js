import firebase from '../firebase'

export default (state, action) => {
    switch (action.type) {
        case 'SET_ASSETS':
            console.log (`set auc ${JSON.stringify(action.payload)}`)
            return action.payload

        case 'GET_ASSETS':
            const assets = []
            firebase.firestore().collection("Asset").get().then(async data => {
                data.docs.forEach(doc => {
                    assets.push(doc.data())

                    // Handle expired assets
                    if (doc.data().status === 1 &&
                        Date.now() > Number(doc.data().starttime) +
                        Number(doc.data().duration) * 60000) {
                        if (doc.data().numbid > 0)
                            assets[doc.data().id].status = 2
                        else
                            assets[doc.data().id].status = -1
                        const _assetRef = firebase.firestore()
                            .collection('Asset')
                            .doc(doc.data().id.toString())
                        _assetRef.update(assets[doc.data().id])
                    }
                })
                assets.sort(function (a, b) {
                    console.log(`get aucs ${JSON.stringify(assets)}`)
                    return parseInt(b.id) - parseInt(a.id);
                })
            })
            return assets

        case 'ADD_ASSET':
//            const test = [...state, addAsset(action.payload)]
//            console.log (`add asset combine  ${JSON.stringify(test)}`)
            return [...state, addAsset(action.payload)]

        case 'UPDATE_ASSET':
            const newAssets = updateAsset(state, action.payload)
            console.log(`updAuc ${JSON.stringify(newAssets)}`)
            return newAssets

        default:
            return state
    }
}

function addAsset(payload) {

    console.log(`addAuc ${JSON.stringify(payload)}`)
    // Update DB
    const db = firebase.firestore()
    db.collection("Asset").doc(payload.id.toString()).set({
        id: payload.id,
        title: payload.title,
        seller: payload.seller,
        image: payload.image,
        startbid: Number(payload.startbid),
        reservebid: Number(payload.startbid),
        duration: Number(payload.duration),
        description: payload.description,
        currentbid: 0,
        numbid: 0,
        bcid: 0,
        starttime: '',
        dstarttime: '',
        status: 0,
        transactionhash: ''
    })

    // return object to set Assets
    return {
        id: payload.id,
        title: payload.title,
        seller: payload.seller,
        image: payload.image,
        startbid: Number(payload.startbid),
        reservebid: Number(payload.startbid),
        duration: Number(payload.duration),
        description: payload.description,
        currentbid: 0,
        numbid: 0,
        bcid: 0,
        starttime: '',
        dstarttime: '',
        status: 0,
        transactionhash: ''
    }
}

function updateAsset(state, payload) {

    let newAssets = [...state]
    newAssets[payload.id].transactionhash = payload.transactionhash ? payload.transactionhash : newAssets[payload.id].transactionhash
    newAssets[payload.id].bcid = payload.bcid ? payload.bcid : newAssets[payload.id].bcid
    newAssets[payload.id].status = payload.status ? payload.status : newAssets[payload.id].status
    newAssets[payload.id].starttime = payload.starttime ? payload.starttime : newAssets[payload.id].starttime
    newAssets[payload.id].dstarttime = payload.dstarttime ? payload.dstarttime : newAssets[payload.id].dstarttime
    newAssets[payload.id].numbid = payload.numbid ? payload.numbid : newAssets[payload.id].numbid
    newAssets[payload.id].winner = payload.winner ? payload.winner : newAssets[payload.id].winner
    newAssets[payload.id].winningAmount = payload.winningAmount ? payload.winningAmount : newAssets[payload.id].winningAmount

    // Update DB
    const db = firebase.firestore()
    db.collection("Asset").doc(payload.id.toString()).update(newAssets[payload.id])

    return (newAssets)
}
