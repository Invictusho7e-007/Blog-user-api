export interface UserData {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

const users: UserData[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    createdAt: new Date('2023-01-15'),
    isActive: true,
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    createdAt: new Date('2023-02-20'),
    isActive: false,
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    createdAt: new Date('2023-03-10'),
    isActive: true,
  },
  {
    id: 4,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    createdAt: new Date('2023-04-05'),
    isActive: true,
  },
  {
    id: 5,
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    createdAt: new Date('2023-05-12'),
    isActive: false,
  },
  {
    id: 6,
    name: 'Fiona Gallagher',
    email: 'fiona.gallagher@example.com',
    createdAt: new Date('2023-06-18'),
    isActive: true,
  },
];
export default users;
