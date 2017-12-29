export const OBSIDIAN_CONTRACT_ABI = [
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

export const OBSIDIAN_CONTRACT_ADDRESS = "0x3ae6f17ba7c810707e003f7eb2fd389da57f8dd5";

export const CreateObsidianContractObj = (web3) => {      
    let contractABI = web3.eth.contract(OBSIDIAN_CONTRACT_ABI);
    let contractObj = contractABI.at(OBSIDIAN_CONTRACT_ADDRESS);      
    
    return contractObj;  
}     

//TODO: for testing, paste here but remember the API can be used !
