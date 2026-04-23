"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Building2, UserMinus, CheckCircle2, CircleDashed, AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { useQueue } from "@/context/QueueContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Prediction = {
  predicted_wait: number;
  confidence: "low" | "medium" | "high";
  reason: string;
};

function QueueStatusCard({ dept, token }: { dept: string, token: string }) {
  const { state, dispatch } = useQueue();
  
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchPrediction = async () => {
      setIsLoading(true);
      try {
        const queue = state.queues[dept] || [];
        const pos = queue.findIndex(q => q.token === token) + 1;
        
        if (pos <= 0) return;

        const res = await fetch("/api/predict-wait", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dept: dept, currentLength: pos }),
        });
        
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setPrediction(data);
        }
      } catch (error) {
        console.error("Failed to fetch AI prediction", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPrediction();
    const interval = setInterval(fetchPrediction, 60000); // Poll every 60s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [token, dept, state.queues]);

  const queue = state.queues[dept] || [];
  const position = queue.findIndex(q => q.token === token) + 1;
  
  // If student was removed from queue (called or skipped), don't render card
  if (position <= 0) return null;

  const etaFallback = position * 3;
  const currentEta = prediction ? prediction.predicted_wait : etaFallback;
  
  const maxPosition = 12;
  const progressPercent = Math.max(5, ((maxPosition - position) / maxPosition) * 100);

  const steps = [
    { id: 1, title: "Joined Queue", time: queue.find(q => q.token === token)?.joinedAt || "Just now", status: "completed", icon: CheckCircle2 },
    { id: 2, title: "Approaching", time: `Est. ~${Math.max(currentEta - 6, 2)} min`, status: position <= 3 ? "active" : "pending", icon: CircleDashed },
    { id: 3, title: "Your Turn", time: `Est. ~${currentEta} min`, status: position === 1 ? "active" : "pending", icon: Clock },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 relative">
      {/* Left Column: Position Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1a1a20]/80 backdrop-blur-md border border-[#333] rounded-3xl p-10 shadow-xl flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#2b91db]/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2b91db]/20 text-[#2b91db] text-sm font-medium mb-8 z-10 border border-[#2b91db]/30">
          <Building2 className="w-4 h-4" /> {dept}
        </div>

        <div className="z-10 mb-8">
          <h2 className="text-[120px] font-black text-white leading-none tracking-tighter">{position}</h2>
          <p className="text-xl text-gray-400 font-medium">people ahead of you</p>
        </div>

        <div className="w-full z-10 mb-8">
          <div className="flex justify-between items-end text-sm mb-2">
            <span className="text-gray-400 pb-1">Wait Progress</span>
            
            <div className="text-right flex flex-col items-end">
              {isLoading && !prediction ? (
                <div className="flex flex-col items-end gap-1.5 animate-pulse pt-1 pb-1">
                  <div className="h-4 w-24 bg-[#333] rounded"></div>
                  <div className="h-6 w-32 bg-[#333] rounded"></div>
                </div>
              ) : (
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    {prediction ? (
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                        prediction.confidence === 'high' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        prediction.confidence === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        <Sparkles className="w-3 h-3" /> {prediction.confidence} Confidence
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-gray-500/10 text-gray-400 border-gray-500/20">
                        Estimated
                      </span>
                    )}
                    <span className="text-[#2b91db] font-bold text-xl">
                      ~{currentEta} min ETA
                    </span>
                  </div>
                  {prediction?.reason && (
                    <span className="text-gray-500 italic text-xs max-w-xs text-right mt-0.5">
                      {prediction.reason}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full h-3 bg-[#2a2a35] rounded-full overflow-hidden mt-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[#2b91db] to-blue-400 rounded-full"
            />
          </div>
        </div>

        <button 
          onClick={() => {
            dispatch({ type: "LEAVE_QUEUE", payload: dept });
          }}
          className="w-full bg-transparent border border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 font-medium py-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 z-10"
        >
          <UserMinus className="w-5 h-5" /> Leave Queue
        </button>
      </motion.div>

      {/* Right Column: Timeline */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#1a1a20]/80 backdrop-blur-md border border-[#333] rounded-3xl p-10 shadow-xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-white">Timeline</h3>
          <span className="text-sm font-bold text-gray-400 tracking-widest bg-[#27272a] px-3 py-1 rounded-sm border border-[#333]">TOKEN: {token}</span>
        </div>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#2b91db] before:via-[#333] before:to-[#333]">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#1a1a20] shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2
                ${step.status === 'completed' ? 'bg-[#2b91db] text-white' : step.status === 'active' ? 'bg-[#2a2a35] border-[#2b91db] text-[#2b91db]' : 'bg-[#2a2a35] border-[#333] text-gray-500'}
              `}>
                <step.icon className="w-5 h-5" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-[#333] bg-[#0f0f13]/50">
                <div className="flex flex-col">
                  <span className={`font-bold ${step.status === 'pending' ? 'text-gray-500' : 'text-white'}`}>{step.title}</span>
                  <span className="text-sm text-gray-400">{step.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function MyQueue() {
  const { state } = useQueue();
  
  if (!state.myQueues || state.myQueues.length === 0) {
    return (
      <div className="p-8 max-w-6xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <AlertCircle className="w-16 h-16 text-gray-500 mb-6 mx-auto" />
          <h2 className="text-2xl font-bold text-white mb-2">You are not in any queue</h2>
          <p className="text-gray-400 mb-8">Join a queue from the student workspace to track your status here.</p>
          <Link 
            href="/dashboard"
            className="inline-flex bg-[#2b91db] hover:bg-[#207bbd] text-white px-8 py-3 rounded-xl font-medium transition-colors items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Workspace
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">My Active Queues</h1>
        <p className="text-gray-400">Track your positions with AI-enhanced ETAs in real-time.</p>
      </motion.div>

      {state.myQueues.map(q => (
        <QueueStatusCard key={q.dept} dept={q.dept} token={q.token} />
      ))}
    </div>
  );
}
