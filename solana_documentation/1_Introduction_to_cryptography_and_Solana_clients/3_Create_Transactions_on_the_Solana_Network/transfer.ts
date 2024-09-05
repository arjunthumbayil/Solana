import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
 
//const suppliedToPubkey = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";
//const suppliedToPubkey = "5G68qz4kgbJeNbvvY25eDS687eVVrk7qUe9Ni6HQCZ5G";
  const suppliedToPubkey = "dDCQNnDmNbFVi8cQhKAgXhyhXeJ625tvwsunRyRc7c8";
if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}
 
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
 
console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
 
const toPubkey = new PublicKey(suppliedToPubkey);
 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);
console.log(`My public key is: ${senderKeypair.publicKey}`);
