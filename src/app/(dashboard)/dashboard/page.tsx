"use client";

import { CheckCircle2, Circle, MoreHorizontal, CheckCircle, Clock, Plus, CloudRain, Mail, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useQueue } from "@/context/QueueContext";
import { useRouter } from "next/navigation";

export default function StudentPortal() {
  const { state, dispatch } = useQueue();
  const router = useRouter();

  const departments = [
    { name: "Student Services", wait: "8 min", color: "bg-blue-500" },
    { name: "Financial Aid", wait: "15 min", color: "bg-green-500" },
    { name: "Admissions", wait: "5 min", color: "bg-yellow-500" },
    { name: "IT Support", wait: "12 min", color: "bg-purple-500" },
  ];

  const isInQueue = state.myQueues && state.myQueues.length > 0;
  const isInDeptQueue = (deptName: string) => state.myQueues && state.myQueues.some(q => q.dept === deptName);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen text-gray-200">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#333]">
        <h1 className="text-xl font-semibold text-white">Student Workspace</h1>
        <div className="flex gap-4 text-sm text-gray-400">
          <Clock className="w-5 h-5 cursor-pointer hover:text-white" />
          <Mail className="w-5 h-5 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Row 1: Setup / Progress */}
      <div className="bg-[#18181b] border border-[#333] rounded-sm p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-sm font-medium text-white">Profile Completion</span>
          <span className="text-sm font-bold text-white">80%</span>
          <div className="h-2 flex-1 bg-[#27272a] rounded-full overflow-hidden max-w-[200px]">
            <div className="h-full bg-blue-500 w-[80%] rounded-full"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-400 overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle2 className="w-4 h-4 text-blue-500" /> Account Created
          </div>
          <div className="flex items-center gap-2 text-white">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> ID Verified
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4" /> Campus Survey
          </div>
          <div className="flex items-center gap-2 text-blue-500 cursor-pointer">
            <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">i</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => router.push('/profile')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-sm transition-colors"
          >
            Complete Profile
          </button>
          <button 
            onClick={() => router.push('/profile')}
            className="bg-[#27272a] hover:bg-[#3f3f46] text-white text-sm font-medium px-4 py-2 rounded-sm transition-colors"
          >
            Skip
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Row 2 Left: Department "ToDo" List */}
        <div className="bg-[#18181b] border border-[#333] rounded-sm flex flex-col min-h-[400px]">
          <div className="p-4 border-b border-[#333] flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-white">Available Queues</span>
              <select className="bg-transparent border border-[#333] text-sm text-gray-300 py-1 px-2 rounded-sm focus:outline-none">
                <option>All Departments</option>
                <option>Admins Office</option>
                <option>Account Section</option>
                <option>Academics</option>
              </select>
            </div>
            <div className="flex gap-2 text-gray-400">
              <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
          </div>

          <div className="flex-1 p-2">
            {departments.map((dept, idx) => {
              const isMyDept = isInDeptQueue(dept.name);

              return (
                <div key={idx} className={`flex items-center justify-between p-3 border-b border-[#27272a] hover:bg-[#27272a]/50 transition-colors ${isMyDept ? 'border-l-4 border-l-blue-500 pl-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    {isMyDept ? (
                      <CheckCircle className="w-5 h-5 text-gray-500" />
                    ) : (
                      <button 
                        disabled={isMyDept}
                        onClick={() => {
                          dispatch({ type: "JOIN_QUEUE", payload: { dept: dept.name, name: "Arjun J." } });
                          router.push("/my-queue");
                        }}
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-white bg-green-500 hover:bg-green-600`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                    <span className={`text-sm ${isMyDept ? 'text-white font-medium' : 'text-gray-300'}`}>
                      {dept.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                      WAIT: {dept.wait}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${dept.color}`} />
                  </div>
                </div>
              );
            })}
            
            {isInQueue && (
              <div className="p-4 mt-4 bg-[#27272a]/30 border border-[#333] rounded-sm text-sm text-gray-400 space-y-2">
                {state.myQueues.map(q => (
                  <div key={q.dept} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" /> 
                    <span>You are currently waiting in the <strong className="text-gray-300">{q.dept}</strong> queue.</span>
                  </div>
                ))}
              </div>
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
              <Plus className="w-4 h-4 text-green-500" /> Need to schedule an appointment?
            </div>
            <span className="text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> 00:00</span>
          </div>

          <div className="flex-1 p-2">
            {/* Active Queue Items */}
            {state.myQueues && state.myQueues.map(q => (
              <div key={q.token} className="p-3 border-b border-[#27272a] flex items-start gap-3">
                <div className="mt-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-medium text-white">Waiting in Queue: {q.dept}</span>
                    <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">ACTIVE</span>
                  </div>
                  <p className="text-xs text-gray-400">Token: {q.token}</p>
                </div>
              </div>
            ))}
            
            {/* Schedule Item */}
            <div className="p-3 border-b border-[#27272a] flex items-start gap-3">
              <div className="mt-1">
                <CalendarIcon className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-white">Orientation Seminar</span>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">Start: 15:00</p>
                    <p className="text-[10px] text-gray-400">End: 16:00</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Main Auditorium</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Weather */}
        <div className="bg-[#18181b] border border-[#333] rounded-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-white">Thursday 24 Apr.</p>
              <p className="text-xs text-gray-500">Campus Ground</p>
            </div>
            <div className="flex gap-1 text-[10px] font-bold text-gray-400">
              <span className="bg-[#27272a] px-1 py-0.5 rounded-sm">°C</span>
              <span>°F</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-light text-white">+22°C</span>
            <div className="flex flex-col items-center">
              <CloudRain className="w-8 h-8 text-blue-400 mb-1" />
              <span className="text-[10px] text-gray-400">Light Rain</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-[#18181b] border border-[#333] rounded-sm p-4 flex flex-col justify-between">
          <div className="mb-4">
            <p className="text-sm font-medium text-white">Messages</p>
            <p className="text-xs text-gray-500">arjun@tempus.edu</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-sm flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-light text-white">4</p>
              <p className="text-xs text-gray-400">Unread notices</p>
            </div>
          </div>
        </div>

        {/* News */}
        <div className="bg-[#18181b] border border-[#333] rounded-sm p-4 md:col-span-2 overflow-hidden">
          <p className="text-sm font-medium text-white mb-4">Campus Announcements</p>
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm text-gray-300">Library renovations completed in East Wing.</p>
                <p className="text-xs text-gray-500 mt-1">Admin Office • Yesterday</p>
              </div>
              <span className="text-xs text-blue-500 whitespace-nowrap cursor-pointer hover:underline">Read more</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm text-gray-300">New elective registration opens next week.</p>
                <p className="text-xs text-gray-500 mt-1">Student Services • 2 days ago</p>
              </div>
              <span className="text-xs text-blue-500 whitespace-nowrap cursor-pointer hover:underline">Read more</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
