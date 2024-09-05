import * as web3 from "@solana/web3.js";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  airdropIfRequired,
} from "@solana-developers/helpers";
 
const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
 
const newBalance = await airdropIfRequired(
  connection,
  payer.publicKey,
  1 * web3.LAMPORTS_PER_SOL,
  0.5 * web3.LAMPORTS_PER_SOL,
);
//Let’s add the string versions of both: the address of Ping program and the address of the account where the program writes data to. 
const PING_PROGRAM_ADDRESS = new web3.PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
);
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
);

/*Next, let’s create the instruction. Remember, the instruction needs to include the public key for the Ping program and it also needs to include an array with all the accounts that will be read from or written to. In this example program, only the data account referenced above is needed.*/

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new web3.TransactionInstruction({
  keys: [
    {
      pubkey: pingProgramDataId,
      isSigner: false,
      isWritable: true,
    },
  ],
  programId,
});

/*Next, let’s add this instruction to the transaction we created. Then, call sendAndConfirmTransaction() by passing in the connection, transaction, and payer. Finally, let’s log the result of that function call so we can look it up on Solana Explorer.*/

transaction.add(instruction);
 
const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer],
);
 
console.log(`✅ Transaction completed! Signature is ${signature}`);














