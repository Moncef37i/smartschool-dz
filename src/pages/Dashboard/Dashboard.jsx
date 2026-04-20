import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BookOpen, GraduationCap, DollarSign, 
  CalendarCheck, Bell, TrendingUp, Clock 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatCurrency } from '../../utils/helpers';
import { useAppContext } from '../../context/AppContext';

const attendanceData = [
  { name: 'Sun', present: 95, absent: 5 },
  { name: 'Mon', present: 98, absent: 2 },
  { name: 'Tue', present: 94, absent: 6 },
  { name: 'Wed', present: 96, absent: 4 },
  { name: 'Thu', present: 92, absent: 8 },
];

const feesData = [
  { name: 'Sep', amount: 150000 },
  { name: 'Oct', amount: 200000 },
  { name: 'Nov', amount: 180000 },
  { name: 'Dec', amount: 120000 },
  { name: 'Jan', amount: 220000 },
];

const Dashboard = () => {
  const { students, teachers, classes, fees, attendance, announcements } = useAppContext();

  // Dynamic calculations from context
  const totalRevenue = fees.filter(f => f.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPresent = Object.values(attendance).filter(v => v === 'Present').length;
  const attendanceRate = students.length > 0 ? Math.round((totalPresent / students.length) * 100) : 89; // fallback for demo

  const stats = [
    { title: 'Total Students', value: students.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Total Teachers', value: teachers.length, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { title: 'Total Classes', value: classes.length, icon: GraduationCap, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { title: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { title: 'Attendance', value: `${attendanceRate}%`, icon: CalendarCheck, color: 'text-primary-500', bg: 'bg-primary-100 dark:bg-primary-900/30' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Moncef!</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Here's a quick look at your school's performance today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-dark-card p-2 rounded-lg">
          <Clock size={14} />
          <span>Last Updated: Today, 08:45 AM</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow border-none shadow-sm">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Chart */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <Card className="h-80 flex flex-col border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    Attendance Trends
                    <TrendingUp size={16} className="text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={attendanceData}>
                      <defs>
                        <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorPresent)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fees Chart */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
              <Card className="h-80 flex flex-col border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Revenue Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} tickFormatter={(value) => `${value / 1000}k`} />
                      <Tooltip 
                        cursor={{fill: '#f1f5f9'}} 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm">Recent Registration Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.slice(0, 5).map((s, idx) => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-dark-bg/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.name}</p>
                        <p className="text-xs text-gray-500">New Student Registered • {s.class}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">Just now</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Announcements Widget */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-none shadow-sm bg-primary-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Bell size={80} />
              </div>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell size={18} /> Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.slice(0, 3).map((ann) => (
                  <div key={ann.id} className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                    <h4 className="text-xs font-bold uppercase mb-1">{ann.title}</h4>
                    <p className="text-xs opacity-90 line-clamp-2">{ann.message}</p>
                    <p className="text-[10px] mt-2 opacity-70 italic">{ann.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 shrink-0">
                    <span className="text-xs font-bold">MAY</span>
                    <span className="text-lg font-black leading-none">15</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Annual Sports Day</h4>
                    <p className="text-xs text-gray-500">Main Stadium • 09:00 AM</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 shrink-0">
                    <span className="text-xs font-bold">JUN</span>
                    <span className="text-lg font-black leading-none">02</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Parent-Teacher Meeting</h4>
                    <p className="text-xs text-gray-500">Conference Hall • 14:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
