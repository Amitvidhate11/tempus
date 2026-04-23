"use client";

import { 
  Area, 
  AreaChart, 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  Line, 
  LineChart, 
  CartesianGrid 
} from "recharts";
import { MoreHorizontal, Plus, Minus, MapPin, ChevronRight, Settings } from "lucide-react";

// Mock Data
const deptData = [
  { name: 'Student Services', value: 450, color: '#3b82f6' }, // Blue
  { name: 'Financial Aid', value: 250, color: '#22c55e' }, // Green
  { name: 'Admissions', value: 200, color: '#eab308' }, // Yellow
  { name: 'IT Support', value: 100, color: '#a1a1aa' }, // Gray
];

const waitTimeData = [
  { time: '8 AM', actual: 12, predicted: 10 },
  { time: '10 AM', actual: 25, predicted: 22 },
  { time: '12 PM', actual: 45, predicted: 40 },
  { time: '2 PM', actual: 30, predicted: 35 },
  { time: '4 PM', actual: 15, predicted: 18 },
  { time: '6 PM', actual: 5, predicted: 8 },
];

const queueTrendData = [
  { time: '8 AM', services: 5, financial: 2, admissions: 1 },
  { time: '10 AM', services: 15, financial: 8, admissions: 5 },
  { time: '12 PM', services: 35, financial: 20, admissions: 15 },
  { time: '2 PM', services: 20, financial: 15, admissions: 10 },
  { time: '4 PM', services: 10, financial: 5, admissions: 3 },
  { time: '6 PM', services: 2, financial: 1, admissions: 0 },
];

