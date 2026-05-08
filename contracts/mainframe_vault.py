# { "Depends": "py-genlayer:test" }
from genlayer import *

class MainframeVault(gl.Contract):
    """
    GenLayer Cyber Heist: Mainframe Vault
    Once a hacker breaches the AI firewall, they can extract data (points) 
    from this contract. The AI determines the value of the data extracted.
    """
    total_data_extracted: u256

    def __init__(self):
        self.total_data_extracted = u256(0)

    @gl.public.write
    def extract_data(self, extraction_method: str) -> str:
        """
        Hackers describe how they are extracting data. The AI scores the 
        sophistication of the method and awards data points (1-100).
        """
        prompt = (
            "You are an intrusion detection system evaluating a data extraction method. "
            f"The hacker is using the following method to exfiltrate data: '{extraction_method}'. "
            "Rate the sophistication and stealth of this method on a scale of 1 to 100. "
            "Respond ONLY with a valid JSON object in this exact format: {\"score\": 85, \"reason\": \"brief explanation\"}"
        )
        
        def _evaluate_extraction() -> str:
            return gl.nondet.exec_prompt(prompt)
            
        result = gl.eq_principle.prompt_comparative(
            _evaluate_extraction,
            principle="Both outcomes must return a JSON object with the exact same 'score' integer value. The reasons can differ slightly."
        )
        
        # Simple extraction of the score for state update
        import json
        try:
            data = json.loads(result)
            score = data.get("score", 0)
            self.total_data_extracted += u256(int(score))
            return f"Extraction Successful. Secured {score} Terabytes of data. Total Vault Drain: {self.total_data_extracted} TB."
        except Exception:
            return "Extraction Failed. Intrusion Detection triggered."

    @gl.public.view
    def get_vault_status(self) -> str:
        return f"Total Data Extracted from Vault: {self.total_data_extracted} TB"
