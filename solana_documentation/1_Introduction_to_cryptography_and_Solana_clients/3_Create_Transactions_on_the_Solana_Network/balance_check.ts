import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
 
const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey("5G68qz4kgbJeNbvvY25eDS687eVVrk7qUe9Ni6HQCZ5G");
const balance = await connection.getBalance(address);
 
console.log(`The balance of the account at ${address} is ${balance} lamports`);
console.log(`✅ Finished!`);
