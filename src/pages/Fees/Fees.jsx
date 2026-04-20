import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';

const Fees = () => {
  const { fees, students, setFees } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleFeeStatus = (id) => {
    setFees(prev => prev.map(f => f.id === id ? { ...f, status: f.status === 'Paid' ? 'Overdue' : 'Paid' } : f));
  };

  const totalPages = Math.ceil(fees.length / itemsPerPage);
  const currentFees = fees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fees Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tracking 200+ active financial records across the institution.</p>
        </div>
        <div className="bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-xl">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Total Collected: </span>
          <span className="text-lg font-black text-primary-700 dark:text-primary-300">
            {formatCurrency(fees.filter(f => f.status === 'Paid').reduce((acc, f) => acc + f.amount, 0))}
          </span>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-dark-bg/50">
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentFees.map((fee, idx) => {
                const student = students.find(s => s.id === fee.studentId) || { name: 'Unknown Student', class: '-' };
                return (
                  <motion.tr 
                    key={fee.id} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: idx * 0.03 }} 
                    className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border/30 transition-colors"
                  >
                    <TableCell className="font-mono text-gray-400 text-xs font-bold">#INV-{fee.id.toString().padStart(4, '0')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-bg flex items-center justify-center text-[10px] font-bold text-gray-500">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{student.name}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase">{student.class}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-gray-900 dark:text-gray-200">{formatCurrency(fee.amount)}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400 text-sm">{fee.date}</TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        fee.status === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                      }`}>
                        {fee.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleFeeStatus(fee.id)}
                        className={`text-xs ${fee.status === 'Paid' ? 'text-gray-400' : 'text-primary-600 font-bold'}`}
                      >
                        {fee.status === 'Paid' ? 'Mark Overdue' : <><CheckCircle size={14} className="mr-1"/> Mark Paid</>}
                      </Button>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
          
          {/* Pagination Controls */}
          <div className="p-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between bg-white dark:bg-dark-card">
            <span className="text-sm text-gray-500 font-medium">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fees;
