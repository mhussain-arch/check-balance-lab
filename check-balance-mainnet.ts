import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";


require("dotenv/config")
const web3Solana = require("@solana/web3.js")

const publicKeyEnv = process.env.SOLANA_PUB_KEY!;
const supliedPublicKey = process.argv[2]!;
if (!publicKeyEnv.length && !publicKeyEnv && !supliedPublicKey) {    
    throw new Error("Environment variable SOLANA_PUB_KEY undefined!");
} 

else {
    console.log("Solana wallet address was supplied!");
}

let publicKey!: PublicKey;
if (publicKeyEnv) {
    publicKey = new PublicKey(publicKeyEnv);
} else if (supliedPublicKey) {
    publicKey = new PublicKey(supliedPublicKey);
}

// initialize the new public key
// Challenge 2: Modify the script to connect to mainNet and look up some famous Solana wallets. 
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// Challenge 1: Detect wallets that do not exist
const accountExists = await connection.getAccountInfo(publicKey);
if (!accountExists) {
    console.error(accountExists);
    throw new Error("Account does not exist!");
}

const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
)