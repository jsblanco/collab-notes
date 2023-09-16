import { IconNames } from '@app/ui';
import {
	DbList,
	Periodicity,
	Task,
	TaskToggleEvent,
	User,
} from '../src/models';

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
	{
		id: 'c',
		lists: ['1'],
		email: 'irano@email.com',
		name: 'Irano',
		friends: ['a'],
	},
	{
		id: 'd',
		lists: ['1'],
		email: 'Anita@email.com',
		name: 'Anita',
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
		periodicity: Periodicity.MANUAL,
		images: [
			{
				preview:
					'https://pbs.twimg.com/profile_images/649256113783836672/r30IvLdn_400x400.jpg',
				id: 'https://pbs.twimg.com/profile_images/649256113783836672/r30IvLdn_400x400.jpg',
			},
			{
				preview:
					'https://static.diariosur.es/www/multimedia/201803/08/media/cortadas/122427314--624x492.jpg',
				id: 'https://static.diariosur.es/www/multimedia/201803/08/media/cortadas/122427314--624x492.jpg',
			},
			{
				preview:
					'https://frutasolivar.com/wp-content/uploads/2019/01/el-tomote-es-una-fruta2-e1579691212614.jpg',
				id: 'https://frutasolivar.com/wp-content/uploads/2019/01/el-tomote-es-una-fruta2-e1579691212614.jpg',
			},
		],
		history: [
			createFakeTaskToggleEvent('a', false, 3),
			createFakeTaskToggleEvent('c', true, 8),
			createFakeTaskToggleEvent('b', false, 16),
			createFakeTaskToggleEvent('d', true, 18),
		],
	},
	{
		id: '1002',
		listId: '1',
		title: 'Cebollas',
		description: 'Una malla llena',
		isCompleted: false,
		periodicity: Periodicity.MONTHLY,
		images: [
			{
				preview:
					'https://www.jiomart.com/images/product/original/590001744/onion-5-kg-pack-product-images-o590001744-p590001744-0-202203170154.jpg?im=Resize=(420,420)',
				id: 'https://www.jiomart.com/images/product/original/590001744/onion-5-kg-pack-product-images-o590001744-p590001744-0-202203170154.jpg?im=Resize=(420,420)',
			},
		],
		history: [
			createFakeTaskToggleEvent('a', false, 2),
			createFakeTaskToggleEvent('d', true, 4),
			createFakeTaskToggleEvent('b', false, 6),
			createFakeTaskToggleEvent('c', true, 8),
		],
	},
	{
		id: '1003',
		listId: '1',
		title: 'Lechuga',
		description: 'Mientras no sea iceberg...',
		isCompleted: false,
		periodicity: Periodicity.WEEKLY,
		images: [],
		history: [
			createFakeTaskToggleEvent('b', false, 5),
			createFakeTaskToggleEvent('c', true, 9),
		],
	},
	{
		id: '1004',
		listId: '1',
		title: 'Pimiento verde',
		description: 'De cocinar, no italiano',
		isCompleted: true,
		periodicity: Periodicity.MANUAL,
		images: [],
		history: [
			createFakeTaskToggleEvent('b', true, 1),
			createFakeTaskToggleEvent('d', false, 3),
			createFakeTaskToggleEvent('c', true, 8),
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
		periodicity: Periodicity.MANUAL,
		images: [
			{
				preview:
					'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Red-peppers-afa27f8.jpg',
				id: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Red-peppers-afa27f8.jpg',
			},
		],
		history: [
			createFakeTaskToggleEvent('b', false, 2),
			createFakeTaskToggleEvent('c', true, 6),
			createFakeTaskToggleEvent('d', false, 7),
			createFakeTaskToggleEvent('a', true, 9),
		],
	},
	{
		id: '1006',
		listId: '1',
		title: 'Patatas fritas',
		description: 'Las normales al punto de sal',
		isCompleted: true,
		periodicity: Periodicity.DAILY,
		images: [
			{
				preview:
					'https://www.lacasadelasgolosinas.com/6998-thickbox_default/lay-s-al-punto-de-sal-bolsita-44gr.jpg',
				id: 'https://www.lacasadelasgolosinas.com/6998-thickbox_default/lay-s-al-punto-de-sal-bolsita-44gr.jpg',
			},
			{
				preview:
					'https://comerciovending.com/8407-large_default/ruffles-jamon-hosteleria.jpg',
				id: 'https://comerciovending.com/8407-large_default/ruffles-jamon-hosteleria.jpg',
			},
			{
				preview:
					'https://olefoodmarket.com/cdn/shop/products/09-Patatas-fritas-crujientes-a-la-sarte-n-Hacendado.jpg?v=1636545393',
				id: 'https://olefoodmarket.com/cdn/shop/products/09-Patatas-fritas-crujientes-a-la-sarte-n-Hacendado.jpg?v=1636545393',
			},
			{
				preview:
					'https://prod-mercadona.imgix.net/images/70287f1c1d5f4d75c76a0edd4063fa7c.jpg?fit=crop&h=1300&w=1300',
				id: 'https://prod-mercadona.imgix.net/images/70287f1c1d5f4d75c76a0edd4063fa7c.jpg?fit=crop&h=1300&w=1300',
			},
		],
		history: [
			createFakeTaskToggleEvent('a', true, 1),
			createFakeTaskToggleEvent('d', false, 3),
			createFakeTaskToggleEvent('c', true, 8),
		],
	},
	{
		id: '2001',
		listId: '2',
		title: 'Hacer la colada',
		description: 'Lavadora de blancos y de colores',
		isCompleted: false,
		periodicity: Periodicity.MANUAL,
		images: [
			{
				preview:
					'https://www.ikea.com/es/es/images/products/tvattad-lavadora-secadora-integrada-blanco__1149203_pe883901_s5.jpg?f=s',
				id: 'https://www.ikea.com/es/es/images/products/tvattad-lavadora-secadora-integrada-blanco__1149203_pe883901_s5.jpg?f=s',
			},
		],
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
		periodicity: Periodicity.DAILY,
		images: [],
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
		periodicity: Periodicity.WEEKLY,
		images: [
			{
				preview:
					'https://t2.uc.ltmcdn.com/es/posts/5/5/4/como_escoger_una_aspiradora_17455_orig.jpg',
				id: 'https://t2.uc.ltmcdn.com/es/posts/5/5/4/como_escoger_una_aspiradora_17455_orig.jpg',
			},
			{
				preview:
					'https://images.hola.com/imagenes/decoracion/20200806172524/aspirador-como-elegir-mejor-limpiar-casa-mc/0-849-609/elegir-aspirador-m.jpg?tx=w_680',
				id: 'https://images.hola.com/imagenes/decoracion/20200806172524/aspirador-como-elegir-mejor-limpiar-casa-mc/0-849-609/elegir-aspirador-m.jpg?tx=w_680',
			},
		],
		history: [
			createFakeTaskToggleEvent('a', true, 2),
			createFakeTaskToggleEvent('a', false, 7),
			createFakeTaskToggleEvent('a', true, 9),
		],
	},
];

export const DummyLists: Map<string, DbList> = new Map([
	[
		'1',
		{
			id: '1',
			icon: IconNames.cart,
			title: 'Lista de la compra',
			tasks: new Set(['1001', '1002', '1003', '1004', '1005', '1006']),
			users: new Set(['a', 'b', 'c', 'd']),
		},
	],
	[
		'2',
		{
			id: '2',
			icon: IconNames.home,
			title: 'Tareas del hogar',
			tasks: new Set(['2001', '2002', '2003']),
			users: new Set(['a']),
		},
	],
]);
