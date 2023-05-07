import { StyleProp, ViewStyle } from 'react-native';
import { Briefcase } from './sources/Briefcase';
import { ChevronDownIcon } from './sources/ChevronDownIcon';
import { ChevronLeftIcon } from './sources/ChevronLeftIcon';
import { ChevronRightIcon } from './sources/ChevronRightIcon';
import { Clock } from './sources/Clock';
import { Eye } from './sources/Eye';
import { Family } from './sources/Family';
import { FileCheck } from './sources/FileCheck';
import { Files } from './sources/Files';
import { FileSeal } from './sources/FileSeal';
import { HamburgerMenu } from './sources/HamburgerMenu';
import { HandGiving } from './sources/HandGiving';
import { HouseBuilding } from './sources/HouseBuilding';
import { Invoice } from './sources/Invoice';
import { Key } from './sources/Key';
import { LocationPin } from './sources/LocationPin';
import { OldMan } from './sources/OldMan';
import { Person } from './sources/Person';
import { PersonPlus } from './sources/PersonPlus';
import { PlusSign } from './sources/PlusSign';
import { Scale } from './sources/Scale';
import { SmallBed } from './sources/SmallBed';
import { SmallPerson } from './sources/SmallPerson';
import { SmartPhone } from './sources/SmartPhone';
import { Star } from './sources/Star';

export interface SvgPropsType {
	size?: number;
	color?: string;
	style?: StyleProp<ViewStyle>;
}

export interface FillableSvgProps extends SvgPropsType {
	fill?: boolean;
}

export const Icons = {
	Briefcase,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	Clock,
	Eye,
	Family,
	FileCheck,
	FileSeal,
	Files,
	HandGiving,
	HouseBuilding,
	HamburgerMenu,
	Invoice,
	Key,
	LocationPin,
	OldMan,
	Person,
	PersonPlus,
	PlusSign,
	Scale,
	SmallBed,
	SmallPerson,
	SmartPhone,
	Star,
};
