const { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction, Keypair } = require("@solana/web3.js");
const SPLTOKEN = require('@solana/spl-token');
const bs58 = require('bs58');

const RPC_ENDPOINT = 'https://aged-stylish-glade.solana-mainnet.quiknode.pro/xxx/';

const connection = new Connection(RPC_ENDPOINT, 'confirmed');

async function closeTokenAccounts(ownerAddress, payerKeyPair) {
    const ownerPublicKey = new PublicKey(ownerAddress);

    const tokenAccounts = await connection.getTokenAccountsByOwner(ownerPublicKey, { programId: SPLTOKEN.TOKEN_PROGRAM_ID });
    const accountInfos = tokenAccounts.value;

    const processedAccounts = accountInfos.map(infos => {
        //解密getTokenAccountsByOwner返回的令牌账户data信息
        const decoded = SPLTOKEN.AccountLayout.decode(infos.account.data);
        return {
            pubkey: infos.pubkey.toBase58(),
            mint: decoded.mint.toBase58(),
            lamports: parseInt(infos.account.lamports, 10),//剩余租金
            amount: parseInt(decoded.amount, 10), //持币数量
            isNative:decoded.isNative.toString(), //是否平台币
            closeAuthorityOption: decoded.closeAuthorityOption.toString() //关闭权限 0是关 1是开
        };
    });

    let transaction = new Transaction();
    for (let accountinfo of processedAccounts) {
        if (accountinfo.isNative == 0 && accountinfo.amount == "0" && accountinfo.closeAuthorityOption == "0") {
          // 创建关闭账户的指令
          const closeAccountInstruction = SPLTOKEN.createCloseAccountInstruction(
            new PublicKey(accountinfo.pubkey),
            ownerPublicKey,
            ownerPublicKey, 
            [],
          );
          transaction.add(closeAccountInstruction);
        }
    }

    try {
        const signature = await sendAndConfirmTransaction(connection, transaction, [payerKeyPair]);
        console.error('signature:', signature);
    } catch (error) {
        console.error('交易发送失败:', error);
    }
}

const walletPrivateKey = ''; // 发送者私钥
const payerKeyPair = Keypair.fromSecretKey(bs58.decode(walletPrivateKey));

const walletPublic = ''; // 发送者公钥

closeTokenAccounts(walletPublic, payerKeyPair).catch(console.error);
