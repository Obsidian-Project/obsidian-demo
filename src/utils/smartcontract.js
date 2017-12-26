export const OBSIDIAN_CONTRACT_ABI = [
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
				"type": "uint128"
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
				"name": "toBlacklist",
				"type": "address"
			}
		],
		"name": "blackListMember",
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
				"type": "uint128"
			}
		],
		"name": "loansInfo",
		"outputs": [
			{
				"name": "approver",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint128"
			},
			{
				"name": "period",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"name": "",
				"type": "uint128"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfLoans",
		"outputs": [
			{
				"name": "",
				"type": "uint128"
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
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint128"
			},
			{
				"name": "period",
				"type": "uint8"
			}
		],
		"name": "approveLoan",
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
				"name": "number",
				"type": "uint128"
			},
			{
				"indexed": false,
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "approver",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint128"
			},
			{
				"indexed": false,
				"name": "period",
				"type": "uint8"
			}
		],
		"name": "NewLoan",
		"type": "event"
	}
];

export const OBSIDIAN_CONTRACT_ADDRESS = "0x592428dde39682c24a0ae82fcd59437f0de114af";

export const CreateObsidianContractObj = (web3) => {      
    let contractABI = web3.eth.contract(OBSIDIAN_CONTRACT_ABI);
    let contractObj = contractABI.at(OBSIDIAN_CONTRACT_ADDRESS);      
    
    return contractObj;  
}     

//TODO: for testing, paste here but remember the API can be used !