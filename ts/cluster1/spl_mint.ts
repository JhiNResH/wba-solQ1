import { Keypair, PublicKey, Connection, Commitment, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import {
    getAssociatedTokenAddress,
    getAssociatedTokenAddressSync,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    createAssociatedTokenAccountInstruction
} from '@solana/spl-token';
import wallet from "../wba-wallet.json"
import bs58 from 'bs58';
import { create } from "domain";


// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet.secretkey));

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

        let keypairAta = getAssociatedTokenAddressSync(mint, keypair.publicKey);

        const transaction = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                keypair.publicKey,
                keypairAta,
                keypair.publicKey,
                mint
            )
        );
        const txsignature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [keypair]
        );

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
