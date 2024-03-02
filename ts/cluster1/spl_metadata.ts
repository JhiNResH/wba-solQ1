import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import {
    createMetadataAccountV3,
    CreateMetadataAccountV3InstructionAccounts,
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

// Define our Mint address
const mint = publicKey("F9KDW6HbJbzCYA2jJ2hhW7aWZjKxf72CNk4bAv8kgTDG")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        const seed = [
            Buffer.from("metadata"),
            TOKEN_PROGRAM_ID.toBytes(),
            mintAddress.publicKey.toBytes()
        ];
        const [pda, bump]

        // Start here
        // let accounts: CreateMetadataAccountV3InstructionAccounts = {
        //     ???
        // }
        // let data: DataV2Args = {
        //     ???
        // }

        // let args: CreateMetadataAccountV3InstructionArgs = {
        //     ???
        // }

        // let tx = createMetadataAccountV3(
        //     umi,
        //     {
        //         ...accounts,
        //         ...args
        //     }
        // )

        // let result = await tx.sendAndConfirm(umi).then(r => r.signature.toString());
        // console.log(result);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();