import { Connect, SimpleSigner } from 'uport-connect'

export const uport = new Connect('Obsidian', {
    clientId: '2ovzw2xW2pMWgxxqRNBF4Q9ZTcJUrXV5XjM',
    network: 'rinkeby',
    signer: SimpleSigner('e4f1e51a35a9c56378d3c091b8b217218e3157417d15edb808e4bebf6497c9ce')
  })

export const web3 = uport.getWeb3()
