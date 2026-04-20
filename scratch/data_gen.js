// This script generates a massive dataset for the school
const genders = ['Male', 'Female'];
const classes = ['10A', '9B', '11C', '8A', '10B', '12A', '7C', '11A', '9A', '10C', '8B', '12B', '7A', '11B', '9C'];
const subjects = ['Mathematics', 'Physics', 'Arabic', 'French', 'Computer Science', 'History', 'Music', 'Literature', 'Physical Education', 'Biology', 'Geography', 'Art', 'Chemistry', 'English', 'Islamic Studies', 'Philosophy'];

// 1. Generate 50 Students
const students = [];
for (let i = 1; i <= 60; i++) {
  const gender = i % 2 === 0 ? 'Female' : 'Male';
  students.push({
    id: i,
    name: gender === 'Male' ? `Student Male ${i}` : `Student Female ${i}`,
    gender: gender,
    age: 12 + (i % 6),
    class: classes[i % classes.length],
    parentName: `Parent ${i}`,
    phone: `0555${String(i).padStart(6, '0')}`,
    status: 'Active',
    email: `student${i}@example.com`
  });
}

// 2. Generate 40 Teachers
const teachers = [];
for (let i = 1; i <= 40; i++) {
  const gender = i % 3 === 0 ? 'Female' : 'Male';
  teachers.push({
    id: i,
    name: gender === 'Male' ? `Teacher Mr. ${i}` : `Teacher Ms. ${i}`,
    subject: subjects[i % subjects.length],
    phone: `0666${String(i).padStart(6, '0')}`,
    experience: `${5 + (i % 15)} Years`,
    status: 'Active',
    email: `teacher${i}@smartschool.dz`
  });
}

// 3. Generate 200 Fee Records
const fees = [];
for (let i = 1; i <= 200; i++) {
  fees.push({
    id: i,
    studentId: 1 + (i % 60),
    amount: 15000 + (Math.random() * 10000),
    status: Math.random() > 0.2 ? 'Paid' : 'Overdue',
    date: `2026-0${1 + (i % 4)}-${10 + (i % 15)}`
  });
}

console.log('--- GENERATED DATA ---');
console.log('Students:', students.length);
console.log('Teachers:', teachers.length);
console.log('Fees:', fees.length);

// In a real environment, I would save these to files. 
// I will now manually update the files with these expanded lists.
