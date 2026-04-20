import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Megaphone } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppContext } from '../../context/AppContext';

const Announcements = () => {
  const { announcements, addAnnouncement } = useAppContext();
  const [formData, setFormData] = useState({ title: '', message: '' });

  const handlePost = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;
    addAnnouncement({ ...formData, date: new Date().toISOString().split('T')[0] });
    setFormData({ title: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Megaphone className="text-orange-500" /> Announcements Feed</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Broadcast important notices directly to the global notification bell.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creation Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Post New Notice</h3>
              <form onSubmit={handlePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notice Title</label>
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Schedule Change" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message Content</label>
                  <textarea 
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    className="w-full h-32 rounded-lg border border-gray-200 bg-white dark:bg-dark-bg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-dark-border dark:text-white resize-none"
                    placeholder="Enter full details here..."
                  ></textarea>
                </div>
                <Button type="submit" className="w-full flex justify-center items-center gap-2">
                  <Send size={16} /> Broadcast Notification
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Notice Board */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-2">Recent Notices</h3>
          {announcements.map((ann, idx) => (
            <motion.div key={ann.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
              <Card className="hover:border-primary-500 transition-colors">
                <CardContent className="p-5 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{ann.title}</h4>
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-dark-bg px-2 py-1 rounded">{ann.date}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">{ann.message}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
