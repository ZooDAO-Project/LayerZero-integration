import { Contract, ethers } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
const { getDeploymentAddresses } = require('./readStatic')

export interface OmnichainInteractionTaskArguments {
	contract: string
	localContract: string
	remoteContract: string
	targetNetwork: string
	qty?: string
}

export async function getLocalContractInstanceAndRemoteContractAddress(
	taskArgs: OmnichainInteractionTaskArguments,
	hre: HardhatRuntimeEnvironment
): Promise<[Contract, string]> {
	let localContract: string, remoteContract: string

	if (taskArgs.contract) {
		localContract = taskArgs.contract
		remoteContract = taskArgs.contract
	} else {
		localContract = taskArgs.localContract
		remoteContract = taskArgs.remoteContract
	}

	if (!localContract || !remoteContract) {
		throw new Error('Must pass in contract name OR pass in both localContract name and remoteContract name')
	}

	// get local contract
	const localContractInstance = await (hre.ethers as any).getContract(localContract)

	// Logic to get contract by name OR address
	// let localContractInstance: Contract
	// if (taskArgs.contract) {
	// 	localContractInstance = await (hre.ethers as any).getContract(localContract)
	// } else {
	// 	localContractInstance = await hre.ethers.getContractAt('OFTCore', localContract)
	// }

	// get deployed remote contract address

	const remoteAddress = getDeploymentAddresses(taskArgs.targetNetwork)[remoteContract]

	// Logic to get contract by name OR address
	// let remoteAddress: string
	// if (taskArgs.contract) {
	// } else {
	// 	remoteAddress = remoteContract
	// }
	console.log(localContractInstance.address, remoteAddress)

	if (!localContractInstance || !remoteAddress) {
		throw new Error(
			`Didn't get local contract or remote contract address, local - ${localContractInstance.address}, remote - ${remoteAddress}`
		)
	}

	return [localContractInstance, remoteAddress]
}
