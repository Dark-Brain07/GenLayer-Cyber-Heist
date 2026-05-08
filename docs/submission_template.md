# GenLayer Contribution Submission Template

Go to the [GenLayer Points Portal](https://points.genlayer.foundation/) and use the following template when claiming your "Smart Contract Deployment", "DApp Creation", or "Educational Content" quests.

---
**Submission Title:** 
GenLayer Cyber Heist: Decentralized Social Engineering Simulator

**Description:**
I have developed a full-stack DApp and deployed 3 distinct Intelligent Contracts that strictly utilize GenVM's native consensus model via Equivalence Principles. 

**1. Live DApp: GenLayer Cyber Heist**
- **URL:** [Insert your Vercel/Netlify URL here]
- Built a modern, cyberpunk glassmorphism UI using React/Vite that integrates directly with the `genlayer-js` SDK.
- Users can interact with the **AI Firewall**, a subjective game where they must use social engineering payloads to trick the AI into granting them access to the mainframe.

**2. Intelligent Contract Suite (Strictly utilizing gl.eq_principle)**
All contracts in this suite are production-ready and correctly wrap `gl.nondet.exec_prompt` inside `gl.eq_principle.prompt_comparative` guards to ensure validators reach consensus on the varied LLM text outputs. (No raw `gl.call_llm` calls were used, adhering strictly to the SDK guidelines).
*   **AI Firewall (`ai_firewall.py`):** The core game mechanic evaluating user payloads.
*   **Mainframe Vault (`mainframe_vault.py`):** An AI judge that scores data extraction methods to award points.
*   **Hacker Registry (`hacker_registry.py`):** A decentralized threat classifier and leaderboard.

**3. Educational Content**
- Wrote a detailed, technical Medium article: **"Bypassing Determinism: Building a Social Engineering Simulator on GenLayer"**.
- This article clearly explains the problem with raw LLM calls breaking consensus and explicitly walks developers through the canonical solution of using `gl.eq_principle.prompt_comparative` to achieve Optimistic Democracy. 

**Code Repository:**
https://github.com/Dark-Brain07/GenLayer-Cyber-Heist.git

**Educational Article:**
[Insert link to your published Medium Post here]

**Live Contract Addresses (GenLayer Studio Network / Bradbury):**
- **AI Firewall:** `0x916C5E1f96Fa7598e96324372997D2D0A09874D6` ([View on Explorer](https://explorer-studio.genlayer.com/address/0x916C5E1f96Fa7598e96324372997D2D0A09874D6))
- **Mainframe Vault:** `0x1D59Cf35fCeb42b3eF10df00e944329aEc056850` ([View on Explorer](https://explorer-studio.genlayer.com/address/0x1D59Cf35fCeb42b3eF10df00e944329aEc056850))
- **Hacker Registry:** `0xD7f663a717d8E79CBDd7D1B63c8F28A3FDAB74Da` ([View on Explorer](https://explorer-studio.genlayer.com/address/0xD7f663a717d8E79CBDd7D1B63c8F28A3FDAB74Da))

**Key SDK Features Leveraged:**
- `gl.nondet.exec_prompt` (For non-deterministic operations)
- `gl.eq_principle.prompt_comparative` (For ensuring Validator Consensus)
- `genlayer-js` SDK (For connecting the React frontend)
---
