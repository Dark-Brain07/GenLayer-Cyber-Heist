# GenLayer Cyber Heist

A decentralized Social Engineering Simulator built specifically for the GenLayer network.

## The Concept
Traditional smart contracts rely on strict determinism. GenLayer Cyber Heist breaks this mold by running natively non-deterministic AI logic entirely on-chain using **Optimistic Democracy**. 

Instead of guessing a hardcoded password, players act as hackers and must submit creative text payloads (social engineering, logic paradoxes) to an on-chain AI Firewall. The AI dynamically evaluates the payload and grants or denies access.

## Architecture

This project consists of 3 Intelligent Contracts built to strict GenLayer SDK standards, ensuring that non-deterministic LLM calls still achieve network consensus.

1. **`ai_firewall.py`:** The core mechanism. Uses `gl.eq_principle.prompt_comparative` to force validators to agree on the AI's binary decision.
2. **`mainframe_vault.py`:** Evaluates the sophistication of data extraction methods and awards state-persisted scores.
3. **`hacker_registry.py`:** A global leaderboard that categorizes hackers based on their exploits.

## Running the Project

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Intelligent Contracts
Deploy the contracts using GenLayer Studio or the GenLayer CLI onto the Bradbury testnet.
```bash
genlayer deploy contracts/ai_firewall.py
```
