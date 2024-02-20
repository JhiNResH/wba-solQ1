import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"
import bs58 from 'bs58';


// Import our keypair from the wallet file
const secretKeyString = wallet.secretkey[0];
const secretKeyArrayBuffer = Buffer.from(bs58.decode(secretKeyString));
const keypair = Keypair.fromSecretKey(secretKeyArrayBuffer);

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("F9KDW6HbJbzCYA2jJ2hhW7aWZjKxf72CNk4bAv8kgTDG");

(async () => {
    try {
        // Create an ATA
        // const ata = ???
        // console.log(`Your ata is: ${ata.address.toBase58()}`);

        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,);
        console.log(`Your ata is: ${ata.address.toBase58()}`);
        // Mint to ATA
        // const mintTx = ???
        // console.log(`Your mint txid: ${mintTx}`);

        const mintTx = await mintTo(
            connection,
            keypair,
            mint,
            ata.address,
            keypair.publicKey,
            token_decimals,
        );
        console.log(`Your mint txid: ${mintTx}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
