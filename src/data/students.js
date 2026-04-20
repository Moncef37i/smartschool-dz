export const studentsData = [
  { id: 1, name: 'Amine Benali', gender: 'Male', age: 15, class: '10A', parentName: 'Ahmed Benali', phone: '0555123456', status: 'Active', email: 'amine.b@example.com' },
  { id: 2, name: 'Sarah Mansouri', gender: 'Female', age: 14, class: '9B', parentName: 'Karim Mansouri', phone: '0666987654', status: 'Active', email: 'sarah.m@example.com' },
  { id: 3, name: 'Yacine Djebbar', gender: 'Male', age: 16, class: '11C', parentName: 'Omar Djebbar', phone: '0777112233', status: 'Inactive', email: 'yacine.d@example.com' },
  { id: 4, name: 'Fatima Zohra', gender: 'Female', age: 15, class: '10A', parentName: 'Mohamed Zohra', phone: '0555445566', status: 'Active', email: 'fatima.z@example.com' },
  { id: 5, name: 'Riyad Mahrez', gender: 'Male', age: 14, class: '9B', parentName: 'Fouad Mahrez', phone: '0666778899', status: 'Active', email: 'riyad.m@example.com' },
  { id: 6, name: 'Lyna Kaci', gender: 'Female', age: 15, class: '10A', parentName: 'Mourad Kaci', phone: '0555001122', status: 'Active', email: 'lyna.k@example.com' },
  { id: 7, name: 'Sofiane Hanni', gender: 'Male', age: 13, class: '8C', parentName: 'Abdel Hanni', phone: '0666334455', status: 'Active', email: 'sofiane.h@example.com' },
  { id: 8, name: 'Meriem Belkacem', gender: 'Female', age: 16, class: '11A', parentName: 'Said Belkacem', phone: '0777556677', status: 'Active', email: 'meriem.b@example.com' },
  { id: 9, name: 'Adam Ounas', gender: 'Male', age: 15, class: '10B', parentName: 'Mehdi Ounas', phone: '0555889900', status: 'Active', email: 'adam.o@example.com' },
  { id: 10, name: 'Ines Bouzid', gender: 'Female', age: 14, class: '9A', parentName: 'Rachid Bouzid', phone: '0666223344', status: 'Active', email: 'ines.b@example.com' },
  // ... Generating 50 more students with diverse names and classes
  ...Array.from({ length: 50 }, (_, i) => ({
    id: 11 + i,
    name: i % 2 === 0 ? `Student Male ${11 + i}` : `Student Female ${11 + i}`,
    gender: i % 2 === 0 ? 'Male' : 'Female',
    age: 12 + (i % 6),
    class: ['10A', '9B', '11C', '8A', '10B', '12A', '7C', '11A', '9A', '10C'][i % 10],
    parentName: `Parent ${11 + i}`,
    phone: `0555${String(11 + i).padStart(6, '0')}`,
    status: 'Active',
    email: `student${11 + i}@example.com`
  }))
];
