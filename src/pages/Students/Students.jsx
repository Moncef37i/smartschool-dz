import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useAppContext } from '../../context/AppContext';

const Badge = ({ status }) => {
  const isActive = status === 'Active';
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
      isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
               : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }`}>
      {status}
    </span>
  );
};

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent, classes } = useAppContext();
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', gender: 'Male', age: '', class: '', parentName: '', phone: '' });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) || student.parentName.toLowerCase().includes(search.toLowerCase());
    const matchesClass = filterClass === 'All' || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  const handleOpenModal = (student = null) => {
    if (student) {
      setEditingId(student.id);
      setFormData(student);
    } else {
      setEditingId(null);
      setFormData({ name: '', gender: 'Male', age: '', class: classes[0]?.name || '', parentName: '', phone: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      updateStudent(editingId, formData);
    } else {
      addStudent(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      deleteStudent(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Students Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View, add, edit, or delete student records seamlessly.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={18} />
          Add Student
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-100 dark:border-dark-border flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-dark-card rounded-t-2xl">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search by name or parent..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter size={18} className="text-gray-400" />
              <Select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="w-full sm:w-40 border-none bg-gray-50 dark:bg-dark-bg">
                <option value="All">All Classes</option>
                {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Gender/Age</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Parent Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }}
                    key={student.id} 
                    className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">{student.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm dark:text-gray-300">{student.gender}</span>
                        <span className="text-xs text-gray-500">{student.age} yrs</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-1 rounded text-xs font-semibold">
                        {student.class}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">{student.parentName}</TableCell>
                    <TableCell className="text-gray-500">{student.phone}</TableCell>
                    <TableCell>
                      <Badge status={student.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleOpenModal(student)} className="p-1.5 text-gray-400 hover:text-primary-600 transition-colors"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(student.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                    No students match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Student' : 'Add New Student'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Amine Benali" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
              <Select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                <option>Male</option>
                <option>Female</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
              <Input required type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assigned Class</label>
              <Select value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}>
                {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Phone</label>
              <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="0555..." />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Name</label>
            <Input required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingId ? 'Save Changes' : 'Add Student'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Students;
