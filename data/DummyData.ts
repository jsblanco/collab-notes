import { DbList } from '../src/models/List/List';
import { Task } from '../src/models/Task/Task';

export const DummyTasks: Task[] = [
	{
		id: '1001',
		listId: '1',
		title: 'Tomates',
		description: 'Canarios o de ensalada',
	},
	{
		id: '1002',
		listId: '1',
		title: 'Cebollas',
		description: 'Una malla llena',
	},
	{
		id: '1003',
		listId: '1',
		title: 'Lechuga',
		description: 'Mientras no sea iceberg...',
	},
	{
		id: '1004',
		listId: '1',
		title: 'Pimiento verde',
		description: 'De cocinar, no italiano',
		isCompleted: true,
	},
	{
		id: '1005',
		listId: '1',
		title: 'Pimiento rojo',
		description: 'De cocinar, no de freir',
	},
	{
		id: '1006',
		listId: '1',
		title: 'Patatas fritas',
		description: 'Las normales al punto de sal',
		isCompleted: true,
	},
	{
		id: '2001',
		listId: '2',
		title: 'Hacer la colada',
		description: 'Lavadora de blancos y de colores',
	},
	{
		id: '2002',
		listId: '2',
		title: 'Sacar al perro',
		description: 'Tres veces al día',
	},
	{
		id: '2003',
		listId: '2',
		title: 'Pasar la aspiradora',
		description: '',
		isCompleted: true,
	},
];

export const DummyLists: DbList[] = [
	{
		id: '1',
		icon: 'cart-outline',
		title: 'Lista de la compra',
		tasks: ['1001', '1002', '1003', '1004', '1005', '1006'],
	},
	{
		id: '2',
		icon: 'home-outline',
		title: 'Tareas del hogar',
		tasks: ['2001', '2002', '2003'],
	},
];
