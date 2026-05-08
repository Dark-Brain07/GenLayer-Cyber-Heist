# Deployment & Technical Integration Guide

This document outlines the professional deployment pipeline for GenLayer Cyber Heist, covering Intelligent Contract deployment on the Bradbury Testnet and Frontend hosting on Vercel.

## 1. Intelligent Contract Deployment (GenLayer Studio)

The project utilizes three core contracts. Follow these steps to deploy them to the **Studionet** or **Bradbury Testnet**.

### Preparation
- Access the [GenLayer Studio](https://studio.genlayer.com/).
- Ensure your wallet is connected and funded with testnet tokens.

### Deployment Order
1. **`ai_firewall.py`**: This is the primary gateway. Once deployed, note the address for frontend integration.
2. **`mainframe_vault.py`**: Handles logic for data exfiltration and scoring.
3. **`hacker_registry.py`**: Maintains the global threat-level leaderboard.

### Verification
After deployment, verify the contract addresses on the [GenLayer Explorer](https://explorer-studio.genlayer.com/). The logic strictly follows the `gl.eq_principle.prompt_comparative` pattern to ensure cross-validator consensus on subjective AI outputs.

---

## 2. Frontend Deployment (Vercel)

The frontend is a React + Vite application optimized for low-latency interactions with GenVM.

### Local Setup
```bash
cd frontend
npm install
npm run dev
```

### Production Build
```bash
# Generate the production dist folder
npm run build
```

### Vercel CLI Deployment
```bash
# Login to Vercel
vercel login

# Initialize and push to production
vercel --prod
```

### Custom Domain / Alias
To set up a custom alias (e.g., `genlayercyberheist.vercel.app`):
```bash
vercel alias [current-deployment-url] genlayercyberheist.vercel.app
```

---

## 3. Environment Configuration

If you wish to switch from the interactive simulation to direct RPC calls, update the following in `src/App.jsx`:

| Variable | Description |
|--- |--- |
| `AI_FIREWALL_ADDRESS` | The deployed address of your AIFirewall contract. |
| `chain` | Set to `studionet` or `testnetBradbury` depending on your target network. |

---

## 4. Troubleshooting

- **RLP Decoding Errors**: Ensure the `genlayer-js` version matches the network's GenVM version.
- **Contract Not Found**: Double-check that your `App.jsx` is pointing to the correct chain ID where the contract was originally deployed.
- **Vercel Build Failures**: Ensure `@tailwindcss/postcss` is installed as a devDependency for Tailwind v4 compatibility.
