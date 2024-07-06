import { http } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { blast, blastSepolia } from 'wagmi/chains'

const blastTestnet = {
  ...blastSepolia,
  rpcUrls: {
    default: {
      http: ['https://blast-sepolia.blockpi.network/v1/rpc/public'],
    },
    test: {
      http: ['https://blast-sepolia.blockpi.network/v1/rpc/public']
    }
  },
}

export const
  blastMainnet = {
    ...blastSepolia,
    id: 81457,
    name: "Blast",
    rpcUrls: {
      default: {
        http: ['https://rpc.blast.io'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Blastscan',
        url: 'https://blastscan.io/',
      },
    },
  }

const config = getDefaultConfig({
  appName: 'Flast Protocol',
  projectId: process.env['NEXT_PUBLIC_WALLET_PROJECT_ID'],
  chains: [blast],
  transports: {
    [blast.id]: http()
  },
})

export default config