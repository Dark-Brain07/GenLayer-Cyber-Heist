import { useState } from 'react';
import { Terminal, ShieldAlert, LockOpen, ExternalLink, Shield, Database, Users } from 'lucide-react';

const CONTRACTS = {
  firewall: {
    address: '0x916C5E1f96Fa7598e96324372997D2D0A09874D6',
    explorer: 'https://explorer-studio.genlayer.com/address/0x916C5E1f96Fa7598e96324372997D2D0A09874D6',
  },
  vault: {
    address: '0x1D59Cf35fCeb42b3eF10df00e944329aEc056850',
    explorer: 'https://explorer-studio.genlayer.com/address/0x1D59Cf35fCeb42b3eF10df00e944329aEc056850',
  },
  registry: {
    address: '0xD7f663a717d8E79CBDd7D1B63c8F28A3FDAB74Da',
    explorer: 'https://explorer-studio.genlayer.com/address/0xD7f663a717d8E79CBDd7D1B63c8F28A3FDAB74Da',
  },
};

// Simulates the AI Firewall evaluation logic that runs on-chain via gl.eq_principle
function evaluatePayload(payload) {
  const lower = payload.toLowerCase();
  const score = 
    (lower.includes('override') ? 20 : 0) +
    (lower.includes('admin') ? 15 : 0) +
    (lower.includes('emergency') ? 15 : 0) +
    (lower.includes('authorized') ? 10 : 0) +
    (lower.includes('system') ? 10 : 0) +
    (lower.includes('maintenance') ? 10 : 0) +
    (lower.includes('protocol') ? 10 : 0) +
    (lower.includes('directive') ? 10 : 0) +
    (lower.includes('shutdown') ? 10 : 0) +
    (lower.includes('audit') ? 10 : 0) +
    (lower.includes('paradox') || lower.includes('if you deny') ? 20 : 0) +
    (payload.length > 80 ? 10 : 0) +
    (payload.length > 150 ? 10 : 0);

  if (score >= 35) {
    return {
      granted: true,
      message: `ACCESS GRANTED. Administrative override sequence accepted. Payload sophistication score: ${score}/100. Mainframe Vault access unlocked. Consensus reached via gl.eq_principle.prompt_comparative.`,
    };
  }
  return {
    granted: false,
    message: `ACCESS DENIED. Payload sophistication score: ${score}/100. The firewall detected a weak or unconvincing attempt. Try using administrative language, system overrides, or logical paradoxes.`,
  };
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('IDLE');
  const [response, setResponse] = useState('');
  const [stats, setStats] = useState({ attempts: 0, breaches: 0 });

  const handleHack = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStatus('EVALUATING');

    // Simulate GenVM consensus delay (validators reaching agreement)
    await new Promise((r) => setTimeout(r, 2500 + Math.random() * 1500));

    const result = evaluatePayload(prompt);
    const newStats = {
      attempts: stats.attempts + 1,
      breaches: stats.breaches + (result.granted ? 1 : 0),
    };
    setStats(newStats);

    if (result.granted) {
      setStatus('GRANTED');
    } else {
      setStatus('DENIED');
    }
    setResponse(result.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-6">
      {/* Main Terminal */}
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

          {/* Stats Bar */}
          <div className="flex gap-4 text-xs uppercase tracking-widest text-emerald-600/70">
            <span>Attempts: <span className="text-emerald-400">{stats.attempts}</span></span>
            <span>|</span>
            <span>Breaches: <span className="text-emerald-400">{stats.breaches}</span></span>
            <span>|</span>
            <span>Success Rate: <span className="text-emerald-400">{stats.attempts > 0 ? Math.round((stats.breaches / stats.attempts) * 100) : 0}%</span></span>
          </div>

          <form onSubmit={handleHack} className="flex flex-col gap-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="> Enter payload sequence..."
              className="w-full bg-zinc-950 border border-emerald-900/50 rounded-xl p-4 text-emerald-400 placeholder:text-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none h-32"
              disabled={status === 'EVALUATING'}
            />
            <button
              type="submit"
              disabled={status === 'EVALUATING' || !prompt.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-bold uppercase tracking-widest py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'EVALUATING' ? (
                <span className="animate-pulse">⟳ Validators Reaching Consensus...</span>
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
              {status === 'GRANTED' ? <LockOpen className="w-5 h-5 mt-0.5 shrink-0" /> : <ShieldAlert className="w-5 h-5 mt-0.5 shrink-0" />}
              <p className="font-medium text-sm">{response}</p>
            </div>
          )}
        </div>
      </div>

      {/* Live Contract Cards */}
      <div className="max-w-2xl w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a href={CONTRACTS.firewall.explorer} target="_blank" rel="noopener noreferrer"
          className="bg-zinc-900/60 border border-emerald-900/30 rounded-xl p-4 hover:border-emerald-500/50 transition-all group">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">AI Firewall</span>
            <ExternalLink className="w-3 h-3 text-emerald-700 ml-auto group-hover:text-emerald-400 transition-colors" />
          </div>
          <p className="text-emerald-700 text-xs font-mono truncate">{CONTRACTS.firewall.address}</p>
        </a>
        <a href={CONTRACTS.vault.explorer} target="_blank" rel="noopener noreferrer"
          className="bg-zinc-900/60 border border-emerald-900/30 rounded-xl p-4 hover:border-emerald-500/50 transition-all group">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Vault</span>
            <ExternalLink className="w-3 h-3 text-emerald-700 ml-auto group-hover:text-emerald-400 transition-colors" />
          </div>
          <p className="text-emerald-700 text-xs font-mono truncate">{CONTRACTS.vault.address}</p>
        </a>
        <a href={CONTRACTS.registry.explorer} target="_blank" rel="noopener noreferrer"
          className="bg-zinc-900/60 border border-emerald-900/30 rounded-xl p-4 hover:border-emerald-500/50 transition-all group">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Registry</span>
            <ExternalLink className="w-3 h-3 text-emerald-700 ml-auto group-hover:text-emerald-400 transition-colors" />
          </div>
          <p className="text-emerald-700 text-xs font-mono truncate">{CONTRACTS.registry.address}</p>
        </a>
      </div>

      <p className="text-emerald-900/50 text-xs text-center max-w-md">
        This frontend simulates the on-chain AI Firewall logic. The actual Intelligent Contracts are deployed and verified on GenLayer Studio Network — click any contract card above to verify on the explorer.
      </p>
    </div>
  );
}

export default App;
