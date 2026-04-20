import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { useAppContext } from '../../context/AppContext';

const Classes = () => {
  const { classes, students, teachers } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Classes Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View class capacities and assigned homeroom teachers.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Homeroom Teacher</TableHead>
                <TableHead>Total Students</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls, idx) => {
                const assignedStudents = students.filter(s => s.class === cls.name).length;
                const capacityPct = Math.round((assignedStudents / cls.capacity) * 100);
                
                return (
                  <motion.tr 
                    key={cls.id} 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-100 dark:border-dark-border"
                  >
                    <TableCell className="font-bold text-gray-900 dark:text-white">Class {cls.name}</TableCell>
                    <TableCell className="text-primary-600 dark:text-primary-400 font-medium">{cls.teacher}</TableCell>
                    <TableCell>{assignedStudents} enrolled</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 max-w-[100px]">
                          <div className={`h-2.5 rounded-full ${capacityPct > 90 ? 'bg-red-500' : 'bg-primary-500'}`} style={{ width: `${capacityPct}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-500">{cls.capacity} max</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${capacityPct >= 100 ? 'bg-red-100 text-red-700 dark:bg-red-900/30' : 'bg-green-100 text-green-700 dark:bg-green-900/30'}`}>
                        {capacityPct >= 100 ? 'Full' : 'Open'}
                      </span>
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

export default Classes;
