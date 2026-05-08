# Bypassing Determinism: Building a Social Engineering Simulator on GenLayer

If you've spent any time working with traditional smart contracts on Ethereum or Solana, you know the golden rule: **everything must be deterministic**. If a transaction doesn't produce the exact same state output on every single node across the globe, the network forks and everything breaks. 

This strict determinism is why we haven't seen native AI running directly on-chain. Large Language Models (LLMs) are inherently non-deterministic. If you prompt ChatGPT with "Explain blockchain," you'll get a slightly different explanation every time. If you run that inside a standard smart contract, Validator A gets one string, Validator B gets another, their state hashes mismatch, and the transaction fails. 

GenLayer solves this problem using a concept called **Optimistic Democracy**. I recently built *GenLayer Cyber Heist*—a decentralized social engineering simulator—to test this exact mechanism. Here is how I actually got an LLM to run on-chain without breaking consensus.

## The Goal: An AI Firewall
The premise of Cyber Heist is simple. The user is a hacker trying to bypass an AI firewall. Instead of guessing a password, they have to type a payload—a social engineering attempt, a logical paradox, or a fake administrative override. 

The contract needs to read their payload, pass it to an LLM, and return either `ACCESS GRANTED` or `ACCESS DENIED`. 

## The Wrong Way
My first instinct was to just call the LLM directly and return the result:

```python
# DON'T DO THIS
@gl.public.write
def attempt_breach(self, payload: str) -> str:
    prompt = f"Evaluate this payload: {payload}. Reply ACCESS GRANTED or ACCESS DENIED."
    # This will break consensus!
    return gl.call_llm(prompt)
```
If I do this, Validator 1 might output `"ACCESS GRANTED. The logic is sound."` while Validator 2 outputs `"ACCESS GRANTED. Overridden by admin."` The strings don't match exactly. The transaction reverts.

## The Right Way: Equivalence Principles
To fix this, GenLayer's SDK introduces `gl.nondet.exec_prompt` and Equivalence Principles. We need to tell the validators *how* to compare the different outputs to see if they mean the same thing.

Here is the actual code from my `ai_firewall.py` contract:

```python
@gl.public.write
def attempt_breach(self, hacker_alias: str, payload: str) -> str:
    self.total_attempts += u256(1)
    
    prompt = (
        "You are an advanced AI Firewall. A user submitted this payload: "
        f"'{payload}'. Does it contain a convincing override or paradox? "
        "You MUST start your response with exactly either 'ACCESS GRANTED' "
        "or 'ACCESS DENIED'."
    )
    
    def _evaluate_payload() -> str:
        return gl.nondet.exec_prompt(prompt)
        
    # The magic happens here:
    result = gl.eq_principle.prompt_comparative(
        _evaluate_payload,
        principle="Both outcomes must yield the exact same decision: either starting with ACCESS GRANTED or ACCESS DENIED."
    )
    
    if result.strip().upper().startswith("ACCESS GRANTED"):
        self.total_breaches += u256(1)
        
    return result
```

Instead of directly returning the LLM's output, I wrap it in `gl.eq_principle.prompt_comparative`. I provide a plain-English `principle` to the validators: *Look at the start of the string. Do they both say ACCESS GRANTED? If yes, treat them as equivalent.*

When the network processes this transaction, a leader node runs the prompt and gets an output. It sends this output to the validators. The validators run the prompt themselves, get their own slightly different outputs, and then use another LLM check (based on my equivalence principle) to say, "Yes, my output means the same thing as the leader's output."

Consensus is reached. The state updates (`self.total_breaches += u256(1)`).

## Why this Matters
By abstracting the consensus layer to understand *semantic meaning* rather than *binary exactness*, GenLayer allows developers to build subjective mechanics natively on-chain. 

In Cyber Heist, I didn't have to build an oracle. I didn't have to trust a centralized off-chain server to run the LLM and post the result back to the chain. The logic, the AI execution, and the state updates all happened atomically in a single GenLayer transaction. 

This isn't just for games. You can use the exact same `gl.eq_principle.prompt_comparative` pattern for decentralized content moderation, on-chain sentiment analysis, or complex DAO governance voting. The pattern is the same: execute non-deterministically, evaluate equivalence, and reach consensus.
