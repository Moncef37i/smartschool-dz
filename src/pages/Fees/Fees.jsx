import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';

const Fees = () => {
  const { fees, students, toggleFeeStatus } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fees Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track and update student tuition records centrally.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
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
              {fees.map((fee, idx) => {
                const student = students.find(s => s.id === fee.studentId) || { name: 'Unknown Student', class: '-' };
                return (
                  <motion.tr key={fee.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="border-b border-gray-100 dark:border-dark-border">
                    <TableCell className="font-mono text-gray-500">INV-{fee.id}00</TableCell>
                    <TableCell>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{student.name}</div>
                      <div className="text-xs text-gray-500">Class: {student.class}</div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-gray-200">{formatCurrency(fee.amount)}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{fee.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        fee.status === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {fee.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button 
                        onClick={() => toggleFeeStatus(fee.id)}
                        className={`text-sm flex items-center justify-end w-full gap-1 ${fee.status === 'Paid' ? 'text-gray-400 hover:text-gray-600' : 'text-primary-600 hover:text-primary-700 font-semibold'}`}
                      >
                        {fee.status === 'Paid' ? 'Mark Overdue' : <><CheckCircle size={16}/> Mark Paid</>}
                      </button>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fees;
