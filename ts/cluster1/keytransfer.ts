import * as bs58 from 'bs58';

function decodeSolanaPrivateKey(privateKeyStr: string): Uint8Array {
    // 将 Base58 编码的私钥字符串解码为字节数组
    const privateKeyBytes: Uint8Array = bs58.decode(privateKeyStr);

    return privateKeyBytes;
}

// 替换下面的字符串为你的 Solana 私钥
const solanaPrivateKeyStr: string = "5xEFxRbqMtzoTaiKJzPPi5k9aeY9HMU1UtY1wWyPxJX381xErgPRPwt6LzmDU3zSShqV6CGPYFj4YRjP99QJzn8N";

const privateKeyBytes: Uint8Array = decodeSolanaPrivateKey(solanaPrivateKeyStr);

// 打印字节数组形式的私钥
console.log(privateKeyBytes);
