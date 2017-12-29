const ABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "members",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfRequest",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfProgramsDelivered",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "addProgram",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfPrograms",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "requestInfo",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "programs",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "programId",
				"type": "uint256"
			},
			{
				"name": "requester",
				"type": "address"
			}
		],
		"name": "requestEquipment",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "element",
				"type": "uint256"
			}
		],
		"name": "getGroupInfo",
		"outputs": [
			{
				"components": [
					{
						"name": "members",
						"type": "address[]"
					}
				],
				"name": "groupInformation",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfMembers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "memberInfo",
		"outputs": [
			{
				"name": "latitude",
				"type": "string"
			},
			{
				"name": "longitude",
				"type": "string"
			},
			{
				"name": "sizeOfLand",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newGroupMembers",
				"type": "address[]"
			}
		],
		"name": "registerGroup",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfGroups",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "programInfo",
		"outputs": [
			{
				"name": "delivered",
				"type": "bool"
			},
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newMember",
				"type": "address"
			},
			{
				"name": "latitude",
				"type": "string"
			},
			{
				"name": "longitude",
				"type": "string"
			},
			{
				"name": "sizeOfLand",
				"type": "uint256"
			}
		],
		"name": "addMember",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "memberAdress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"name": "newMemberAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "programId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "newProgramAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "programId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "newEquipmentRequested",
		"type": "event"
	}
];

const ADDRESS = "0x6a8aa507ac3fce6cdf9f760df1d480b53e7e31c6";

export const CreateObsidianContractObj = (web3) => {      
    let contractABI = web3.eth.contract(ABI);
    let contractObj = contractABI.at(ADDRESS);      
    
    return contractObj;  
}     

//TODO: for testing, paste here but remember the API can be used !
