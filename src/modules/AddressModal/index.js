import Modal from '@eightfeet/modal';
import Msg from './../Msg';
import { getIdDom } from '~/utils/htmlFactory';
import validate from 'validate-by-health';
import AddressPicker from './../AddressSelecter';
import { dormancyFor, inlineStyle, countDown } from '~/utils/tools';
import s from './address.scss';

/**
 *
 * 地址弹窗
 * @class AddressModal
 * @extends {Modal}
 */
class AddressModal extends Modal {
	/**
	 * Creates an instance of AddressModal.
	 * @param {*} config
	 * @memberof AddressModal
	 */
	constructor(config){
		const stamp = (new Date()).getTime();
		const { AddressModalTheme, MessageTheme, playerPhone, outerFrameId, receiverInfo, cardIdRequest, checkVerificationCode } = config;
		const {
			content, contentTop, contentBottom, submit,
			header, article, footer, close, regions, row, subTitle,
			label, input, textarea, codeButton, codeButtonDisable,
			notice, noticeIcon, noticeArrow,
			...other
		} = AddressModalTheme || {};
		other.content = {backgroundColor: "transparent"};
		super({
			closable: false,
			parentId: outerFrameId,
			style: other || {}
		});

		this.Msg           = new Msg(MessageTheme, outerFrameId);
		this.playerPhone   = playerPhone;
		this.receiverInfo  = receiverInfo || {};
		this.cardIdRequest = cardIdRequest || 1;
		this.AddressPicker = null;
		this.formStyle = {
			content, contentTop, contentBottom, submit,
			header, article, footer, close, row, subTitle,
			label, input, textarea, codeButton, codeButtonDisable, notice, noticeIcon, noticeArrow
		};
		this.showNotebox = false;
		this.checkVerificationCode = checkVerificationCode || null;
		this.regionsTheme = regions;
		this.addressTrigger = `modal${stamp}-${window.Math.floor(window.Math.random()*100)}`;
		this.readyFillBack = true;
		this.AddressPickerConfig = config.AddressPicker || {};
	}

	/**
	 *
	 * @param { Object } params
	 * params = {playerPhone, receiverName, receiverPhone, cardIdRequest, region, regionName, address, idCard}
	 * @memberof AddressModal
	 */
	updateParams = (params) => {
		if (Object.prototype.toString.call(params) !== '[object Object]') {
			return;
		}
		const {playerPhone, receiverName, receiverPhone, cardIdRequest, region, regionName, address, idCard} = params;
		if (playerPhone) {
			this.playerPhone = playerPhone;
		}
		if (cardIdRequest) {
			this.cardIdRequest = cardIdRequest;
		}
		if (idCard) {
			this.receiverInfo.idCard = idCard;
		}
		if (address) {
			this.receiverInfo.address = address;
		}
		if (regionName) {
			this.receiverInfo.regionName = regionName;
		}
		if (region) {
			this.receiverInfo.region = region;
		}
		if (receiverPhone) {
			this.receiverInfo.receiverPhone = receiverPhone;
		}
		if (receiverName) {
			this.receiverInfo.receiverName = receiverName;
		}
	}

