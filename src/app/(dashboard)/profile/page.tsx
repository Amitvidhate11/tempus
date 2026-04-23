"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, BookOpen, Shield, Save, Camera } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="p-8 max-w-4xl mx-auto h-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-gray-400">Manage your personal data and account preferences.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1a1a20]/80 backdrop-blur-md border border-[#333] rounded-3xl p-8 lg:p-12 shadow-xl"
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#2b91db] to-blue-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              AJ
            </div>
            <button className="absolute bottom-0 right-0 p-3 bg-[#0f0f13] border border-[#333] text-gray-400 hover:text-white hover:border-[#2b91db] rounded-full transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">Arjun J.</h2>
            <p className="text-[#2b91db] font-medium flex items-center justify-center md:justify-start gap-2">
              <Shield className="w-4 h-4" /> Student Access
            </p>
          </div>
          
          <div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-colors border ${
                isEditing 
                ? "bg-transparent border-[#333] text-gray-400 hover:text-white" 
                : "bg-[#2b91db]/10 border-[#2b91db]/20 text-[#2b91db] hover:bg-[#2b91db] hover:text-white"
              }`}
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <input 
              type="text" 
              defaultValue="Arjun J."
              disabled={!isEditing}
              className="w-full bg-[#0f0f13] border border-[#333] rounded-xl px-4 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-[#2b91db] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input 
              type="email" 
              defaultValue="arjun.j@university.edu"
              disabled={!isEditing}
              className="w-full bg-[#0f0f13] border border-[#333] rounded-xl px-4 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-[#2b91db] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone Number
            </label>
            <input 
              type="tel" 
              defaultValue="+1 (555) 123-4567"
              disabled={!isEditing}
              className="w-full bg-[#0f0f13] border border-[#333] rounded-xl px-4 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-[#2b91db] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Department / Major
            </label>
            <input 
              type="text" 
              defaultValue="Computer Science"
              disabled={!isEditing}
              className="w-full bg-[#0f0f13] border border-[#333] rounded-xl px-4 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-[#2b91db] transition-colors"
            />
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex justify-end"
          >
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-[#2b91db] hover:bg-[#207bbd] text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
