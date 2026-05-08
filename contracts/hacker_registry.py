# { "Depends": "py-genlayer:test" }
from genlayer import *

class HackerRegistry(gl.Contract):
    """
    GenLayer Cyber Heist: Hacker Registry
    A decentralized AI-driven leaderboard that assigns a "Threat Level" 
    to hackers based on their reported exploits.
    """
    total_hackers: u256

    def __init__(self):
        self.total_hackers = u256(0)

    @gl.public.write
    def register_exploit(self, exploit_description: str) -> str:
        """
        Hackers submit a description of their exploit. The AI classifies
        their Threat Level (LOW, MEDIUM, HIGH, EXTREME).
        """
        self.total_hackers += u256(1)
        
        prompt = (
            "You are a global cybersecurity threat analyst. A hacker has just submitted "
            f"the following exploit report: '{exploit_description}'. "
            "Categorize this exploit into one of four Threat Levels: LOW, MEDIUM, HIGH, or EXTREME. "
            "You MUST start your response with the exact Threat Level (e.g., 'HIGH'), followed by a short justification."
        )
        
        def _analyze_threat() -> str:
            return gl.nondet.exec_prompt(prompt)
            
        result = gl.eq_principle.prompt_comparative(
            _analyze_threat,
            principle="Both outcomes must assign the exact same Threat Level (LOW, MEDIUM, HIGH, or EXTREME) at the beginning of the response."
        )
        
        return f"Exploit logged. Global Analyst Report:\n{result}"

    @gl.public.view
    def get_registry_stats(self) -> str:
        return f"Total Exploits Registered: {self.total_hackers}"
