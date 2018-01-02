import web3 from '../actions/web3';

export const obsidianContract = (ObsidianSmartContract) => {
    return {
        createProgramOnChain: (ipfsHash, costPerUnit, subsidyAmount, units) => {

            return new Promise((resolve, reject) => {
                ObsidianSmartContract.addProgram(ipfsHash, costPerUnit, subsidyAmount, units, {
                    gas: 2000000
                }, (error, txHash) => {
                    if (error) { throw error }
                    waitForMined(txHash, { blockNumber: null },
                        function pendingCB() {
                            // Signal to the user you're still waiting
                            // for a block confirmation
                        },
                        function successCB(data) {
                            resolve();//don't need to pass nothing
                        }
                    )
                })
            })
        },

        getBalance: (address) => {
            return new Promise((resolve, reject) => {
                let addressToCheck = address || web3.eth.defaultAccount;
                ObsidianSmartContract.balances(addressToCheck, (error, result) => {
                    resolve(result.toNumber());
                })
            });

        },

        makeEquipmentTransferOnChain: (equipmentId) => {
            return new Promise((resolve, reject) => {
                ObsidianSmartContract.transferEquipment(equipmentId, {
                    gas: 2000000
                }, (error, txHash) => {
                    if (error) { throw error }
                    waitForMined(txHash, { blockNumber: null },
                        function pendingCB() {
                            // Signal to the user you're still waiting
                            // for a block confirmation
                        },
                        function successCB(data) {
                            resolve();//don't need to pass nothing
                        }
                    )
                })

            });
        },

        makeProgramTransferOnChain: (programId) => {
            return new Promise((resolve, reject) => {
                ObsidianSmartContract.transfer(programId, {
                    gas: 2000000
                }, (error, txHash) => {
                    if (error) { throw error }
                    waitForMined(txHash, { blockNumber: null },
                        function pendingCB() {
                            // Signal to the user you're still waiting
                            // for a block confirmation
                        },
                        function successCB(data) {
                            resolve();//don't need to pass nothing
                        }
                    )
                })
            });
        },

        addMember: (memberAddress, latitude, longitude, sizeOfLand, callback) => {
            ObsidianSmartContract.addMember(memberAddress, `${latitude.toFixed(4)}`, `${longitude.toFixed(4)}`, sizeOfLand, {
                gas: 2000000,
                from: memberAddress
            }, (error, txHash) => {
                if (error) { throw error }
                waitForMined(txHash, { blockNumber: null },
                    function pendingCB() {
                        // Signal to the user you're still waiting
                        // for a block confirmation
                    },
                    function successCB(data) {
                        callback();
                    }
                )
            })
        },

        memberExist: (address) => {
            return new Promise((resolve, reject) => {
                ObsidianSmartContract.members(address, (error, result) => {
                    if (!result) {
                        resolve(result);
                    }
                });
            })
        },

        getMemberInfoBy: (address) => {
            return new Promise((resolve, reject) => {
                ObsidianSmartContract.membersInfo(address, (error, result) => {
                    let latitude = result[0];
                    let longitude = result[1];
                    let sizeOfLand = result[2].toNumber();
                    resolve({ latitude, longitude, sizeOfLand });
                    //TODO: error handling
                });
            })
        }
    }
}

const waitForMined = (txHash, response, pendingCB, successCB) => {
    if (response.blockNumber) {
        successCB();
    } else {
        pendingCB()
        pollingLoop(txHash, response, pendingCB, successCB)
    }
}

const pollingLoop = (txHash, response, pendingCB, successCB) => {
    setTimeout(function () {
        web3.eth.getTransaction(txHash, (error, response) => {
            if (error) { throw error }
            if (response === null) {
                response = { blockNumber: null }
            }
            waitForMined(txHash, response, pendingCB, successCB)
        })
    }, 1000);
}

export const setDefaultAccount = (address) => {
    web3.eth.defaultAccount = address;
}

export const createSmartContractObject = (info) => {
    web3.eth.defaultAccount = info.clientAddress;
    let contractABI = web3.eth.contract(info.abi);
    let contractObj = contractABI.at(info.address);
    return contractObj;
}
//TODO: for testing, paste here but remember the API can be used !
