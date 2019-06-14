import AddressModal from './modules/AddressModal';
import ResultModal from './modules/ResultModal';
import Msg from './modules/Msg';
import NoticeModal from './modules/NoticeModal';

import Loading from '@eightfeet/loading';
import AddressPicker from '@eightfeet/addresspicker';
import validate from 'validate-by-health';
import Message from '@eightfeet/message';
import Modal from '@eightfeet/modal';

// tools
import { isPC, setEmBase, createDom, removeDom, combineDomByClass } from './utils/htmlFactory';
import { formatWheelsData, getPositionByDefaultValue } from './utils/regionsWheelsHelper';
import { isObject, countDown, dormancyFor, fixpx, inlineStyle } from './utils/tools';
import { onceTransitionEnd, onceAnimationEnd } from './utils/web-animation-club';

if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

module.exports = {
	AddressModal,
	ResultModal,
	Msg,
	NoticeModal,
	Loading,
	AddressPicker,
	validate,
	Message,
	Modal,
	htmlFactory: {
		createDom,
		removeDom,
		combineDomByClass,
		inlineStyle
	},
	tools: {
		isPC,
		isObject,
		countDown,
		dormancyFor,
		fixpx,
		setEmBase
	},
	regionsDataFormat: {
		formatWheelsData,
		getPositionByDefaultValue
	},
	webAnimation: {
		onceTransitionEnd,
		onceAnimationEnd
	}
};

