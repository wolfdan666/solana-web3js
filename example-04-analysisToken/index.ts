import { Connection, PublicKey, ParsedAccountData } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

async function getTokenHolders(mintAddress: string) {
    // 1. 参数说明：mintAddress 是代币的 Mint 地址
    // 例如：USDC 的 Mint 地址是 "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    const mint = new PublicKey(mintAddress);
    
    // 2. 调用 getParsedProgramAccounts 查询所有代币账户
    const accounts = await connection.getParsedProgramAccounts(
        // Token 程序的地址（固定值）
        new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        {
            filters: [
                // Token 账户的大小固定为 165 字节
                { dataSize: 165 },
                {
                    // 在数据开始位置匹配 Mint 地址
                    memcmp: {
                        offset: 0,
                        bytes: mint.toBase58(),
                    },
                },
            ],
        }
    );

    // 3. 处理返回数据
    const holders = accounts.map(account => ({
        // 代币账户地址
        address: account.pubkey.toString(),
        // 代币余额（已考虑小数位）
        amount: (account.account.data as ParsedAccountData).parsed.info.tokenAmount.uiAmount,
        // 代币账户所有者（钱包地址）
        owner: (account.account.data as ParsedAccountData).parsed.info.owner
    }));

    // 4. 按持有量从大到小排序
    return holders.sort((a, b) => b.amount - a.amount);
}

interface TokenDistribution {
    range: string;
    holders: number;
    totalAmount: number;
    percentage: string;
    addresses: string[];
}

async function getTokenDistribution(holders: any[]) {
    // 计算总供应量
    const totalSupply = holders.reduce((sum, h) => sum + Number(h.amount), 0);
    
    // 定义分布区间（可以根据需要调整）
    const ranges = [
        { min: 0, max: 100, label: "1-100" },
        { min: 100, max: 1000, label: "101-1,000" },
        { min: 1000, max: 10000, label: "1,001-10,000" },
        { min: 10000, max: 100000, label: "10,001-100,000" },
        { min: 100000, max: 1000000, label: "100,001-1,000,000" },
        { min: 1000000, max: Infinity, label: "1,000,000+" }
    ];

    // 初始化结果
    const distribution: { [key: string]: TokenDistribution } = {};
    ranges.forEach(range => {
        distribution[range.label] = {
            range: range.label,
            holders: 0,
            totalAmount: 0,
            percentage: "0%",
            addresses: []
        };
    });

    // 统计分布
    holders.forEach(holder => {
        const amount = Number(holder.amount);
        const range = ranges.find(r => amount > r.min && amount <= r.max);
        if (range) {
            const label = range.label;
            distribution[label].holders++;
            distribution[label].totalAmount += amount;
            distribution[label].addresses.push(holder.owner);
        }
    });

    // 计算百分比
    Object.values(distribution).forEach(d => {
        d.percentage = ((Number(d.totalAmount) / Number(totalSupply)) * 100).toFixed(2) + '%';
    });

    // 生成报告
    console.log("\n代币持仓分布分析报告：");
    console.log("=".repeat(50));
    console.log(`总供应量: ${totalSupply.toLocaleString()}`);
    console.log(`总持有者: ${holders.length.toLocaleString()}`);
    console.log("=".repeat(50));
    
    Object.values(distribution).forEach(d => {
        if (d.holders > 0) {
            console.log(`\n持仓区间: ${d.range}`);
            console.log(`持有者数量: ${d.holders.toLocaleString()} (${((d.holders/holders.length)*100).toFixed(2)}%)`);
            console.log(`持仓总量: ${d.totalAmount.toLocaleString()} (${d.percentage})`);
            console.log(`平均持仓: ${(Number(d.totalAmount)/Number(d.holders)).toFixed(2)}`);
            
            // 只显示前5个大户地址
            if (d.addresses.length > 0) {
                console.log("主要持有者: ");
                d.addresses.slice(0, 5).forEach(addr => 
                    console.log(`  - ${addr}`)
                );
            }
        }
    });

    return distribution;
}



async function main() {
    const holders = await getTokenHolders("Dp4fXozKtwgK1cL5KQeeNbuAgFpJtY3FbAvL8JrWpump");
    // 计算总供应量
    const totalSupply = holders.reduce((sum, h) => sum + Number(h.amount), 0);
    
    const topHolders = holders.slice(0, 10);  // 前10大持有者
    console.log("\n前10大持有者分析：");
    console.log("=".repeat(50));
    topHolders.forEach((holder, index) => {
        console.log(`${index + 1}. 地址: ${holder.owner}`);
        console.log(`   持仓量: ${Number(holder.amount).toLocaleString()}`);
        console.log(`   占比: ${((Number(holder.amount) / Number(totalSupply)) * 100).toFixed(2)}%\n`);
    });

    await getTokenDistribution(holders)
}

main();