const totalQueued = deptData.reduce((acc, curr) => acc + curr.value, 0);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#18181b] border border-[#333] p-3 rounded-sm shadow-xl">
        <p className="text-white text-xs font-bold mb-2 uppercase">{label || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-400 capitalize">{entry.name}:</span>
            <span className="text-white font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminAnalytics() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen flex flex-col gap-6 text-gray-200">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2 pb-4 border-b border-[#333]">
        <h1 className="text-xl font-semibold text-white">System Analytics</h1>
        <div className="flex gap-4 text-sm text-gray-400">
          <Settings className="w-5 h-5 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* KPI Flat Bar */}
      <div className="bg-[#18181b] border border-[#333] rounded-sm p-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="text-sm font-semibold text-white mr-4">Overview</div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white leading-none">12K+</span>
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">Total Queued</span>
          </div>
          <div className="h-8 w-px bg-[#333] mx-2"></div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white leading-none">81%</span>
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">AI Accuracy</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <select className="bg-transparent border border-[#333] text-gray-300 py-1.5 px-3 rounded-sm focus:outline-none">
            <option>Today</option>
            <option>This Week</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-sm transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Donut + Area */}
        <div className="flex flex-col gap-6">
          
          {/* Donut Chart: Queue Volume by Dept */}
          <div className="bg-[#18181b] border border-[#333] rounded-sm flex flex-col h-[380px]">
            <div className="p-4 border-b border-[#333] flex justify-between items-center">
              <span className="text-sm font-semibold text-white">Queues by Department</span>
              <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
            </div>
            
            <div className="flex-1 flex items-center p-4">
              <div className="w-1/2 h-[220px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deptData}
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {deptData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                  <span className="text-2xl font-bold text-white">{totalQueued}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total</span>
                </div>
              </div>

              {/* Legend */}
              <div className="w-1/2 flex flex-col gap-5 pl-8">
                {deptData.map((dept, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }} />
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{dept.name}</span>
                    </div>
                    <span className="text-xl font-light text-white ml-4">{dept.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stream Chart: Wait Times */}
          <div className="bg-[#18181b] border border-[#333] rounded-sm flex flex-col h-[380px]">
            <div className="p-4 border-b border-[#333] flex justify-between items-center">
              <span className="text-sm font-semibold text-white">Wait Time Analysis</span>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#2a2a35] border border-[#444] rounded-full"></div> Predicted</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Actual</div>
              </div>
            </div>

            <div className="flex-1 -mx-2 -mb-2 mt-4 relative overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waitTimeData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3f3f46" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#3f3f46" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#52525b" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPredicted)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorActual)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
              
              <div className="absolute top-4 left-6">
                <h4 className="text-2xl font-light text-white">45<span className="text-sm text-gray-500 ml-1">min</span></h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Peak Actual Wait</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Map + Line Chart */}
        <div className="flex flex-col gap-6">
          
          {/* Map Preview (Campus Hotspots) */}
          <div className="bg-[#18181b] border border-[#333] rounded-sm flex flex-col h-[380px]">
            <div className="p-4 border-b border-[#333] flex justify-between items-center">
              <span className="text-sm font-semibold text-white">Campus Hotspots</span>
              <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
            </div>
            
            <div className="flex-1 relative bg-[#111115] m-4 border border-[#27272a] rounded-sm overflow-hidden flex items-center justify-center">
              {/* Abstract Campus Map SVG */}
              <svg width="80%" height="80%" viewBox="0 0 400 300" className="opacity-60">
                <path d="M50 50 L150 20 L250 50 L350 20 L380 150 L250 280 L150 280 L20 150 Z" fill="#18181b" stroke="#333" strokeWidth="1" strokeLinejoin="round"/>
                <path d="M100 80 L200 60 L300 80 L320 150 L200 230 L100 230 L80 150 Z" fill="#27272a" stroke="#444" strokeWidth="1" strokeLinejoin="round"/>
                <line x1="200" y1="60" x2="200" y2="230" stroke="#444" strokeWidth="1" />
                <line x1="80" y1="150" x2="320" y2="150" stroke="#444" strokeWidth="1" />
              </svg>

              {/* Hotspots */}
              <div className="absolute top-[35%] left-[30%]">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-4 bg-yellow-500/20 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-[#111] relative z-10" />
                  <div className="absolute top-6 -left-12 bg-[#18181b] border border-[#333] p-2 rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity w-32 pointer-events-none z-20">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Admissions</p>
                    <p className="text-sm font-bold text-white mt-1">200 Queued</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-[60%] left-[45%]">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-6 bg-blue-500/20 rounded-full animate-pulse" />
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-[#111] relative z-10" />
                  <div className="absolute top-8 -left-16 bg-[#18181b] border border-[#333] p-2 rounded-sm shadow-xl z-20">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Student Services</p>
                    <p className="text-sm font-bold text-white mt-1">450 Queued</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-[40%] left-[65%]">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-3 bg-green-500/20 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-green-500 rounded-full border-2 border-[#111] relative z-10" />
                  <div className="absolute top-5 -left-12 bg-[#18181b] border border-[#333] p-2 rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity w-32 pointer-events-none z-20">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Financial Aid</p>
                    <p className="text-sm font-bold text-white mt-1">250 Queued</p>
                  </div>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                <button className="w-6 h-6 rounded-sm bg-[#18181b] border border-[#333] hover:bg-[#27272a] flex items-center justify-center text-white transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
                <button className="w-6 h-6 rounded-sm bg-[#18181b] border border-[#333] hover:bg-[#27272a] flex items-center justify-center text-white transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Queue Trend Line Chart */}
          <div className="bg-[#18181b] border border-[#333] rounded-sm flex flex-col h-[380px]">
            <div className="p-4 border-b border-[#333] flex justify-between items-center">
              <span className="text-sm font-semibold text-white">Queue Length Trend</span>
              <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
            </div>

            <div className="flex-1 -ml-6 mt-4 mb-2 mr-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={queueTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#52525b" 
                    tick={{ fill: '#71717a', fontSize: 10 }} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#52525b" 
                    tick={{ fill: '#71717a', fontSize: 10 }} 
                    tickLine={false} 
                    axisLine={false} 
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="services" name="Student Services" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#3b82f6', stroke: '#18181b', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="financial" name="Financial Aid" stroke="#22c55e" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="admissions" name="Admissions" stroke="#eab308" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="absolute top-0 right-4 flex gap-4">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><span className="text-[10px] text-gray-400">Services</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-[10px] text-gray-400">Financial</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div><span className="text-[10px] text-gray-400">Admissions</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
