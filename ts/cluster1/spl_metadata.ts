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
import base58 from "bs58";

// Define our Mint address
const mint = publicKey("F9KDW6HbJbzCYA2jJ2hhW7aWZjKxf72CNk4bAv8kgTDG")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer,
        };
        let data: DataV2Args = {
            name: "My NFT",
            symbol: "NFT",
            uri: "https://arweave.net/123",
            sellerFeeBasisPoints: 500,
            creators: null,
            collection: null,
            uses: null,
        };
        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true,
            collectionDetails: null,
        };
        let tx = createMetadataAccountV3(umi, {
            ...accounts,
            ...args
        });
        let result = await tx.sendAndConfirm(umi).then(r => r.signature.toString());
        console.log(result);
        const encoded = base58.encode([
            247,
            177,
            237,
            85,
            246,
            223,
            153,
            60,
            189,
            129,
            221,
            207,
            36,
            100,
            238,
            222,
            74,
            228,
            15,
            170,
            180,
            30,
            147,
            107,
            121,
            196,
            250,
            10,
            76,
            176,
            22,
            99,
            210,
            36,
            220,
            29,
            95,
            29,
            108,
            83,
            127,
            221,
            128,
            53,
            62,
            184,
            14,
            249,
            216,
            129,
            239,
            4,
            112,
            166,
            170,
            70,
            84,
            163,
            210,
            154,
            69,
            61,
            91,
            87
        ]);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();