	/**
	 *
	 * 显示地址模块弹窗
	 * @param {Function} submit 提交方法
	 * @param {Function} cancel 取消方法
	 * @returns
	 * @memberof AddressModal
	 */
	showModal = (submit, cancel) => {
		const {id} = this.state;
		const modalElement = getIdDom(id);
		const {content, subTitle, contentTop, contentBottom, header, article, footer, close, row, label, input, textarea, codeButton, codeButtonDisable, notice, noticeIcon, noticeArrow} = this.formStyle;
		
		const rowStyle = inlineStyle(row);
		const contentTopStyle = inlineStyle(contentTop);
		const contentBottomStyle = inlineStyle(contentBottom);
		const inputStyle = inlineStyle(input);
		const closeStyle = inlineStyle(close);
		const contentStyle = inlineStyle(content);
		const headerStyle = inlineStyle(header);
		const articleStyle = inlineStyle(article);
		const footerStyle = inlineStyle(footer);
		const labelStyle = inlineStyle(label);
		const textareaStyle = inlineStyle(textarea);
		const submitStyle = inlineStyle(this.formStyle.submit);
		const codeButtonStyle = inlineStyle(codeButton);
		const codeButtonDisableStyle = inlineStyle(codeButtonDisable);
		const noticeStyle = inlineStyle(notice);
		const noticeIconStyle = inlineStyle(noticeIcon);
		const noticeArrowStyle = inlineStyle(noticeArrow);
		const subTitleStyle = inlineStyle(subTitle);

		const playerDom = `
			${
				this.playerPhone ?
					`
					<div class="${s.clearfix}" ${rowStyle ? `style="${rowStyle}"`:''}>
						<div class="${s.label}" ${labelStyle ? `style="${labelStyle}"`:''}>手机：</div>
						<div class="${s.inp}" style="line-height:2.4em; color: inherit;">
							${this.playerPhone}
						</div>
					</div>
					`:
					''
			}
			${
				this.cardIdRequest === 1 ?
					'':
					`
					<div class="${s.clearfix}" ${rowStyle ? `style="${rowStyle}"`:''}>
						<div class="${s.label}" ${labelStyle ? `style="${labelStyle}"`:''}>身份证：</div>
						<div class="${s.inp}">
							<input placeholder="身份证号码" maxlength="18" class="${s.idcode} ${s.inpelement}" ${inputStyle ? `style="${inputStyle}"`:''} type="text" />
							<span class="${s.note} address__note" ${noticeIconStyle ? `style="${noticeIconStyle}"`:''}>
							&nbsp;
							</span>
							<div class="${s.noteBox}" style="display:none; ${noticeStyle}">
							<div class="${s.arrowup}" ${noticeArrowStyle ? `style="${noticeArrowStyle}"`:''}>&nbsp;</div>
								根据国家税务总局相关规定，企业向消费者赠送礼品，需要依法缴纳个人所得税，因此请您配合提供真实身份信息，身份证信息将严格保管，仅用于纳税使用，感谢您的理解。
							</div>
						</div>
					</div>
					`
			}
			${
				this.playerPhone && typeof(this.checkVerificationCode) === 'function' ?
					`<div class="${s.clearfix}" ${rowStyle ? `style="${rowStyle}"`:''}>
						<div class="${s.label}" ${labelStyle ? `style="${labelStyle}"`:''}>验证码：</div>
						<div class="${s.inphalf} address__verification__code">
							<input placeholder="手机验证码" class="${s.verificationvode} ${s.inpelement}" type="text" ${inputStyle ? `style="${inputStyle}"`:''} />
						</div>
						<div class="${s.inphalf} ${s.inphalfspace} address__verification__code__buttons">
							<button class="${s.btncode} address__check__phone" ${codeButtonStyle ? `style="${codeButtonStyle}"`:''}>获取验证码</button>
							<button class="${s.btncodedisable} address__check__phone__disable" style="${codeButtonDisableStyle ? codeButtonDisableStyle:''}; display:none"></button>
						</div>
					</div>
					`:
					''
			}
		`;
		
		if (!modalElement) {
			return this.create({
				article:
				`<div class="${s.addressBox} address__content" ${contentStyle ? `style="${contentStyle}"`:''}>
					${contentTopStyle ? `<div class="${s.top}" style="${contentTopStyle}">&nbsp;</div>` : ''}
					${contentBottomStyle ? `<div class="${s.bottom}" style="${contentBottomStyle}">&nbsp;</div>` : ''}
					<div class="${s.cancel} address_close" ${closeStyle ? `style="${closeStyle}"`: ''}>&nbsp;</div>
					<div class="${s.formBox}  address__formbox">
						<h3 ${headerStyle ? `style="${headerStyle}"` : ''}>填写地址</h3>
						<div ${articleStyle ? `style="${articleStyle}"` : ''}>
							<div class="address__top">
								${playerDom}
							</div>
							<h4 ${subTitleStyle ? `style="${subTitleStyle}"` : ''}>收货地址(必填)</h4>
							<div>
								<div class="${s.clearfix}" ${rowStyle ? `style="${rowStyle}"`:''}>
									<div class="${s.label}" ${labelStyle ? `style="${labelStyle}"`:''}>收货人：</div>
									<div class="${s.inp}">
										<input maxlength="30" placeholder="收货人姓名" class="${s.receiver} ${s.inpelement}" type="text" ${inputStyle ? `style="${inputStyle}"`:''} />
									</div>
								</div><div class="${s.clearfix}" ${rowStyle ? `style="${rowStyle}"`:''}>
									<div class="${s.label}" ${labelStyle ? `style="${labelStyle}"`:''}>收货电话：</div>
									<div class="${s.inp}">
										<input placeholder="收货人手机" class="${s.phone} ${s.inpelement}" type="tel" maxlength="11" ${inputStyle ? `style="${inputStyle}"`:''} />
									</div>
								</div><div class="${s.clearfix}" ${rowStyle ? `style="${rowStyle}"`:''}>
									<div class="${s.label}" ${labelStyle ? `style="${labelStyle}"`:''}>地址：</div>
									<div class="${s.inp}">
										<button id="${this.addressTrigger}" class="${s.trigger} address__picker__button" ${inputStyle ? `style="${inputStyle}"`:''} >请选择收货省市区/县</button>
									</div>
								</div><div class="${s.clearfix}" ${rowStyle ? `style="${rowStyle}"`:''}>
									<div class="${s.label}" ${labelStyle ? `style="${labelStyle}"`:''}>&nbsp;</div>
									<div class="${s.inp}">
										<textarea maxlength="250"  placeholder="详细地址" class="${s.inpelement} ${s.address}" ${textareaStyle ? `style="${textareaStyle}"`:''} ></textarea>
									</div>
								</div>
							</div>
						</div>
						<div class="${s.button}" ${footerStyle ? `style="${footerStyle}"` : ''}>
							<button class="${s.submit} address_submit" ${submitStyle ? `style="${submitStyle}"`:''}>确定</button>
						</div>
					</div>
				</div>
				`
			}, true)
				.then(() => dormancyFor(500))
				.then(() => {
					if (this.readyFillBack) {
						this.dataFillback();
					}
				})
				.then(() => this.handleDom(submit, cancel));
		}

		modalElement.querySelector('.address__top').innerHTML = playerDom;
		return this.show()
			.then(() => {
				if (this.readyFillBack) {
					this.dataFillback();
				}
			})
			.then(() => this.handleDom(submit, cancel));
	}

