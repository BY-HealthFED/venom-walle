import AddressPicker from '@eightfeet/addresspicker';
import { formatWheelsData } from '~/utils/regionsWheelsHelper.js';

// 格式化数据源为AddressPicker的数据结构
const regions = formatWheelsData(window.BY_HEALTH_REGIONS);

class AddressSelecter extends AddressPicker {
	constructor(config){
		console.log('data.trigger', config.trigger);
		const operationData = {
			title: '请选择省市区', // 设置标题
			triggerDisplayData: true, // 是否在"触发Dom"中显示已选数据 默认false(mobile-select中默认true)
			regions, // 原始数据
			onConfirm(indexArr, data){
				const id = [];
				const name = [];
				for (let index = 0; index < data.length; index++) {
					const element = data[index];
					id.push(element.id);
					name.push(element.value);
				}
				// 为提交表单准备数据
				const triggerDom = document.querySelector(config.trigger);
				triggerDom.setAttribute('data-id', id.join(','));
				triggerDom.setAttribute('data-name', name.join(','));
				console.log('this', this);
			},
			...config
		};

		super(operationData);
	}
}

export default AddressSelecter;