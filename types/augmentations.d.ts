// eslint-disable @typescript-eslint/no-explicit-any

import { TransactionResponse } from '@ethersproject/providers'
import { DeploymentsExtension } from 'hardhat-deploy/dist/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

// Here you can define types that will expand standard libraries' types

// Example:
declare module 'ethers' {
	export type TransactionResponseWithEvents = TransactionResponse & {
		events: any[]
	}
}

declare module 'hardhat' {
	interface HardhatRuntimeEnvironment {
		deployments: DeploymentsExtension
		getNamedAccounts: any
	}
}
