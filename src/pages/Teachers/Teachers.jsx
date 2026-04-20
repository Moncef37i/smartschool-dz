import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Mail, Phone, MoreVertical, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useAppContext } from '../../context/AppContext';

const Teachers = () => {
  const { teachers, addTeacher, deleteTeacher } = useAppContext();
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', subject: '', phone: '', experience: '1 Year', gender: 'Male' });

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e) => {
    e.preventDefault();
    addTeacher(formData);
    setIsModalOpen(false);
    setFormData({ name: '', subject: '', phone: '', experience: '1 Year', gender: 'Male' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teachers Staff</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and view teacher profiles actively linked to classes.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search teachers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus size={18} />
            Add Teacher
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeachers.map((teacher, index) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow group border-none shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="relative">
                    <img 
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${teacher.name}&gender=${teacher.gender?.toLowerCase() || 'male'}`} 
                      alt={teacher.name} 
                      className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-dark-bg p-1 object-cover"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-dark-card ${
                      teacher.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></span>
                  </div>
                  <button onClick={() => deleteTeacher(teacher.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{teacher.name}</h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{teacher.subject}</p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-500 text-sm dark:text-gray-400">
                    <Phone className="w-4 h-4 mr-2 text-gray-300" />
                    {teacher.phone}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-2 text-gray-300" />
                    <span className="truncate">{teacher.email || 'n/a'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between text-sm">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{teacher.experience}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Teacher">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Leila Salah" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
              <Select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                <option>Male</option>
                <option>Female</option>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Expertise</label>
            <Input required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="Mathematics" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years Experience</label>
              <Input required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} placeholder="5 Years" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Complete Setup</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default Teachers;