	/**
	 *
	 * 以非移除方式隐藏弹窗
	 * @returns
	 * @memberof AddressModal
	 */
	hideModal = () => {
		this.Msg.hideMsg();
		return this.hide(true);
	}

	/**
	 *
	 * 操作弹窗Dom
	 * @param {Function} submit
	 * @param {Function} cancel
	 * @memberof AddressModal
	 */
	handleDom = (submit, cancel) => {
		const {id} = this.state;
		const modalElement = getIdDom(id);
		modalElement.querySelector(`.${s.submit}`).onclick = () => this.handleSubmit(submit);
		modalElement.querySelector(`.${s.cancel}`).onclick = () => {
			cancel && cancel();
			this.hideModal();
		};
		if (this.cardIdRequest !== 1) {
			const noteDom =  modalElement.querySelector(`.${s.note}`);
			const noteBoxDom = modalElement.querySelector(`.${s.noteBox}`);
			if (noteDom) {
				modalElement.querySelector(`.${s.note}`).onclick = (e) => {
					e.stopPropagation();
					if (this.showNotebox === false) {
						this.showNotebox = true;
						noteBoxDom.style.display = "block";
					} else {
						this.showNotebox = false;
						noteBoxDom.style.display = "none";
					}
				};
			}
			if (noteBoxDom) {
				modalElement.querySelector(`.${s.addressBox}`).onclick = () => {
					noteBoxDom.style.display = "none";
				};
			}
		}
		
		if (this.playerPhone && typeof(this.checkVerificationCode) === 'function') {
			const btncode = modalElement.querySelector(`.${s.btncode}`);
			const btncodedisable = modalElement.querySelector(`.${s.btncodedisable}`);
			let start = false;
			btncode.onclick = () => {
				if (start) return;
				start = true;
				this.checkVerificationCode()
					.then(() => {
						start = false;
						btncode.style.display = 'none';
						btncodedisable.style.display = 'block';
						countDown(60, (count) => {
							btncodedisable.innerHTML = `${count}秒后重试`;
							if (count === 0) {
								btncode.style.display = 'block';
								btncodedisable.style.display = 'none';
							}
						});
					});
			};
		}
		
		// s.note s.noteBox
	}

