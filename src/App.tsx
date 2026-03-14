/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { INITIAL_STATE } from './constants';
import { AppState, TabType } from './types';
import { 
  BottomNav, 
  HomeTab, 
  MemoryTab, 
  AIAssistantTab, 
  RelationshipsTab, 
  ProfileTab 
} from './components/AppComponents';

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const setActiveTab = (tab: TabType) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const toggleFeaturedLike = () => {
    setState(prev => ({ ...prev, featuredLiked: !prev.featuredLiked }));
  };

  useEffect(() => {
    const handleSetTab = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('setTab', handleSetTab);
    return () => window.removeEventListener('setTab', handleSetTab);
  }, []);

  // Simulate storage alert
  useEffect(() => {
    if (state.storageUsage >= 88) {
      console.log("椰子：存储占用已达 88%，建议进行断舍离，删除一些重复的照片。");
    }
  }, [state.storageUsage]);

  const renderTab = () => {
    switch (state.activeTab) {
      case '主页': return <HomeTab state={state} onToggleLike={toggleFeaturedLike} />;
      case '记忆': return <MemoryTab state={state} />;
      case 'AI助手': return <AIAssistantTab state={state} />;
      case '关系': return <RelationshipsTab state={state} />;
      case '个人': return <ProfileTab state={state} />;
      default: return <HomeTab state={state} />;
    }
  };

 return (
    // 修改点：w-full 确保在手机上铺满，sm:max-w-md 确保在电脑上才限制宽度
    <div className="w-full sm:max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-x-hidden font-sans border-x border-gray-100 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          // 修改点：flex-1 确保内容区域撑开，给底部导航留出位置
          className="flex-1 pb-20" 
        >
          {renderTab()}
        </motion.div>
      </AnimatePresence>

      <BottomNav activeTab={state.activeTab} setActiveTab={setActiveTab} />
    </div>
  );
