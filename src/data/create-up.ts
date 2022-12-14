import dotenv from 'dotenv';
import { LSPFactory } from '@lukso/lsp-factory.js';

dotenv.config();
const provider = process.env.RPC;

const lspFactory = new LSPFactory(provider, {
    deployKey: process.env.PK, // Private key of the account which will deploy smart contracts
    chainId: Number(process.env.CHAIN_ID),
});



async function createUP() {
    const contracts = await lspFactory.UniversalProfile.deploy(
        {
            controllerAddresses: [process.env.CONTROLLER, process.env.CONTROLLER2],

        },
        {
            LSP0ERC725Account: {
                deployProxy: false
            },
            LSP6Keymanager: {
                deployProxy: false
            },
            LSP1UniversalReceiverDelegate: {
                deployProxy: false
            },
            onDeployEvents: {
                next: (deploymentEvent) => {
                    console.log(deploymentEvent);
                },
                error: (error) => {
                    console.error(error);
                },
                complete: (contracts) => {
                    console.log('Universal Profile deployment completed');
                    console.log(contracts);
                },
            }
        } as any);

}


createUP()