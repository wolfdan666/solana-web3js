import {
    Connection,
    PublicKey,
    Keypair,
    TransactionMessage,
    VersionedTransaction,
    SystemProgram,
    AddressLookupTableProgram
} from '@solana/web3.js';
import fs from "fs";

// 创建RPC连接
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
// const connection = new Connection("https://mainnet-ams.chainbuff.com", "confirmed");

// 本地导入钱包
// const fromSecretKey = Uint8Array.from(JSON.parse(fs.readFileSync("wallet.json")));
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync("web3xFMwEPrc92NeeXdAigni95NDnnd2NPuajTirao2.json").toString()));
const payer = Keypair.fromSecretKey(secretKey);

async function createALT() {

    // 获取当前slot
    const slot = await connection.getSlot("confirmed");

    // 创建ALT
    const [lookupTableInstruction, lookupTableAddress] =
        AddressLookupTableProgram.createLookupTable({
            authority: payer.publicKey,
            payer: payer.publicKey,
            recentSlot: slot,
        });

    console.log("lookup table address:", lookupTableAddress.toBase58());

    // 创建v0 message
    const { blockhash } = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: blockhash, // 最近的区块hash
        instructions: [lookupTableInstruction], // 指令数组
    }).compileToV0Message();

    // 创建v0交易并签名
    const transaction = new VersionedTransaction(messageV0);
    transaction.sign([payer]);

    // 模拟交易
    const simulateResult = await connection.simulateTransaction(transaction);
    console.log("模拟交易结果: ", simulateResult);

    // 发送交易
    const signature = await connection.sendTransaction(transaction);
    console.log(`交易已发送: https://solscan.io/tx/${signature}`);
}

async function addAddresses() {

    const lookupTableAddress = new PublicKey('2qqXrZZSG9naivqMyWHHUDRFVNh3YthsTbN5EPU8Poo5')

    // 添加账户到ALT
    const extendInstruction = AddressLookupTableProgram.extendLookupTable({
        lookupTable: lookupTableAddress,
        payer: payer.publicKey,
        authority: payer.publicKey,
        addresses: [
            payer.publicKey,
            new PublicKey('buffaAJKmNLao65TDTUGq8oB9HgxkfPLGqPMFQapotJ'),
            SystemProgram.programId, // 
        ],
    });

    // 创建v0 message
    const { blockhash } = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: blockhash, // 最近的区块hash
        instructions: [extendInstruction], // 指令数组
    }).compileToV0Message();

    // 创建v0交易并签名
    const transaction = new VersionedTransaction(messageV0);
    transaction.sign([payer]);

    // 模拟交易
    const simulateResult = await connection.simulateTransaction(transaction);
    console.log("模拟交易结果: ", simulateResult);

    // 发送交易
    const signature = await connection.sendTransaction(transaction);
    console.log(`交易已发送: https://solscan.io/tx/${signature}`);

}

async function transfer() {

    const lookupTableAddress = new PublicKey('2qqXrZZSG9naivqMyWHHUDRFVNh3YthsTbN5EPU8Poo5')

    // 获取ALT
    const ALT = await connection.getAddressLookupTable(lookupTableAddress);
    const lookupTableAccount = ALT.value;
    if (!lookupTableAccount) {
        throw new Error("lookupTableAccount不存在");
    }
    console.log('lookupTableAccount:', lookupTableAccount)

    // 目标地址
    const toAddress = new PublicKey('buffaAJKmNLao65TDTUGq8oB9HgxkfPLGqPMFQapotJ');

    // 转账指令
    const instruction = SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: toAddress,
        lamports: 1000, // 1000 lamports
    });

    // 创建v0 message
    const { blockhash } = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: blockhash, // 最近的区块hash
        instructions: [instruction], // 指令数组
    }).compileToV0Message([lookupTableAccount]);

    // 创建v0交易并签名
    const transaction = new VersionedTransaction(messageV0);
    transaction.sign([payer]);

    // 模拟交易
    const simulateResult = await connection.simulateTransaction(transaction);
    console.log("模拟交易结果: ", simulateResult);

    // 发送交易
    const signature = await connection.sendTransaction(transaction);
    console.log(`交易已发送: https://solscan.io/tx/${signature}`);

}

async function parseTx() {

    const parsedTransaction1 = await connection.getParsedTransaction('4LwygRtiF9ZCrbGKoh8MEzmxowaRHPaDc1nsinkv72uXU2cUCuZ8YskBBgsvbBEMZ5Pqpf6C6WcXtCkqAuLZand1', {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0
    });
    console.log(`已解析的v0交易: ${JSON.stringify(parsedTransaction1)}\n`);

}


// 创建ALT
// createALT();

// 为ALT添加账户
// addAddresses();

// 使用ALT的转账
// transfer();

// 获取解析的v0交易
parseTx();