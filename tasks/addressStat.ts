import { HardhatRuntimeEnvironment } from 'hardhat/types'

// export async function addressStat(taskArgs: any, hre: HardhatRuntimeEnvironment) {
// 	hre.ethers.provider.
// 	const web3Goerli = createAlchemyWeb3(API_URL_GOERLI)
// 	const web3Mumbai = createAlchemyWeb3(API_URL_MUMBAI)
// 	const web3Arb = createAlchemyWeb3(API_URL_ARBITRUM)
// 	const web3Opt = createAlchemyWeb3(API_URL_OPTIMISM)

// 	const networkIDArr = ['Ethereum Goerli:', 'Polygon  Mumbai:', 'Arbitrum Rinkby:', 'Optimism Goerli:']
// 	const providerArr = [web3Goerli, web3Mumbai, web3Arb, web3Opt]
// 	const resultArr = []

// 	for (let i = 0; i < providerArr.length; i++) {
// 		const nonce = await providerArr[i].eth.getTransactionCount(taskArgs.address, 'latest')
// 		const balance = await providerArr[i].eth.getBalance(taskArgs.address)

// 		resultArr.push([
// 			networkIDArr[i],
// 			nonce,
// 			parseFloat(providerArr[i].utils.fromWei(balance, 'ether')).toFixed(2) + 'ETH',
// 		])
// 	}
// 	resultArr.unshift(['  |NETWORK|   |NONCE|   |BALANCE|  '])
// 	console.log(resultArr)
// }
