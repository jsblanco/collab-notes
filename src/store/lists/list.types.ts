import { IconNames } from '@app/ui';
import { Task } from 'redux-saga';

export interface AddListPayload {
	title: string;
	icon: IconNames;
	users: string[];
	id?: string;
}
