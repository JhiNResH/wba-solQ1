import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json"


// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet.secretkey));
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
        /*
        * The createMint function takes the following parameters:
        * connection: a Connection object
        * payer: a Keypair object
        * mintAuthority: a PublicKey object
        * freezeAuthority: a PublicKey object or null
        * decimals: a number
        * keypair: keypair.generate()
        * confirmOptions: ConfirmOptions
        * programId: Token_PROGRAM_ID
        * */

        console.log(`Mint: ${mint.toBase58()}`);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
