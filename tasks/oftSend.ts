import { ethers } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import {
	getLocalContractInstanceAndRemoteContractAddress,
	OmnichainInteractionTaskArguments,
} from '../utils/omnichainInteractions'

const CHAIN_ID = require('../constants/chainIds.json')

export async function oftSend(taskArgs: OmnichainInteractionTaskArguments, hre: HardhatRuntimeEnvironment) {
	let signers = await hre.ethers.getSigners()
	let owner = signers[0]
	let toAddress = owner.address
	let qty = ethers.utils.parseEther(taskArgs.qty as string)

	const [localContractInstance] = await getLocalContractInstanceAndRemoteContractAddress(taskArgs, hre)

	// get remote chain id
	const targetNetwork = taskArgs.targetNetwork as keyof typeof CHAIN_ID
	const remoteChainId: any = CHAIN_ID[targetNetwork]

	// quote fee with default adapterParams
	let adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, 200000]) // default adapterParams example

	let fees = await localContractInstance.estimateSendFee(remoteChainId, toAddress, qty, false, adapterParams)
	console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.utils.formatEther(fees[0])}`)

	let tx = await (
		await localContractInstance.sendFrom(
			owner.address, // 'from' address to send tokens
			remoteChainId, // remote LayerZero chainId
			toAddress, // 'to' address to send tokens
			qty, // amount of tokens to send (in wei)
			owner.address, // refund address (if too much message fee is sent, it gets refunded)
			ethers.constants.AddressZero, // address(0x0) if not paying in ZRO (LayerZero Token)
			'0x', // flexible bytes array to indicate messaging adapter services
			{ value: fees[0] }
		)
	).wait()

	console.log(
		`✅ Message Sent [${hre.network.name}] sendTokens() to OFT @ LZ chainId[${remoteChainId}] token:[${toAddress}]`
	)
	console.log(` tx: ${tx.transactionHash}`)
	console.log(`* check your address [${owner.address}] on the destination chain, in the ERC20 transaction tab !"`)
}
