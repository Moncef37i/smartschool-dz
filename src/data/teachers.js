export const teachersData = [
  { id: 1, name: 'Omar Kadir', subject: 'Mathematics', phone: '0551002030', experience: '10 Years', status: 'Active', email: 'omar.k@smartschool.dz', gender: 'Male' },
  { id: 2, name: 'Leila Toumi', subject: 'Physics', phone: '0662003040', experience: '5 Years', status: 'Active', email: 'leila.t@smartschool.dz', gender: 'Female' },
  { id: 3, name: 'Samir Brahimi', subject: 'Arabic', phone: '0773004050', experience: '12 Years', status: 'On Leave', email: 'samir.b@smartschool.dz', gender: 'Male' },
  { id: 4, name: 'Nawel Saidi', subject: 'French', phone: '0554005060', experience: '3 Years', status: 'Active', email: 'nawel.s@smartschool.dz', gender: 'Female' },
  ...Array.from({ length: 36 }, (_, i) => ({
    id: 5 + i,
    name: i % 2 === 0 ? `Teacher Mr. ${5 + i}` : `Teacher Ms. ${5 + i}`,
    subject: ['Mathematics', 'Physics', 'Arabic', 'French', 'History', 'Biology', 'Chemistry', 'English', 'Art', 'Music'][i % 10],
    phone: `0666${String(5 + i).padStart(6, '0')}`,
    experience: `${3 + (i % 20)} Years`,
    status: 'Active',
    email: `teacher${5 + i}@smartschool.dz`,
    gender: i % 2 === 0 ? 'Male' : 'Female'
  }))
];
