// Pre-generated 200 fee records for 60 students
export const feesData = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  studentId: (i % 60) + 1,
  amount: 15000 + (Math.random() * 10000),
  status: Math.random() > 0.3 ? 'Paid' : 'Overdue',
  date: `2026-0${1 + (i % 4)}-${10 + (i % 15)}`
}));
