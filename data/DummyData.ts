import { ListAdapter } from '../src/models/List/List.adapter';
import { EntryAdapter } from '../src/models/Entry/Entry.adapter';

const listAdapter = new ListAdapter();
const entryAdapter = new EntryAdapter();

export const DummyLists = [
	listAdapter.adapt({
		id: '1',
		title: 'Lista de la compra',
		entries: ['1001', '1002', '1003', '1004', '1005', '1006'],
	}),
	listAdapter.adapt({
		id: '2',
		title: 'Tareas del hogar',
		entries: ['2001', '2002', '2003'],
	}),
];

export const DummyEntries = [
	entryAdapter.adapt({
		id: '1001',
		title: 'Tomates',
		description: 'Canarios o de ensalada',
	}),
	entryAdapter.adapt({
		id: '1002',
		title: 'Cebollas',
		description: 'Una malla llena',
	}),
	entryAdapter.adapt({
		id: '1003',
		title: 'Lechuga',
		description: 'Mientras no sea iceberg...',
	}),
	entryAdapter.adapt({
		id: '1004',
		title: 'Pimiento verde',
		description: 'De cocinar, no italiano',
		isCompleted: true,
	}),
	entryAdapter.adapt({
		id: '1005',
		title: 'Pimiento rojo',
		description: 'De cocinar, no de freir',
	}),
	entryAdapter.adapt({
		id: '1006',
		title: 'Patatas fritas',
		description: 'Las normales al punto de sal',
		isCompleted: true,
	}),
	entryAdapter.adapt({
		id: '2001',
		title: 'Hacer la colada',
		description: 'Lavadora de blancos y de colores',
	}),
	entryAdapter.adapt({
		id: '2002',
		title: 'Sacar al perro',
		description: 'Tres veces al día',
	}),
	entryAdapter.adapt({
		id: '2003',
		title: 'Pasar la aspiradora',
		description: '',
        isCompleted: true,
	}),
];
