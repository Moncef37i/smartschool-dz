import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, Save, Globe, Building, 
  Bell, Shield, Mail, Phone, Palette 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useAppContext();
  
  const [formData, setFormData] = useState({ 
    schoolName: 'SmartSchool DZ Academy', 
    academicYear: '2025-2026',
    language: 'English',
    director: 'Moncef',
    email: 'contact@smartschool.dz',
    phone: '+213 555 12 34 56',
    address: '123 Smart St, Algiers, Algeria',
    timeZone: 'GMT+1',
    primaryColor: '#16a34a'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setTimeout(() => {
      addToast('System configuration updated and saved!');
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-dark-border pb-4">
        <SettingsIcon className="text-primary-600 w-8 h-8" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your institution's profile, appearance, and security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile & Info */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building size={18} className="text-primary-600"/> Institution Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School Name</label>
                    <Input value={formData.schoolName} onChange={e => setFormData({...formData, schoolName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Director Name</label>
                    <Input value={formData.director} onChange={e => setFormData({...formData, director: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Active Academic Year</label>
                    <Input value={formData.academicYear} onChange={e => setFormData({...formData, academicYear: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2"><Mail size={14}/> Official Email</label>
                    <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2"><Phone size={14}/> Support Phone</label>
                    <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="col-span-2 pt-4">
                    <Button type="submit" className="w-full sm:w-auto px-8"><Save size={16} className="mr-2"/> Save Profile Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield size={18} className="text-primary-600"/> Security & Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg/50">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg/50">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">IP Restriction</h4>
                    <p className="text-xs text-gray-500">Only allow access from school network IPs.</p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: UI & Notifications */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette size={18} className="text-primary-600"/> Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Theme Mode</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'} 
                      onClick={() => theme === 'dark' && toggleTheme()} 
                      className="flex-1"
                    >Light</Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'} 
                      onClick={() => theme === 'light' && toggleTheme()} 
                      className="flex-1"
                    >Dark</Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2"><Globe size={16}/> Localization</label>
                  <Select value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}>
                    <option>English</option>
                    <option>Français</option>
                    <option>العربية</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time Zone</label>
                  <Select value={formData.timeZone} onChange={e => setFormData({...formData, timeZone: e.target.value})}>
                    <option>GMT+0 (London)</option>
                    <option>GMT+1 (Algiers/Paris)</option>
                    <option>GMT+2 (Cairo)</option>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell size={18} className="text-primary-600"/> Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                  <span className="text-gray-700 dark:text-gray-300">Email Alerts for Attendance</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                  <span className="text-gray-700 dark:text-gray-300">Push Notifications for Exams</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span className="text-gray-700 dark:text-gray-300">Monthly Performance Reports</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