	/**
	 *
	 * 数据回填
	 * @memberof AddressModal
	 */
	dataFillback = () => {
		if (!this.AddressPicker) {
			this.AddressPicker = new AddressPicker({...this.AddressPickerConfig, trigger:`#${this.addressTrigger}`, style:this.regionsTheme});
		}
		const {id} = this.state;
		const modalElement = getIdDom(id);
		const {idCard, receiverName, receiverPhone, region, regionName, address} = this.receiverInfo;

		const idCardDom = modalElement.querySelector(`.${s.idcode}`);
		if (idCard && idCardDom) {idCardDom.value = idCard;}
		if (receiverName) {modalElement.querySelector(`.${s.receiver}`).value = receiverName;}
		if (receiverPhone) {modalElement.querySelector(`.${s.phone}`).value = receiverPhone;}
		if (address) {modalElement.querySelector(`.${s.address}`).value = address;}
		if (region && regionName) {
			const trigger = modalElement.querySelector(`.${s.trigger}`);
			trigger.setAttribute('data-id', region.join(','));
			trigger.setAttribute('data-name', regionName.join(','));
			this.AddressPicker.upDatePicker(region,() => {});
			trigger.innerHTML = regionName.join(' ');
		}
		this.readyFillBack = false;
	}

	/**
	 * 提交与提交回调
	 * 填写收货地址时是否验证身份证:
	 * this.cardIdRequest = 1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
	 * @param {*} submit
	 * @returns
	 * @memberof AddressModal
	 */
	handleSubmit = (submit) => {
		const {id} = this.state;
		const modalElement = getIdDom(id);
		const idcodeDom = modalElement.querySelector(`.${s.idcode}`);
		const idcode = idcodeDom ? idcodeDom.value : undefined;
		const receiver = modalElement.querySelector(`.${s.receiver}`).value;
		const phone = modalElement.querySelector(`.${s.phone}`).value;
		const regions = modalElement.querySelector(`.${s.trigger}`).getAttribute('data-id');
		const regionsName = modalElement.querySelector(`.${s.trigger}`).getAttribute('data-name');
		const address = modalElement.querySelector(`.${s.address}`).value;

		const verificationvodeDom =  modalElement.querySelector(`.${s.verificationvode}`);
		const verificationvode = verificationvodeDom ? verificationvodeDom.value : undefined;

		const data = {receiver, phone, regions, regionsName, address};

		if (idcode) {
			data.idcode = idcode;
		}

		let validateData = {
			VName: receiver,
			VPhone: phone,
			VRequire_trigger: [regions, '请选择省市区'],
			VRequire_address: [address, '请输入详细地址']
		};
		
		if (verificationvodeDom) {
			data.verificationvode = verificationvode;
			validateData = {
				VRequire_verificationvode: [verificationvode, '请输入正确验证码', 4],
				...validateData
			};
		}

		if (this.cardIdRequest === 2) {
			validateData = {
				VIdCard: idcode,
				...validateData
			};
		}

		if (this.cardIdRequest === 3) {
			if (idcode) {
				validateData = {
					VIdCard: idcode,
					...validateData
				};
			}
		}

		const error = validate(validateData);

		if (error) {
			this.Msg.showMsg(error);
			return;
		}
		submit && submit(data);
		this.hideModal();
	}
}

export default AddressModal;
