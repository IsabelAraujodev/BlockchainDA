const { ethers } = require("ethers");

// Conexão com o provedor Metamask
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Endereço do contrato e ABI (obtido após o deploy)
const contractAddress = 'Endereco Do Contrato';
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_dataHash",
                "type": "string"
            }
        ],
        "name": "registerData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_dataHash",
                "type": "string"
            }
        ],
        "name": "getDataRecord",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contract = new ethers.Contract(contractAddress, abi, signer);

// Função para registrar o hash de um arquivo
async function registerData(hash) {
    try {
        const tx = await contract.registerData(hash);
        await tx.wait();
        console.log("Dados registrados com sucesso!");
    } catch (error) {
        console.error("Erro ao registrar os dados:", error);
    }
}

// Função para consultar os dados registrados
async function getDataRecord(hash) {
    try {
        const record = await contract.getDataRecord(hash);
        console.log("Dono:", record[0]);
        console.log("Hash:", record[1]);
        console.log("Timestamp:", new Date(record[2] * 1000).toLocaleString());
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

// interface HTML (simples) para interagir com a aplicação

const form = document.getElementById('data-form');
const hashInput = document.getElementById('data-hash');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const hash = hashInput.value;
    if (hash) {
        await registerData(hash);
    } else {
        alert("Por favor, insira o hash do arquivo.");
    }
});

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-hash');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const hash = searchInput.value;
    if (hash) {
        await getDataRecord(hash);
    } else {
        alert("Por favor, insira o hash para busca.");
    }
});
