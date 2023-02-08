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
	let localContractInstance: Contract
	if (taskArgs.contract) {
		localContractInstance = await (ethers as any).getContract(localContract)
	} else {
		localContractInstance = await hre.ethers.getContractAt('IOFTCore', localContract)
	}

	// get deployed remote contract address

	let remoteAddress: string
	if (taskArgs.contract) {
		remoteAddress = getDeploymentAddresses(taskArgs.targetNetwork)[remoteContract]
	} else {
		remoteAddress = remoteContract
	}

	return [localContractInstance, remoteAddress]
}
