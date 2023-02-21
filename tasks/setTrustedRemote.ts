import { Contract, ethers } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import CHAIN_ID from '../constants/chainIds.json'
import {
	OmnichainInteractionTaskArguments,
	getLocalContractInstanceAndRemoteContractAddress,
} from '../utils/omnichainInteractions'
const { getDeploymentAddresses } = require('../utils/readStatic')

export async function setTrustedRemote(taskArgs: OmnichainInteractionTaskArguments, hre: HardhatRuntimeEnvironment) {
	const [localContractInstance, remoteAddress] = await getLocalContractInstanceAndRemoteContractAddress(taskArgs, hre)

	// get remote chain id
	const targetNetwork = taskArgs.targetNetwork as keyof typeof CHAIN_ID
	const remoteChainId: any = CHAIN_ID[targetNetwork]

	// concat remote and local address
	let remoteAndLocal = hre.ethers.utils.solidityPack(
		['address', 'address'],
		[remoteAddress, localContractInstance.address]
	)

	// check if pathway is already set
	const isTrustedRemoteSet = await localContractInstance.isTrustedRemote(remoteChainId, remoteAndLocal)

	if (!isTrustedRemoteSet) {
		try {
			let tx = await (await localContractInstance.setTrustedRemote(remoteChainId, remoteAndLocal)).wait()
			console.log(`✅ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
			console.log(` tx: ${tx.transactionHash}`)

			// const PACKET_TYPE = 1
			// const minDstGas = 400000
			// tx = await (await localContractInstance.setMinDstGas(remoteChainId, PACKET_TYPE, minDstGas)).wait()
			// console.log(`✅ [${hre.network.name}] setMinDstGas(${remoteChainId}, ${remoteAndLocal})`)
		} catch (e: any) {
			if (e.error.message.includes('The chainId + address is already trusted')) {
				console.log('*source already set*')
			} else {
				console.log(`❌ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
			}
		}
	} else {
		console.log('*source already set*')
	}
}
