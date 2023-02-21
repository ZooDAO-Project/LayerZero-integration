import { HardhatRuntimeEnvironment } from 'hardhat/types'
const LZ_ENDPOINTS = require('../constants/layerzeroEndpoints.json')

const CHAIN_ID = require('../constants/chainIds.json')

export async function retryPayload(taskArgs: any, hre: HardhatRuntimeEnvironment) {
	const network = hre.network.name
	const endpoint = LZ_ENDPOINTS[network]
	const lzEndpoint = await hre.ethers.getContractAt('ILayerZeroEndpoint', endpoint)

	const srcChain = taskArgs.srcChain as keyof typeof CHAIN_ID
	const srcChainId = CHAIN_ID[srcChain]

	const srcAddress = taskArgs.srcAddress

	const payload = taskArgs.payload

	let tx = await lzEndpoint.retryPayload(srcChainId, srcAddress, payload, { gasLimit: 1000000 })
	await tx.wait()
	console.log(`[${hre.network.name}] retryPayload() @ LZ srcChainId[${srcChainId}] srcAddress[${srcAddress}]`)
	console.log(` tx: ${tx.transactionHash}`)
	console.log(`* check your address on the destination chain, in the ERC20 transaction tab !"`)
}
