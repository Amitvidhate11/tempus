"use client";

import { useState } from "react";
import { CheckCircle2, Circle, MoreHorizontal, CheckCircle, Clock, Plus, Mail, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Users, CheckSquare, SkipForward, PhoneCall, X } from "lucide-react";
import { useQueue } from "@/context/QueueContext";

export default function StaffDashboard() {
  const { state, dispatch } = useQueue();
  const [showHistory, setShowHistory] = useState(false);
  const queueData = state.queues[state.staffSelectedDept] || [];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen text-gray-200">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#333]">
        <h1 className="text-xl font-semibold text-white">Staff Workspace</h1>
        <div className="flex gap-4 text-sm text-gray-400">
          <Clock className="w-5 h-5 cursor-pointer hover:text-white" />
          <Mail className="w-5 h-5 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Row 1: Setup / Progress */}
      <div className="bg-[#18181b] border border-[#333] rounded-sm p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-sm font-medium text-white">Counter Status</span>
          <select 
            value={state.staffSelectedDept}
            onChange={(e) => dispatch({ type: "SELECT_DEPT", payload: e.target.value })}
            className="bg-[#27272a] border border-[#333] text-sm text-white py-1.5 px-3 rounded-sm focus:outline-none"
          >
            <option value="Admin Office">Admin Office</option>
            <option value="Accounts">Accounts</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Assignment">Assignment</option>
          </select>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-400 overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-2 text-white">
            <Users className="w-4 h-4 text-blue-500" /> {queueData.length} Waiting
          </div>
          <div className="flex items-center gap-2 text-white">
            <Clock className="w-4 h-4 text-yellow-500" /> 3 min Avg Service
          </div>
          <div 
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 text-white cursor-pointer hover:text-blue-400 transition-colors"
          >
            <CheckSquare className="w-4 h-4 text-green-500" /> {state.history.length} Served Today
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            disabled={queueData.length === 0}
            onClick={() => dispatch({ type: "CALL_NEXT" })}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400 text-white text-sm font-medium px-4 py-2 rounded-sm transition-colors flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" /> Call Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Row 2 Left: Queue List (ToDo style) */}
        <div className="bg-[#18181b] border border-[#333] rounded-sm flex flex-col min-h-[400px]">
          <div className="p-4 border-b border-[#333] flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-white">Live Queue</span>
            </div>
            <div className="flex gap-2 text-gray-400">
              <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
          </div>

          <div className="flex-1 p-2 overflow-y-auto max-h-[350px]">
            {queueData.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No students currently in queue.
              </div>
            ) : (
              queueData.map((row, index) => (
                <div key={row.token} className="flex items-center justify-between p-3 border-b border-[#27272a] hover:bg-[#27272a]/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider w-8">
                      {row.token}
                    </span>
                    <span className="text-sm text-gray-200 font-medium">
                      {row.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">
                      WAIT: ~{index * 3}m
                    </span>
                    {index === 0 ? (
                      <button 
                        onClick={() => dispatch({ type: "SKIP" })}
                        className="text-[10px] uppercase font-bold bg-[#27272a] hover:bg-[#3f3f46] text-gray-300 px-2 py-1 rounded-sm flex items-center gap-1 transition-colors"
                      >
                        <SkipForward className="w-3 h-3" /> Skip
                      </button>
                    ) : (
                      <span className="text-[10px] text-gray-500 w-[52px] text-right">Waiting</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Row 2 Right: My Agenda / Schedule */}
        <div className="bg-[#18181b] border border-[#333] rounded-sm flex flex-col min-h-[400px]">
          <div className="p-4 border-b border-[#333] flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-white">My Agenda</span>
              <select className="bg-transparent border border-[#333] text-sm text-gray-300 py-1 px-2 rounded-sm focus:outline-none">
                <option>Today</option>
              </select>
            </div>
            <div className="flex gap-2 text-gray-400">
              <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Calendar Strip */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272a] bg-[#111115]">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <div key={idx} className={`flex flex-col items-center gap-1 ${idx === 3 ? 'text-white' : 'text-gray-500'}`}>
                <span className="text-[10px] font-bold">{day}</span>
                <span className={`text-xs ${idx === 3 ? 'w-6 h-6 flex items-center justify-center bg-[#27272a] rounded-sm border-b-2 border-blue-500' : ''}`}>
                  {21 + idx}
                </span>
                {idx === 3 && <div className="w-1 h-1 rounded-full bg-orange-500 mt-1" />}
              </div>
            ))}
            <div className="flex gap-1 ml-4 border-l border-[#333] pl-4">
              <button className="w-6 h-6 rounded-sm bg-[#27272a] flex items-center justify-center hover:bg-[#3f3f46]"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-6 h-6 rounded-sm bg-[#27272a] flex items-center justify-center hover:bg-[#3f3f46]"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="p-4 border-b border-[#27272a] flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Plus className="w-4 h-4 text-green-500" /> Schedule team meeting?
            </div>
            <span className="text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> 00:00</span>
          </div>

          <div className="flex-1 p-2">
            {/* Active Task */}
            {queueData.length > 0 && (
              <div className="p-3 border-b border-[#27272a] flex items-start gap-3">
                <div className="mt-1">
                  <PhoneCall className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-white">Serving Student</span>
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">ACTIVE</span>
                  </div>
                  <p className="text-xs text-gray-400">{queueData[0].name} ({queueData[0].token})</p>
                </div>
              </div>
            )}
            
            {/* Schedule Item */}
            <div className="p-3 border-b border-[#27272a] flex items-start gap-3">
              <div className="mt-1">
                <CalendarIcon className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-white">Lunch Break</span>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">Start: 13:00</p>
                    <p className="text-[10px] text-gray-400">End: 14:00</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Staff Cafeteria</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Widgets (No Weather) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Messages */}
        <div className="bg-[#18181b] border border-[#333] rounded-sm p-4 flex flex-col justify-between">
          <div className="mb-4">
            <p className="text-sm font-medium text-white">Internal Messages</p>
            <p className="text-xs text-gray-500">staff@tempus.edu</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-sm flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-light text-white">2</p>
              <p className="text-xs text-gray-400">Unread memos</p>
            </div>
          </div>
        </div>

        {/* News */}
        <div className="bg-[#18181b] border border-[#333] rounded-sm p-4 overflow-hidden">
          <p className="text-sm font-medium text-white mb-4">Staff Announcements</p>
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm text-gray-300">New queue management protocol.</p>
                <p className="text-xs text-gray-500 mt-1">Admin Office • Yesterday</p>
              </div>
              <span className="text-xs text-blue-500 whitespace-nowrap cursor-pointer hover:underline">Read more</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm text-gray-300">System maintenance scheduled for Friday night.</p>
                <p className="text-xs text-gray-500 mt-1">IT Support • 2 days ago</p>
              </div>
              <span className="text-xs text-blue-500 whitespace-nowrap cursor-pointer hover:underline">Read more</span>
            </div>
          </div>
        </div>

      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-[#18181b] border border-[#333] rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-5 border-b border-[#333] flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Completed Tasks</h2>
                <p className="text-sm text-gray-400">History of students served today.</p>
              </div>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {state.history.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No students have been served yet today.
                </div>
              ) : (
                <div className="divide-y divide-[#27272a]">
                  {state.history.map((entry, idx) => (
                    <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#27272a]/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded bg-[#27272a] border border-[#333] flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] text-gray-400">Token</span>
                          <span className="text-xs font-bold text-white">{entry.token}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{entry.name}</p>
                          <p className="text-xs text-gray-400 mt-1">Task: <span className="text-gray-300">{entry.task}</span></p>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 md:gap-1 text-sm md:text-xs text-gray-500">
                        <span>Joined: {entry.joinedAt}</span>
                        <span className="text-green-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Done: {entry.completedAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[#333] flex justify-end">
              <button 
                onClick={() => setShowHistory(false)}
                className="bg-[#27272a] hover:bg-[#3f3f46] text-white text-sm font-medium px-6 py-2 rounded-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
