export const Governance=
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "org_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "post_amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "cont_id",
				"type": "string"
			}
		],
		"name": "create_account",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "org_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "post_cont_id",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "post",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "org_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "vote_ans",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "post_cont_id",
				"type": "string"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "org_name",
				"type": "string"
			}
		],
		"name": "retrieve_about",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "org_name",
				"type": "string"
			}
		],
		"name": "retrieve_post",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "org_name",
				"type": "string"
			}
		],
		"name": "retrieve_post_amount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "post_cont_id",
				"type": "string"
			}
		],
		"name": "retrieve_vote_amount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "post_cont_id",
				"type": "string"
			}
		],
		"name": "retrieve_vote_no",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "post_cont_id",
				"type": "string"
			}
		],
		"name": "retrieve_vote_yes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]