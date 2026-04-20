import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Select } from '../../components/ui/Select';
import { useAppContext } from '../../context/AppContext';

const Grades = () => {
  const { students, classes } = useAppContext();
  const [selectedClass, setSelectedClass] = useState(classes[0]?.name || '');

  const classStudents = students.filter(s => s.class === selectedClass);
  // Generate stable mock grades based on string seeds so it doesn't wildly change on rerender
  const getMockGrade = (id, offset) => ((id * offset % 10) + 10).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-dark-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Award className="text-primary-500" /> Grades & Evaluation</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage term grades and track student honor rolls natively.</p>
        </div>
        <Select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full sm:w-48">
          {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Grade Matrix</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Math</TableHead>
                    <TableHead>Physics</TableHead>
                    <TableHead>Literature</TableHead>
                    <TableHead>Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classStudents.map((student, idx) => {
                    const avg = ((parseFloat(getMockGrade(student.id, 11)) + parseFloat(getMockGrade(student.id, 7)) + parseFloat(getMockGrade(student.id, 13))) / 3).toFixed(2);
                    return (
                      <motion.tr key={student.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="border-b border-gray-100 dark:border-dark-border text-sm">
                        <TableCell className="font-semibold text-gray-900 dark:text-gray-100">{student.name}</TableCell>
                        <TableCell>{getMockGrade(student.id, 11)}</TableCell>
                        <TableCell>{getMockGrade(student.id, 7)}</TableCell>
                        <TableCell>{getMockGrade(student.id, 13)}</TableCell>
                        <TableCell className="font-bold text-primary-600 dark:text-primary-400">{avg}</TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2"><Trophy size={20}/> Top Performing Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classStudents.slice(0, 5).map((student, idx) => (
                  <div key={student.id} className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg opacity-70">#{idx + 1}</span>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Grades;
