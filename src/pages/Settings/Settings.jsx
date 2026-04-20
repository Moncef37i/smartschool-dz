import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Globe, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { toasts, addToast } = useAppContext();
  
  const [formData, setFormData] = useState({ 
    schoolName: 'SmartSchool DZ Academy', 
    academicYear: '2025-2026',
    language: 'English'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setTimeout(() => {
      // addToast expects (message, type) but here we use a global mocked function via context (already implemented)
      addToast('System configuration saved successfully!');
    }, 400); // slight delay to feel like network
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-dark-border pb-4">
        <SettingsIcon className="text-gray-500 w-8 h-8" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure global platform options and localizations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Building size={18}/> Institution Profile</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School Name</label>
                  <Input value={formData.schoolName} onChange={e => setFormData({...formData, schoolName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Active Academic Year</label>
                  <Input value={formData.academicYear} onChange={e => setFormData({...formData, academicYear: e.target.value})} />
                </div>
                <div className="pt-4">
                  <Button type="submit" className="w-full sm:w-auto"><Save size={16} className="mr-2"/> Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Globe size={18}/> Preferences & Theming</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interface Language</label>
                <Select value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}>
                  <option>English</option>
                  <option>Français (Coming Soon)</option>
                  <option>العربية (Coming Soon)</option>
                </Select>
                <p className="text-xs text-gray-500 mt-2">Only English is fully mapped in this demonstrator.</p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color Theme Mode</label>
                <div className="flex items-center gap-4 mt-2">
                  <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => theme === 'dark' && toggleTheme()} className="w-full">Light Mode</Button>
                  <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => theme === 'light' && toggleTheme()} className="w-full bg-gray-900 border-gray-900 text-white hover:bg-gray-800">Dark Mode</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
