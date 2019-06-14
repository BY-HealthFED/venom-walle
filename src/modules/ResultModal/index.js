
import Modal from '@eightfeet/modal';
import s from './result.scss';
import { inlineStyle } from '~/utils/tools.js';

class ResultModal extends Modal {
	constructor({style, modalTitle, outerFrameId, onCancel, submitText, onEnsure, submitAddressText}){
		const {
			prizeAlias,
			prizeName,
			awardMsg,
			prizeImg,
			memo,
			contentTop, contentBottom, submit,
			header, article, footer,
			...other
		} = style || {};
		
		super({style: other, onCancel, parentId:outerFrameId});

		this.modalTitle = modalTitle || null;
		this.submitText = submitText || '确定';
		this.submitAddressText = submitAddressText || '去填写地址';
		this.onEnsure = onEnsure || null;

		this.theme = {
			modalTitle: style.modalTitle,
			prizeAlias,
			prizeName,
			awardMsg,
			prizeImg,
			memo,
			contentTop, contentBottom, submit,
			header, article, footer
		};
	}
	
	showModal = (prize) => {
		// state 来自父级
		const {id} = this.state;
		let modalElement = document.getElementById(id);
		const {
			modalTitle,
			prizeAlias,
			prizeName,
			awardMsg,
			prizeImg,
			memo,
			contentTop, contentBottom, submit,
			header, article, footer
		} = this.theme;

		const modalTitleStyle = inlineStyle(modalTitle);
		const prizeAliasStyle = inlineStyle(prizeAlias);
		const prizeNameStyle = inlineStyle(prizeName);
		const awardMsgStyle = inlineStyle(awardMsg);
		const prizeImgStyle = inlineStyle(prizeImg);
		const memoStyle = inlineStyle(memo);
		const contentTopStyle = inlineStyle(contentTop);
		const contentBottomStyle = inlineStyle(contentBottom);
		const submitStyle = inlineStyle(submit);
		const headerStyle = inlineStyle(header);
		const articleStyle = inlineStyle(article);
		const footerStyle = inlineStyle(footer);
		const gamedom = `
			${contentBottomStyle ? `<div class="${s.bottom}" style="${contentBottomStyle}">&nbsp;</div>` : ''}
			${contentTopStyle ? `<div class="${s.top}" style="${contentTopStyle}">&nbsp;</div>` : ''}
			<div ${headerStyle ? `style="${headerStyle}"`:''}>
				${this.modalTitle ? `<div ${modalTitleStyle ? `style="${modalTitleStyle}"`:''}>${this.modalTitle}</div>` : ''}
			</div>
			<div ${articleStyle ? `style="${articleStyle}"`:''}>
				<div ${prizeNameStyle ? `style="${prizeNameStyle}"`:''}>${prize.prizeName || ''}</div>
				${prizeAliasStyle ? `<div style="${prizeAliasStyle}">${prize.prizeAlias || ''}</div>` : ''}
				<div ${awardMsgStyle ? `style="${awardMsgStyle}"`:''}>${prize.awardMsg || ''}</div>
				<img ${prizeImgStyle ? `style="${prizeImgStyle}"`:''} src="${prize.prizeImg}" />
				<div ${memoStyle ? `style="${memoStyle}"`:''}>${prize.memo || ''}</div>
			</div>
			<div ${footerStyle ? `style="${footerStyle}"`:''}>
				<button class="${s.button}" ${submitStyle ? `style="${submitStyle}"`:''}>${prize.receiveType === 2 ? this.submitAddressText : this.submitText}</button>
			</div>
		`;

		if (!modalElement) {
			return this.create({
				article: `<div class="${s.mainid}">
					${gamedom}
				</div>`
			}, true)
				.then(() => new Promise(resolve => {
					modalElement = document.getElementById(id);
					window.setTimeout(()=> {
						modalElement.querySelector(`.${s.button}`).onclick = () => {
							this.hideModal();
							this.onEnsure && this.onEnsure(prize);
							resolve(prize);
						};
					}, 500);
				}));
		}
		const mainElement = modalElement.querySelector(`.${s.mainid}`);
		mainElement.innerHTML = '';
		return this.show()
			.then(() => new Promise(resolve => {
				mainElement.innerHTML = gamedom;
				window.setTimeout(()=> {
					modalElement.querySelector(`.${s.button}`).onclick = () => {
						this.hideModal();
						this.onEnsure && this.onEnsure(prize);
						resolve(prize);
					};
				}, 500);
			}));
	}

	hideModal = () => this.hide(true)
}

export default ResultModal;
