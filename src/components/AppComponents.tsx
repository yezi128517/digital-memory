import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Keyboard, Search, Settings, Plus, Heart, Users, Calendar, BarChart3, Home, Brain, User, Sparkles, X, ChevronRight, SlidersHorizontal, ShieldCheck, Bell, Database, Info } from 'lucide-react';
import { TabType, AppState } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { name: TabType; icon: React.ElementType }[] = [
    { name: '主页', icon: Home },
    { name: '记忆', icon: Brain },
    { name: 'AI助手', icon: Sparkles },
    { name: '关系', icon: Users },
    { name: '个人', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 pt-3 pb-8 flex justify-between items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;
        
        if (tab.name === 'AI助手') {
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative -top-8 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(6,182,212,0.3)] transition-all duration-500 ${
                isActive ? 'bg-gradient-to-br from-cyan-400 to-emerald-400 text-white scale-110 rotate-12' : 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white'
              }`}
            >
              <Icon size={32} fill={isActive ? "rgba(255,255,255,0.3)" : "none"} />
              {isActive && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 rounded-full bg-cyan-400 blur-2xl -z-10 opacity-60"
                />
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 group ${
              isActive ? 'text-cyan-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-cyan-50' : 'bg-transparent'}`}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-bold tracking-tight ${isActive ? 'opacity-100' : 'opacity-60'}`}>
              {tab.name}
            </span>
          </button>
        );
      })}
      
      {/* Home Indicator Line (iOS style) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-200 rounded-full opacity-40" />
    </div>
  );
};

export const HomeTab: React.FC<{ state: AppState, onToggleLike?: () => void }> = ({ state, onToggleLike }) => (
  <div className="p-6 pb-32 space-y-8 bg-[#F8F9FA] min-h-screen">
    <header className="flex justify-between items-start">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">星期二, 3月3日</p>
        <h1 className="text-4xl font-medium mt-1 serif">Good Morning</h1>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white"
      >
        <img 
          src="https://images.unsplash.com/photo-1543158181-e6f9f670c5b5?auto=format&fit=crop&q=80&w=200" 
          className="w-full h-full object-cover" 
          alt="avatar" 
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </header>

    {/* Featured Memory Spotlight */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative h-48 rounded-[40px] overflow-hidden shadow-2xl group cursor-pointer"
    >
      <img 
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        alt="featured"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">一年前的今天</p>
          <h3 className="text-white text-2xl font-medium serif">湖畔的宁静午后</h3>
        </div>
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike?.();
          }}
          className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-colors ${state.featuredLiked ? 'text-pink-500' : 'text-white'}`}
        >
          <Heart size={18} fill={state.featuredLiked ? "currentColor" : "none"} />
        </motion.button>
      </div>
    </motion.div>

    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input 
        type="text" 
        placeholder="询问任何关于你的记忆吧..." 
        className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-cyan-100 focus:outline-none text-sm transition-all"
      />
      <button 
        onClick={() => state.activeTab === 'AI助手' ? null : window.dispatchEvent(new CustomEvent('setTab', { detail: 'AI助手' }))}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-cyan-400/10 text-cyan-500 px-3 py-1 rounded-full text-xs font-medium hover:bg-cyan-400/20 transition-colors active:scale-95"
      >
        ✨ AI
      </button>
    </div>

    <div className="grid grid-cols-4 gap-4">
      {[
        { label: '总记忆', value: '5,867', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
        { label: '关系', value: '32', icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-50' },
        { label: '今日', value: '7', icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: '积极指数', value: '88%', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
      ].map((stat, i) => (
        <motion.div 
          key={i} 
          whileTap={{ scale: 0.95 }}
          className="bg-white p-4 rounded-3xl shadow-sm space-y-3 cursor-pointer hover:shadow-md transition-all border border-gray-50"
        >
          <div className={`w-8 h-8 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
            <stat.icon size={16} />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">{stat.value}</p>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <section className="space-y-4">
      <h2 className="text-lg font-semibold">记忆时刻</h2>
      <div className="space-y-4">
        {state.memories.map((memory, i) => (
          <motion.div 
            key={memory.id} 
            whileHover={{ y: -4 }}
            onClick={() => alert(`查看记忆: ${memory.title}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50 cursor-pointer relative"
          >
            <div className="relative">
              <img src={memory.imageUrl} className="w-full h-48 object-cover" alt={memory.title} referrerPolicy="no-referrer" />
              {/* Emotion Dot - Randomized colors */}
              <div className={`absolute top-4 left-4 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                i % 3 === 0 ? 'bg-red-400' : i % 3 === 1 ? 'bg-emerald-400' : 'bg-purple-400'
              }`} />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{memory.title}</h3>
                <span className="text-gray-400 text-xs">{memory.date}</span>
              </div>
              <div className="flex gap-2">
                {memory.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

import { GoogleGenAI, Modality } from "@google/genai";

export const AIAssistantTab: React.FC<{ state: AppState }> = ({ state }) => {
  const [isVoice, setIsVoice] = React.useState(false);
  const [isThinking, setIsThinking] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [colors, setColors] = React.useState(['#E0F2F1', '#B2DFDB', '#80CBC4']);
  const [messages, setMessages] = React.useState<{ role: 'user' | 'ai'; content: string; type?: 'text' | 'image'; imageUrl?: string }[]>([
    { role: 'ai', content: '好的，让我帮你整理今天的记忆。今天你都做了什么有意思的事情呢？' }
  ]);
  const [generatedMemories, setGeneratedMemories] = React.useState<{ title: string; date: string; mood: string; color: string; img: string }[]>([]);
  const [showQuickActions, setShowQuickActions] = React.useState(true);
  const [voiceType, setVoiceType] = React.useState('温柔');
  const [showVoiceMenu, setShowVoiceMenu] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  const voiceOptions = ['温柔', '磁性', '清亮', '沉稳', '活泼'];

  const speakResponse = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `用${voiceType}的语气说：${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { 
                voiceName: voiceType === '温柔' ? 'Kore' : voiceType === '磁性' ? 'Fenrir' : 'Zephyr' 
              },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioSrc = `data:audio/mp3;base64,${base64Audio}`;
        const audio = new Audio(audioSrc);
        audio.play();
      } else {
        // Fallback to Web Speech API if Gemini TTS fails or returns no data
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("TTS Error:", error);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("您的浏览器不支持语音识别。");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      handleSendMessage(transcript);
    };

    recognition.start();
  };

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    setInputValue('');
    setIsThinking(true);
    setShowQuickActions(false);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `你是一个温柔的数字记忆助手。用户说：${messageToSend}。请根据这段对话，如果用户描述了一段具体的经历，请以JSON格式返回一个可能的记忆卡片信息（包含title, mood, color），否则只返回文字回复。JSON格式示例：{"memory": {"title": "咖啡馆闲坐", "mood": "惬意", "color": "bg-yellow-400"}, "reply": "听起来很棒..."}`,
        config: {
          systemInstruction: "你是一个名为'椰子'的数字记忆助手。你的语气应该温柔、体贴。你会帮助用户记录、整理和理解他们的记忆。保持简洁，通常在2-3句话以内。",
        }
      });

      const aiText = response.text || "";
      let finalReply = aiText;
      
      try {
        const jsonMatch = aiText.match(/\{.*\}/s);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[0]);
          if (data.memory) {
            setGeneratedMemories(prev => [
              { 
                ...data.memory, 
                date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
                img: `https://picsum.photos/seed/${Math.random()}/400/400`
              },
              ...prev 
            ]);
          }
          finalReply = data.reply || aiText.replace(/\{.*\}/s, '').trim();
        }
      } catch (e) {
        // Fallback
      }
      
      setIsThinking(false);
      setIsSpeaking(true);
      setMessages(prev => [...prev, { role: 'ai', content: finalReply }]);
      speakResponse(finalReply);
      
      setTimeout(() => setIsSpeaking(false), Math.min(finalReply.length * 150, 4000));
    } catch (error) {
      console.error("AI Error:", error);
      setIsThinking(false);
      setMessages(prev => [...prev, { role: 'ai', content: "抱歉，我现在连接有点不稳定。但我一直在这里陪着你。" }]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMessages(prev => [...prev, { role: 'user', content: '上传了一张照片', type: 'image', imageUrl }]);
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setIsSpeaking(true);
        const response = '这张照片色彩很丰富。我检测到了“快乐”和“平静”的情绪。你想为它添加更多细节吗？';
        setMessages(prev => [...prev, { role: 'ai', content: response }]);
        setTimeout(() => setIsSpeaking(false), 3000);
      }, 1500);
    }
  };

  return (
    <div className="relative h-screen bg-[#FDFEFE] text-gray-800 overflow-hidden flex flex-col">
      {/* Dreamy Background Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-100/30 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-emerald-50/40 rounded-full blur-[150px]" 
        />
      </div>

      {/* Top Navigation */}
      <nav className="relative z-30 pt-10 px-8 flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AI助手</h1>
          <p className="text-gray-400 text-xs font-medium">记录、整理与理解你的记忆</p>
        </div>
        <div className="flex gap-3 relative">
          <div className="relative">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVoiceMenu(!showVoiceMenu)}
              className="px-4 py-2 bg-white/60 backdrop-blur-md border border-gray-100 rounded-full text-[11px] font-bold text-cyan-600 shadow-sm flex items-center gap-2"
            >
              <Mic size={14} />
              音色: {voiceType}
            </motion.button>
            
            <AnimatePresence>
              {showVoiceMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-24 bg-white/90 backdrop-blur-xl border border-white shadow-xl rounded-2xl p-1.5 z-[60]"
                >
                  {voiceOptions.map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => {
                        setVoiceType(opt);
                        setShowVoiceMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold transition-colors ${voiceType === opt ? 'bg-cyan-50 text-cyan-500' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(true)}
            className="p-2.5 bg-white/60 backdrop-blur-md border border-gray-100 rounded-full text-cyan-500 shadow-sm"
          >
            <Settings size={18} />
          </motion.button>
        </div>
      </nav>

      {/* Settings Modal (AI Assistant) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            onClick={() => setShowSettings(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] p-8 w-full max-w-xs space-y-6 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900">助手设置</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">主动对话</span>
                  <div className="w-10 h-5 bg-cyan-400 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">记忆同步</span>
                  <div className="w-10 h-5 bg-cyan-400 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-3 bg-gray-900 text-white rounded-2xl font-bold"
              >
                完成
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div className="flex-1 relative flex flex-col overflow-hidden mt-4">
        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar space-y-8">
          {/* Quick Action Cards */}
          {showQuickActions && (
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {[
                { label: '记录今天发生的事情', icon: Calendar, color: 'bg-emerald-50 text-emerald-500' },
                { label: '整理最近的回忆', icon: Brain, color: 'bg-cyan-50 text-cyan-500' },
              ].map((action, i) => (
                <motion.button 
                  key={i}
                  whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSendMessage(action.label)}
                  className="bg-white border border-gray-50 p-5 rounded-[32px] text-left space-y-4 shadow-sm transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center shadow-inner`}>
                    <action.icon size={24} />
                  </div>
                  <p className="text-[14px] text-gray-800 font-bold leading-snug">{action.label}</p>
                </motion.button>
              ))}
            </div>
          )}

          {/* Central Visual - Soft Liquid Glass Visualizer */}
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center mx-auto pointer-events-none">
            {/* Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, (Math.random() - 0.5) * 200, 0],
                  y: [0, (Math.random() - 0.5) * 200, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
                className="absolute w-2 h-2 rounded-full bg-cyan-300/40 blur-[2px]"
              />
            ))}

            {/* Soft Ripple Effect */}
            <AnimatePresence>
              {(inputValue || isThinking || isSpeaking) && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: isThinking ? [1, 1.4, 1] : [1, 2, 1], 
                    opacity: isThinking ? [0.1, 0.2, 0.1] : [0.05, 0.15, 0.05] 
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-72 h-72 rounded-full bg-cyan-100/50 blur-[60px]"
                />
              )}
            </AnimatePresence>

            {/* Organic Liquid Particle Body */}
            <motion.div
              animate={{ 
                scale: isThinking ? 0.8 : isSpeaking ? 1.25 : 1,
                opacity: isThinking ? 0.8 : 0.5,
                backgroundColor: isThinking ? '#004D40' : isSpeaking ? '#4DB6AC' : '#B2DFDB',
                rotate: [0, 360]
              }}
              transition={{ 
                scale: { duration: 2, ease: "easeInOut" },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
              className="absolute w-64 h-64 rounded-full blur-[110px]"
              style={{ background: `radial-gradient(circle, ${colors[0]}AA 0%, transparent 75%)` }}
            />

            {/* Core Organic Liquid Blob - Water Drop Shape */}
            <motion.div
              animate={{
                borderRadius: isThinking 
                  ? ["45% 55% 48% 52% / 52% 48% 55% 45%", "52% 48% 55% 45% / 45% 55% 48% 52%"]
                  : isSpeaking
                  ? ["35% 65% 70% 30% / 40% 40% 60% 60%", "65% 35% 30% 70% / 60% 60% 40% 40%", "40% 60% 40% 60% / 70% 30% 70% 30%"]
                  : ["48% 52% 55% 45% / 50% 50% 50% 50%", "52% 48% 45% 55% / 50% 50% 50% 50%", "45% 55% 50% 50% / 55% 45% 50% 50%"],
                scale: isThinking ? 0.85 : isSpeaking ? 1.2 : 1,
                rotate: isThinking ? [0, 360] : isSpeaking ? [0, 180, 0] : [0, 90, 0],
                y: isSpeaking ? [0, -10, 0] : 0
              }}
              transition={{ 
                duration: isThinking ? 5 : isSpeaking ? 4 : 15, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-48 h-48 backdrop-blur-3xl border border-white/70 shadow-[inset_0_0_80px_rgba(255,255,255,0.5)] overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${colors[0]}77 0%, ${colors[1]}55 50%, ${colors[2]}77 100%)`,
                boxShadow: isSpeaking ? '0 0 100px rgba(79, 209, 197, 0.4)' : '0 25px 60px rgba(0,0,0,0.03)'
              }}
            />
          </div>

          {/* Chat Messages */}
          <div className="max-w-md mx-auto space-y-8">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-[32px] px-7 py-5 text-[15px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-cyan-500 text-white rounded-tr-none shadow-cyan-200/50' 
                    : 'bg-white border border-gray-50 text-gray-700 rounded-tl-none'
                }`}>
                  {msg.type === 'image' ? (
                    <div className="space-y-3">
                      <img src={msg.imageUrl} className="rounded-2xl w-full max-h-56 object-cover shadow-sm" alt="uploaded" />
                      <p className="text-[12px] opacity-70 italic font-medium">{msg.content}</p>
                    </div>
                  ) : (
                    <p className="font-medium">{msg.content}</p>
                  )}
                </div>
              </motion.div>
            ))}

                {/* AI Action Chips */}
                {messages[messages.length - 1]?.role === 'ai' && !isThinking && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2.5 pt-2"
                  >
                    {[
                      { label: '生成记忆摘要', icon: Calendar, action: () => alert('正在生成摘要...') },
                      { label: '添加情绪标签', icon: Heart, action: () => alert('已自动识别情绪：积极') },
                      { label: '归档到记忆库', icon: Brain, action: () => alert('已成功归档') },
                    ].map((chip, i) => (
                      <motion.button 
                        key={i}
                        whileHover={{ scale: 1.05, backgroundColor: '#C2DFCD' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={chip.action}
                        className="flex items-center gap-2.5 px-5 py-2.5 bg-[#D1E7D9] border border-[#B8D8C5] rounded-full text-[12px] text-[#4A7A58] font-bold shadow-sm transition-colors"
                      >
                        <chip.icon size={16} />
                        {chip.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

            {/* Generated Memories Preview */}
            {generatedMemories.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pt-10 space-y-5"
              >
                <div className="flex items-center gap-3 text-gray-400 px-2">
                  <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Brain size={18} />
                  </div>
                  <span className="text-[12px] font-bold tracking-[0.2em] uppercase">为你生成了以下记忆</span>
                </div>
                <div className="space-y-4">
                  {generatedMemories.map((mem, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border border-gray-50 rounded-[40px] p-5 flex gap-5 items-center shadow-sm cursor-pointer hover:shadow-md transition-all"
                    >
                      <img src={mem.img} className="w-20 h-20 rounded-[28px] object-cover shadow-sm" alt={mem.title} />
                      <div className="flex-1 space-y-1">
                        <h4 className="text-[16px] font-bold text-gray-900">{mem.title}</h4>
                        <p className="text-[12px] text-gray-400 font-medium">{mem.date}</p>
                      </div>
                      <div className="flex items-center gap-2.5 bg-gray-50/80 px-4 py-2 rounded-full border border-gray-100">
                        <div className={`w-2.5 h-2.5 rounded-full ${mem.color} shadow-sm`} />
                        <span className="text-[12px] text-gray-600 font-bold">{mem.mood}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Dialogue Bar */}
        <div className="relative z-20 px-8 pb-32 pt-6 bg-gradient-to-t from-white via-white/90 to-transparent">
          <div className="max-w-md mx-auto relative flex items-center gap-4">
            <div className="flex-1 relative group">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="和椰子聊聊你的记忆..." 
                className="w-full bg-white/80 backdrop-blur-2xl border border-white rounded-[40px] py-6 pl-8 pr-16 shadow-2xl focus:ring-4 focus:ring-cyan-100 focus:outline-none text-[15px] font-medium transition-all placeholder:text-gray-300"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <label htmlFor="chat-image-upload" className="p-2 text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors">
                  <Plus size={20} />
                  <input 
                    type="file" 
                    id="chat-image-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isThinking}
                  className="w-11 h-11 bg-cyan-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-cyan-600 transition-all active:scale-90 disabled:opacity-50 disabled:scale-100"
                >
                  <Sparkles size={20} />
                </button>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={isListening ? () => {} : startListening}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-cyan-500'
              }`}
            >
              <Mic size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MemoryTab: React.FC<{ state: AppState }> = ({ state }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState('地点');
  const [localMemories, setLocalMemories] = React.useState([
    { title: '山林', count: 67, img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=400' },
    { title: '上海', count: 623, img: 'https://picsum.photos/seed/shanghai/200/200' },
    { title: '咖啡馆', count: 130, img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400' },
    { title: '普洱', count: 320, img: 'https://picsum.photos/seed/tea/200/200' },
    { title: '学校', count: 496, img: 'https://picsum.photos/seed/school/200/200' },
  ]);

  const handleAddMemory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newTitle = prompt('请输入记忆分类名称:', '新记忆') || '新记忆';
      setLocalMemories(prev => [
        ...prev,
        { title: newTitle, count: 1, img: url }
      ]);
    }
  };

  const filteredMemories = localMemories.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 pb-32 space-y-6 bg-[#F8F9FA] min-h-screen relative">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-medium text-gray-900 serif">记忆库</h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">5,867 Memories Collected</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setIsSearching(!isSearching);
              setIsFiltering(false);
            }}
            className={`p-3 rounded-2xl transition-all ${isSearching ? 'bg-cyan-500 text-white shadow-xl' : 'bg-white text-cyan-500 shadow-sm border border-gray-50'}`}
          >
            <Search size={22} />
          </button>
          <button 
            onClick={() => {
              setIsFiltering(!isFiltering);
              setIsSearching(false);
            }}
            className={`p-3 rounded-2xl transition-all ${isFiltering ? 'bg-cyan-500 text-white shadow-xl' : 'bg-white text-cyan-500 shadow-sm border border-gray-50'}`}
          >
            <SlidersHorizontal size={22} />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearching && (
          <motion.div 
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索记忆分类..."
                className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-cyan-100 focus:outline-none text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Overlay */}
      <AnimatePresence>
        {isFiltering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="bg-white p-5 rounded-3xl shadow-xl border border-gray-50 space-y-4 z-30 relative"
          >
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">筛选标准</h3>
            <div className="flex flex-wrap gap-2">
              {['按热度', '按时间', '按情绪', '仅看照片', '仅看文字', '最近添加'].map(f => (
                <button key={f} className="px-4 py-2 bg-gray-50 hover:bg-cyan-400 hover:text-white text-[11px] text-gray-500 rounded-full transition-all font-medium">
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <div className="bg-gray-200/50 p-1 rounded-2xl flex gap-1">
        {['时间', '关系', '地点'].map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 py-2.5 text-xs font-medium rounded-xl transition-all ${activeFilter === filter ? 'bg-white shadow-sm text-cyan-500' : 'text-gray-400'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Emotion Spectrum Card */}
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">情绪色谱</h2>
          <span className="text-xs font-bold text-cyan-500 bg-cyan-50 px-3 py-1 rounded-full">实时同步</span>
        </div>
        
        <div className="space-y-6">
          {/* Refined Gradient Spectrum */}
          <div className="relative h-4 w-full bg-gradient-to-r from-[#FF3B30] via-[#FFCC00] via-[#4CD964] via-[#007AFF] to-[#AF52DE] rounded-full cursor-pointer group shadow-inner">
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-full z-10 cursor-grab active:cursor-grabbing flex items-center justify-center"
              style={{ left: `${state.emotionScore}%` }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
            </motion.div>
          </div>
          
          <div className="flex justify-between items-center px-1">
            <div className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FF3B30] shadow-[0_4px_10px_rgba(255,59,48,0.3)]" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">积极</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FFCC00] shadow-[0_4px_10px_rgba(255,204,0,0.3)]" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">中性</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#AF52DE] shadow-[0_4px_10px_rgba(175,82,222,0.3)]" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">消极</span>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Management Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-800">记忆管理</h2>
          <motion.button 
            whileHover={{ x: 5 }}
            onClick={() => alert('更多管理选项...')}
            className="text-gray-300 hover:text-cyan-500 transition-colors"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredMemories.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert(`打开分类: ${item.title}`)}
              className="relative rounded-[24px] overflow-hidden aspect-square group cursor-pointer shadow-sm"
            >
              <img src={item.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} referrerPolicy="no-referrer" />
              {/* Emotion Dot - Randomized */}
              <div className={`absolute top-3 left-3 w-2.5 h-2.5 rounded-full border border-white shadow-sm ${
                i % 3 === 0 ? 'bg-red-400' : i % 3 === 1 ? 'bg-emerald-400' : 'bg-purple-400'
              }`} />
              {/* White Chevron in top right to match image */}
              <div className="absolute top-3 right-3 text-white/80">
                <ChevronRight size={16} className="rotate-[-45deg]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-white/70 text-[10px]">{item.count}张记忆</p>
                  </div>
                  <ChevronRight size={14} className="text-white/70 mb-1" />
                </div>
              </div>
            </motion.div>
          ))}
          <label className="cursor-pointer">
            <input type="file" className="hidden" accept="image/*" onChange={handleAddMemory} />
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="bg-gray-200/50 rounded-[24px] aspect-square flex items-center justify-center text-white hover:bg-gray-200 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-gray-400/30 flex items-center justify-center shadow-inner">
                <Plus size={36} />
              </div>
            </motion.div>
          </label>
        </div>
      </div>
    </div>
  );
};

export const RelationshipsTab: React.FC<{ state: AppState }> = ({ state }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState('人物');
  const [timeFilter, setTimeFilter] = React.useState('近一周');
  const [isTimeMenuOpen, setIsTimeMenuOpen] = React.useState(false);

  const timeOptions = ['近一周', '近一月', '近半年', '近一年'];

  const relationshipNodes = [
    { name: 'T老师', color: 'rgba(255, 159, 142, 0.6)', size: 68, pos: { top: '15%', left: '12%' }, avatar: '🥦' },
    { name: '陈雪', color: 'rgba(242, 153, 126, 0.6)', size: 76, pos: { top: '8%', right: '18%' }, avatar: '🥕' },
    { name: 'leo', color: 'rgba(142, 187, 255, 0.6)', size: 52, pos: { top: '45%', right: '8%' }, avatar: '🦁' },
    { name: '小梦', color: 'rgba(142, 197, 255, 0.6)', size: 60, pos: { bottom: '12%', right: '22%' }, avatar: '☁️' },
    { name: '朱朱', color: 'rgba(181, 168, 255, 0.6)', size: 44, pos: { bottom: '22%', left: '22%' }, avatar: '🐷' },
  ];

  return (
    <div className="p-6 pb-32 space-y-8 bg-[#F8F9FA] min-h-screen relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[40%] bg-cyan-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[30%] bg-purple-100/20 rounded-full blur-[80px]" />
      </div>

      <header className="relative z-10 flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-medium text-gray-900 serif">关系网</h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">5 Core Connections</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setIsSearching(!isSearching);
              setIsFiltering(false);
            }}
            className={`p-3 rounded-2xl transition-all ${isSearching ? 'bg-cyan-500 text-white shadow-xl' : 'bg-white text-cyan-500 shadow-sm border border-gray-50'}`}
          >
            <Search size={22} />
          </button>
          <button 
            onClick={() => {
              setIsFiltering(!isFiltering);
              setIsSearching(false);
            }}
            className={`p-3 rounded-2xl transition-all ${isFiltering ? 'bg-cyan-500 text-white shadow-xl' : 'bg-white text-cyan-500 shadow-sm border border-gray-50'}`}
          >
            <SlidersHorizontal size={22} />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearching && (
          <motion.div 
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            className="overflow-hidden relative z-10"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索人物或关系..."
                className="w-full bg-white/60 backdrop-blur-md border border-white rounded-2xl py-3.5 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-cyan-100 focus:outline-none text-sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Overlay */}
      <AnimatePresence>
        {isFiltering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white space-y-4 z-30 relative"
          >
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">筛选标准</h3>
            <div className="flex flex-wrap gap-2">
              {['按亲密度', '按互动频率', '按最近联系', '仅看家人', '仅看朋友'].map(f => (
                <button key={f} className="px-4 py-2 bg-white/50 hover:bg-cyan-400 hover:text-white text-[11px] text-gray-500 rounded-full transition-all font-medium border border-gray-100 shadow-sm">
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <div className="relative z-10 bg-gray-200/30 backdrop-blur-md p-1 rounded-2xl flex gap-1 border border-white/50">
        {['情绪', '人物', '地点'].map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${activeFilter === filter ? 'bg-white shadow-md text-cyan-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="relative z-10 grid grid-cols-3 gap-4">
        {[
          { label: '总关系人数', value: '5', icon: Users, color: 'text-cyan-400' },
          { label: '高频互动', value: '2', icon: BarChart3, color: 'text-cyan-400' },
          { label: '近期记忆', value: '47', icon: Calendar, color: 'text-cyan-400' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/70 backdrop-blur-md p-4 rounded-[28px] shadow-sm border border-white space-y-2 flex flex-col items-start cursor-pointer hover:shadow-lg transition-all"
          >
            <div className={`p-1.5 rounded-full bg-cyan-50 ${stat.color}`}>
              <stat.icon size={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
              <p className="text-[9px] text-gray-400 font-bold leading-tight uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Relationship Graph Card - Liquid Glass Style */}
      <div className="relative z-10 bg-white/40 backdrop-blur-md p-6 rounded-[40px] shadow-sm border border-white relative h-[320px] flex items-center justify-center overflow-hidden">
        {/* Connection Lines - Subtle & Animated */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {relationshipNodes.map((node, i) => (
            <motion.line 
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
              x1="50%" y1="50%" 
              x2={node.pos.left || (node.pos.right ? `calc(100% - ${node.pos.right})` : '50%')} 
              y2={node.pos.top || (node.pos.bottom ? `calc(100% - ${node.pos.bottom})` : '50%')} 
              stroke="white" strokeWidth="1.5" strokeDasharray="4 4"
            />
          ))}
        </svg>

        {/* Central Node - Breathing Liquid Blob */}
        <motion.div 
          animate={{ 
            scale: [1, 1.08, 1],
            borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "58% 42% 30% 70% / 55% 55% 45% 45%", "42% 58% 70% 30% / 45% 45% 55% 55%"]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          className="w-28 h-28 bg-gradient-to-br from-[#8EBC94] to-[#A8D5AD] flex items-center justify-center text-white font-bold text-2xl z-10 shadow-[0_12px_32px_rgba(142,188,148,0.4)] cursor-pointer border border-white/20 backdrop-blur-md rounded-full"
        >
          我
        </motion.div>

        {/* Surrounding Nodes - Glassmorphism Water Drops */}
        {relationshipNodes.map((node, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -6, 0]
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: i * 0.1 },
              scale: { duration: 0.5, delay: i * 0.1 },
              y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
            }}
            whileHover={{ scale: 1.1, y: -10 }}
            className="absolute flex items-center justify-center rounded-full text-white font-bold text-[13px] shadow-lg cursor-pointer z-20 backdrop-blur-xl border border-white/40"
            style={{ 
              backgroundColor: node.color, 
              width: node.size, 
              height: node.size,
              ...node.pos,
              boxShadow: `0 8px 24px ${node.color.replace('0.6', '0.2')}, inset 0 0 12px rgba(255,255,255,0.3)`
            }}
          >
            {node.name}
          </motion.div>
        ))}
      </div>

      {/* Important Relationships List */}
      <section className="relative z-10 space-y-5">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">重要关系</h2>
          <button 
            onClick={() => alert('查看所有关系列表...')}
            className="text-xs text-cyan-500 font-bold uppercase tracking-widest hover:underline"
          >
            View All
          </button>
        </div>
        <div className="space-y-5">
          {[
            { name: 'T老师', count: 16, avatar: '🥦', colors: ['#FF3B30', '#4CD964'], progress: 60, thumbs: ['https://picsum.photos/seed/t1/120/120', 'https://picsum.photos/seed/t2/120/120', 'https://picsum.photos/seed/t3/120/120'] },
            { name: '陈雪', count: 12, avatar: '🥕', colors: ['#FF3B30', '#4CD964', '#AF52DE'], progress: 40, thumbs: ['https://picsum.photos/seed/c1/120/120', 'https://picsum.photos/seed/c2/120/120'] },
          ].map((rel, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert(`进入与 ${rel.name} 的专属记忆空间`)}
              className="bg-white/80 backdrop-blur-md p-6 rounded-[40px] space-y-5 cursor-pointer shadow-sm border border-white hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-50">
                  {rel.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 tracking-tight">{rel.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">{rel.count}条记忆 · 深度互动</p>
                </div>
                <div className="p-2 text-gray-300">
                  <ChevronRight size={20} />
                </div>
              </div>

              {/* Thumbnails - Refined */}
              <div className="flex gap-3 pt-1">
                {rel.thumbs.map((img, idx) => (
                  <motion.img 
                    key={idx} 
                    whileHover={{ scale: 1.05 }}
                    src={img} 
                    className="w-20 h-20 rounded-[24px] object-cover shadow-md border-2 border-white" 
                    alt="memory" 
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const ProfileTab: React.FC<{ state: AppState }> = ({ state }) => {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <div className="p-6 pb-32 space-y-8 bg-[#F8F9FA] min-h-screen relative">
      <button 
        onClick={() => setShowSettings(true)}
        className="absolute top-8 right-6 text-gray-400 text-sm font-medium hover:text-cyan-500 transition-colors z-20"
      >
        设置
      </button>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-end justify-center"
            onClick={() => setShowSettings(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="w-full max-w-md bg-white rounded-t-[40px] p-8 space-y-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-2" />
              <h2 className="text-xl font-bold text-gray-900">设置</h2>
              <div className="space-y-2">
                {[
                  { label: '个人资料', icon: User },
                  { label: '隐私设置', icon: ShieldCheck },
                  { label: '通知提醒', icon: Bell },
                  { label: '存储空间', icon: Database },
                  { label: '关于椰子', icon: Info },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-cyan-500 transition-colors">
                        <item.icon size={20} />
                      </div>
                      <span className="font-semibold text-gray-700">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition-colors"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-28 h-28 rounded-full bg-white shadow-2xl p-1.5 cursor-pointer overflow-hidden border-4 border-white"
          >
            <img 
              src="https://images.unsplash.com/photo-1543158181-e6f9f670c5b5?auto=format&fit=crop&q=80&w=400" 
              className="w-full h-full rounded-full object-cover" 
              alt="avatar" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute bottom-1 right-1 w-7 h-7 bg-emerald-400 border-4 border-white rounded-full shadow-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-medium text-gray-900 serif">椰子</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Digital Memory Space</p>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 space-y-2">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">记忆连续</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">12</span>
            <span className="text-emerald-500 text-xs font-bold mb-1">天</span>
          </div>
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 w-[60%]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 space-y-2">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">情绪平衡</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">88</span>
            <span className="text-cyan-500 text-xs font-bold mb-1">%</span>
          </div>
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 w-[88%]" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: '总记忆', value: '5867', icon: Heart, color: 'bg-pink-50 text-pink-400', tab: '记忆' },
          { label: '关系', value: '32', icon: Users, color: 'bg-blue-50 text-blue-400', tab: '关系' },
          { label: '今日', value: '7', icon: Calendar, color: 'bg-emerald-50 text-emerald-400', tab: '主页' },
          { label: '积极指数', value: '88%', icon: BarChart3, color: 'bg-purple-50 text-purple-400', tab: 'AI助手' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            whileTap={{ scale: 0.95 }}
            onClick={() => window.dispatchEvent(new CustomEvent('setTab', { detail: stat.tab }))}
            className="bg-white p-3 rounded-2xl shadow-sm space-y-2 text-center cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className={`w-8 h-8 mx-auto rounded-xl ${stat.color} flex items-center justify-center`}>
              <stat.icon size={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-gray-900">{stat.value}</p>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Memories */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-lg font-bold text-gray-900">最近记忆</h2>
          <button onClick={() => window.dispatchEvent(new CustomEvent('setTab', { detail: '记忆' }))}>
            <ChevronRight size={20} className="text-gray-300" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {[
            { title: '山林徒步', date: '2月24日', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=300' },
            { title: '咖啡馆', date: '3月3日', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=300' },
            { title: '上海city walk', date: '3月6日', img: 'https://picsum.photos/seed/walk/150/200' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileTap={{ scale: 0.95 }}
              onClick={() => alert(`查看记忆详情: ${item.title}`)}
              className="flex-shrink-0 w-32 space-y-2 cursor-pointer"
            >
              <img src={item.img} className="w-full h-32 object-cover rounded-[24px] shadow-sm" alt={item.title} referrerPolicy="no-referrer" />
              <div className="px-1">
                <p className="text-xs font-bold text-gray-800 truncate">{item.title}</p>
                <p className="text-[10px] text-gray-400 font-medium">{item.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Emotion Trend - Line Chart Fixed */}
      <section className="bg-white p-6 rounded-[32px] shadow-sm space-y-6 cursor-pointer hover:shadow-md transition-shadow overflow-hidden">
        <h2 className="text-sm font-bold text-gray-800">情绪趋势</h2>
        <div className="relative h-24 w-full">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between opacity-10">
            <div className="h-px w-full bg-gray-400" />
            <div className="h-px w-full bg-gray-400" />
            <div className="h-px w-full bg-gray-400" />
          </div>
          
          {/* Line Chart SVG with ViewBox for scaling */}
          <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
              d="M 0 80 Q 50 20 100 60 T 200 40 T 300 10" 
              fill="none" 
              stroke="url(#lineGradient)" 
              strokeWidth="4"
              strokeLinecap="round"
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4CD964" />
                <stop offset="50%" stopColor="#FFCC00" />
                <stop offset="100%" stopColor="#FF3B30" />
              </linearGradient>
            </defs>
            {/* Dots inside SVG to ensure alignment */}
            <circle cx="0" cy="80" r="5" fill="#4CD964" />
            <circle cx="100" cy="60" r="5" fill="#FFCC00" />
            <circle cx="200" cy="40" r="5" fill="#FF9500" />
            <circle cx="300" cy="10" r="5" fill="#FF3B30" />
          </svg>

          {/* X-Axis Labels */}
          <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[9px] font-bold text-gray-300 uppercase tracking-widest">
            <span>3/1</span>
            <span>3/3</span>
            <span>3/7</span>
            <span>今天</span>
          </div>
        </div>
      </section>

      {/* Relationship Overview */}
      <section className="bg-white p-6 rounded-[32px] shadow-sm space-y-6 cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800">关系概览</h2>
          <button onClick={() => window.dispatchEvent(new CustomEvent('setTab', { detail: '关系' }))}>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        </div>
        <div className="space-y-5">
          {[
            { name: 'T老师', count: 16, avatar: '🥦' },
            { name: '陈雪', count: 12, avatar: '🥕' },
          ].map((rel, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors"
              onClick={() => window.dispatchEvent(new CustomEvent('setTab', { detail: '关系' }))}
            >
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xl shadow-inner border border-gray-100">
                {rel.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">{rel.name}</h3>
                <p className="text-[10px] text-gray-400 font-medium">{rel.count}条记忆</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
