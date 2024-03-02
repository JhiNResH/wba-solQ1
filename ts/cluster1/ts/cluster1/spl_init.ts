import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json"
import bs58 from 'bs58';


// Import our keypair from the wallet file
const secretKeyString = wallet.secretkey[0];
const secretKeyArrayBuffer = Buffer.from(bs58.decode(secretKeyString));
const keypair = Keypair.fromSecretKey(secretKeyArrayBuffer);

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
        // const mint = ???
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey,
            null, // not providing a freeze authority
            6, // 6 decimal places
        );
        console.log(`Mint: ${mint.toBase58()}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
