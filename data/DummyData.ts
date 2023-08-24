import { DbList } from '../src/models/List.models';
import { Task, TaskToggleEvent } from '../src/models/Task.models';
import { User } from '../src/models/User.models';

const createFakeTaskToggleEvent = (
	userId: string,
	completed: boolean,
	daysPast: number
): TaskToggleEvent => ({
	userId,
	completed,
	timestamp: new Date(new Date().setDate(new Date().getDate() - daysPast)),
});

export const DummyUsers: User[] = [
	{
		id: 'a',
		lists: ['1', '2'],
		email: 'jorgito@email.com',
		image: require('../src/assets/images/profile.png'),
		name: 'Jorgito',
		friends: ['b'],
	},
	{
		id: 'b',
		lists: ['1'],
		email: 'titola@email.com',
		name: 'Titola',
		friends: ['a'],
	},
];

export const DummyTasks: Task[] = [
	{
		id: '1001',
		listId: '1',
		title: 'Tomates',
		description: 'Canarios o de ensalada',
		isCompleted: false,
		history: [
			createFakeTaskToggleEvent('a', false, 3),
			createFakeTaskToggleEvent('a', true, 8),
			createFakeTaskToggleEvent('b', false, 16),
			createFakeTaskToggleEvent('a', true, 18),
		],
	},
	{
		id: '1002',
		listId: '1',
		title: 'Cebollas',
		description: 'Una malla llena',
		isCompleted: false,
		history: [
			createFakeTaskToggleEvent('a', false, 2),
			createFakeTaskToggleEvent('b', true, 4),
			createFakeTaskToggleEvent('b', false, 6),
			createFakeTaskToggleEvent('a', true, 8),
		],
	},
	{
		id: '1003',
		listId: '1',
		title: 'Lechuga',
		description: 'Mientras no sea iceberg...',
		isCompleted: false,
		history: [
			createFakeTaskToggleEvent('b', false, 5),
			createFakeTaskToggleEvent('a', true, 9),
		],
	},
	{
		id: '1004',
		listId: '1',
		title: 'Pimiento verde',
		description: 'De cocinar, no italiano',
		isCompleted: true,
		history: [
			createFakeTaskToggleEvent('b', false, 1),
			createFakeTaskToggleEvent('a', false, 3),
			createFakeTaskToggleEvent('a', true, 8),
			createFakeTaskToggleEvent('b', false, 16),
			createFakeTaskToggleEvent('a', true, 18),
		],
	},
	{
		id: '1005',
		listId: '1',
		title: 'Pimiento rojo',
		description: 'De cocinar, no de freir',
		isCompleted: false,
		history: [
			createFakeTaskToggleEvent('b', false, 2),
			createFakeTaskToggleEvent('b', true, 6),
			createFakeTaskToggleEvent('a', false, 7),
			createFakeTaskToggleEvent('a', true, 9),
		],
	},
	{
		id: '1006',
		listId: '1',
		title: 'Patatas fritas',
		description: 'Las normales al punto de sal',
		isCompleted: true,
		history: [
			createFakeTaskToggleEvent('a', true, 1),
			createFakeTaskToggleEvent('a', false, 3),
			createFakeTaskToggleEvent('a', true, 8),
		],
	},
	{
		id: '2001',
		listId: '2',
		title: 'Hacer la colada',
		description: 'Lavadora de blancos y de colores',
		isCompleted: false,
		history: [
			createFakeTaskToggleEvent('a', false, 7),
			createFakeTaskToggleEvent('a', true, 9),
		],
	},
	{
		id: '2002',
		listId: '2',
		title: 'Sacar al perro',
		description: 'Tres veces al día',
		isCompleted: false,
		history: [
			createFakeTaskToggleEvent('a', false, 1),
			createFakeTaskToggleEvent('a', true, 2),
			createFakeTaskToggleEvent('a', false, 3),
			createFakeTaskToggleEvent('a', true, 4),
		],
	},
	{
		id: '2003',
		listId: '2',
		title: 'Pasar la aspiradora',
		description: '',
		isCompleted: true,
		history: [
			createFakeTaskToggleEvent('a', true, 2),
			createFakeTaskToggleEvent('a', false, 7),
			createFakeTaskToggleEvent('a', true, 9),
		],
	},
];

export const DummyLists: DbList[] = [
	{
		id: '1',
		icon: 'cart-outline',
		title: 'Lista de la compra',
		tasks: ['1001', '1002', '1003', '1004', '1005', '1006'],
		users: ['a', 'b'],
	},
	{
		id: '2',
		icon: 'home-outline',
		title: 'Tareas del hogar',
		tasks: ['2001', '2002', '2003'],
		users: ['a'],
	},
];
