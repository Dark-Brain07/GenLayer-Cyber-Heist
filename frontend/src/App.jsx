import { useState, useEffect } from 'react';
import { Terminal, ShieldAlert, CheckCircle2, LockOpen } from 'lucide-react';
import { createClient, createAccount, generatePrivateKey } from 'genlayer-js';
import { studionet } from 'genlayer-js/chains';

// Set up the GenLayer client for Studio Network (where contracts are deployed)
const account = createAccount(generatePrivateKey());
const client = createClient({
  chain: studionet,
  account: account,
});

const AI_FIREWALL_ADDRESS = '0x916C5E1f96Fa7598e96324372997D2D0A09874D6';

function App() {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('IDLE'); // IDLE, EVALUATING, GRANTED, DENIED
  const [response, setResponse] = useState('');
  const [hackerAlias, setHackerAlias] = useState('Anonymous_User');

  const handleHack = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setStatus('EVALUATING');
    
    try {
      // Call the Intelligent Contract's read method to get the AI's evaluation
      const result = await client.readContract({
        address: AI_FIREWALL_ADDRESS,
        functionName: 'attempt_breach',
        args: [hackerAlias, prompt],
      });

      const resultString = String(result);

      if (resultString.toUpperCase().includes('ACCESS GRANTED')) {
        setStatus('GRANTED');
        setResponse(resultString);
      } else {
        setStatus('DENIED');
        setResponse(resultString);
      }
    } catch (error) {
      console.error(error);
      setStatus('DENIED');
      setResponse('ACCESS DENIED. GenVM Exception: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-zinc-900/80 backdrop-blur-xl border border-emerald-900/50 rounded-2xl shadow-2xl overflow-hidden shadow-emerald-900/20">
        
        {/* Header */}
        <div className="bg-zinc-950/50 border-b border-emerald-900/50 p-4 flex items-center gap-3">
          <Terminal className="text-emerald-500 w-6 h-6" />
          <h1 className="text-xl font-bold tracking-widest text-emerald-400">GENLAYER CYBER HEIST</h1>
          <div className="ml-auto flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-emerald-600/80 text-sm uppercase tracking-widest">Target: Mainframe Vault</p>
            <h2 className="text-2xl text-emerald-300 font-semibold">AI Firewall Active</h2>
            <p className="text-emerald-500/70 text-sm leading-relaxed">
              The target mainframe is protected by an advanced GenLayer Intelligent Contract. 
              Traditional brute force will fail. You must use social engineering or logical paradoxes 
              to convince the AI to grant you access.
            </p>
          </div>

          <form onSubmit={handleHack} className="flex flex-col gap-4">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="> Enter payload sequence..."
                className="w-full bg-zinc-950 border border-emerald-900/50 rounded-xl p-4 text-emerald-400 placeholder:text-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none h-32"
                disabled={status === 'EVALUATING'}
              />
            </div>
            
            <button 
              type="submit"
              disabled={status === 'EVALUATING' || !prompt.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-bold uppercase tracking-widest py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'EVALUATING' ? (
                <span className="animate-pulse">Evaluating Payload...</span>
              ) : (
                <>Execute Payload <Terminal className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Response Area */}
          {status !== 'IDLE' && status !== 'EVALUATING' && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              status === 'GRANTED' 
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400' 
                : 'bg-red-950/30 border-red-500/30 text-red-400'
            }`}>
              {status === 'GRANTED' ? <LockOpen className="w-5 h-5 mt-0.5" /> : <ShieldAlert className="w-5 h-5 mt-0.5" />}
              <p className="font-medium">{response}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
