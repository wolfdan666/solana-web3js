## 分析token持有者

通过 `getParsedProgramAccounts` 查询所有代币账户，然后根据 `mint` 地址过滤出持有该代币的账户。

这样就可以构建一个简单的 token 持有者列表，同时对 token 的持仓进行一个分析。

分析结果如下：

```
前10大持有者分析：
==================================================
1. 地址: 5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1
   持仓量: 345,412,370.048
   占比: 34.55%

2. 地址: D6kyD96Tfkz5fA8JYhWkRPCdJxJ1dAk2ALpchjyUxApu
   持仓量: 35,007,630.972
   占比: 3.50%

3. 地址: ALCzpmL4jHVQNooT8PrxjiFDU5YYynVDqLam5FrPgn7b
   持仓量: 33,554,743.151
   占比: 3.36%

4. 地址: APUnpSv4HDpNPfed4dPqAnz75REWYbM5vTHaTnApLe1P
   持仓量: 24,850,304.554
   占比: 2.49%

5. 地址: 6xBTJa2VzLUnZnSPbvaTNKGYMoxG4Pm3d6B6nsPVbWUU
   持仓量: 23,736,153.23
   占比: 2.37%

6. 地址: GR3a6esWvmcE33LqwW1FgQEy7E6Mq8cE2uEWXc4VtcsK
   持仓量: 21,725,403.233
   占比: 2.17%

7. 地址: 2dM6wMKS2is3jpwMueXvLfCgwveMiwB1iQNowkjx3x8S
   持仓量: 20,923,943.722
   占比: 2.09%

8. 地址: FFL94Rd9ZBorakrH7okwHNMrhiWwK6WT53PazjATW2zg
   持仓量: 18,385,694.794
   占比: 1.84%

9. 地址: 5aXGUFvh2v5wFzYAsfMsX7YLEpFw4uPQza9UatRZnL4c
   持仓量: 16,428,619.503
   占比: 1.64%

10. 地址: Cw4vsaQ9JpeS4CRn66KmF5oRazo6C7AwMk1BSVYTMjQR
   持仓量: 16,397,086.408
   占比: 1.64%


代币持仓分布分析报告：
==================================================
总供应量: 999,837,357.511
总持有者: 7,101
==================================================

持仓区间: 1-100
持有者数量: 402 (5.66%)
持仓总量: 4,136.054 (0.00%)
平均持仓: 10.29
主要持有者: 
  - 4xr8U1TMkKHi7H2BC2dYVv3yXnUkeUphvmauK541SRsX
  - 8GbasKKd4yHH83CvS4mCuMEJvLemSrrV7De5hmNQ59Hb
  - F9Br3tp1kKqNuXSZgFMvevWocn8YyX5H89g76cCBqiv
  - PCnb69Pi1T8DkxMBQahtteRZ9QdC5QbQS44DeUDaDum
  - 2a2NqsUWFR8eFaXNkhhuFSpVkTbctGao9ZZvbkLGcrEm

持仓区间: 101-1,000
持有者数量: 83 (1.17%)
持仓总量: 47,501.135 (0.00%)
平均持仓: 572.30
主要持有者: 
  - 79P6UsqG1Y2cB2xcmKcaCoBn3Gba44ACVgS9xmQFULs7
  - C7VDfuACjqoT6rckWusPk8NSy6JmvYgcGmu4w6p7V3yx
  - Axd1HqUHxxW1peeGEwNmeckxuNATDJFeeEEMsmkJ6gGn
  - AqSR8UrBUG2dsT4LRMF9ceSayXu8oMXxfXc1FZbpHcbp
  - DoiUTaHyuEsMFQGanitoSScdEh78AWGpuNe5i1jp3Xdd

持仓区间: 1,001-10,000
持有者数量: 274 (3.86%)
持仓总量: 1,193,665.167 (0.12%)
平均持仓: 4356.44
主要持有者: 
  - 35tj37dCmiLxTV4cLRwXq6ycEhUqzG25PMaz4akMCHzV
  - 9vPVcvWomyDirhif6TeAa1tLPi5DkznFHmNsLHb6BWkf
  - 7APv2exT4QyhEHkDyEwY4TJR3pCSQPc7T3P9ZPA6sQNG
  - EfB3Q81JNNXuRsHt6gDN8L1CEqCuj5Gxgwgruj8bJdDi
  - Ci4s3nrWuhQriwgpEHwB8tUbzsx724bqugo5snHYJR7u

持仓区间: 10,001-100,000
持有者数量: 333 (4.69%)
持仓总量: 12,212,409.527 (1.22%)
平均持仓: 36673.90
主要持有者: 
  - HKtfKesi64ubxkoBkkDEvgEtXAEmwprtwbxgSxyDQXqN
  - An2vTG4AgYTtK7ED9qF6RaLsSmVRoe5QSxrke441wrjN
  - HwmkZo36DMvbRjsereuLmGFBdeJPSFKgfVWf6jUZd76Y
  - Et1M87kKDLpxMywjVKoFUusBFEW7rQzSKsffTCvgqBxd
  - EZgyr2aZESMvgzSfa2JjxjKrRCeYe2uc7YHTLt1eEKMM

持仓区间: 100,001-1,000,000
持有者数量: 209 (2.94%)
持仓总量: 69,417,348.63 (6.94%)
平均持仓: 332140.42
主要持有者: 
  - 4EKUCa6YCDwjHS5giQ4DJpvdyZ4XoRsmDZNSPwPgScwC
  - HkhCAiPabzFmUiHQAASg7rYiHthJ4sqGH5ygHHVhWsRf
  - T2ESjZiPmv7Fb2rAWebLpYnyTa8yyVCWaGMot7DpGjG
  - EpmSLKSnwZxpXzQkE76woiCTF6UkFmjAsSWpovANVMRy
  - 973rVqBCtaExEVGvEoYqyJta6THeXCC9pCRZuPoEUCMc

持仓区间: 1,000,000+
持有者数量: 83 (1.17%)
持仓总量: 916,962,296.997 (91.71%)
平均持仓: 11047738.52
主要持有者: 
  - 5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1
  - D6kyD96Tfkz5fA8JYhWkRPCdJxJ1dAk2ALpchjyUxApu
  - ALCzpmL4jHVQNooT8PrxjiFDU5YYynVDqLam5FrPgn7b
  - APUnpSv4HDpNPfed4dPqAnz75REWYbM5vTHaTnApLe1P
  - 6xBTJa2VzLUnZnSPbvaTNKGYMoxG4Pm3d6B6nsPVbWUU

```