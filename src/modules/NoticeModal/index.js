
import Modal from '@eightfeet/modal';
import { inlineStyle } from '~/utils/tools';
import s from './NoticeModal.scss';

class NoticeModal extends Modal {
	constructor(style, outerFrameId){
		const {
			contentTop, contentBottom, submit,
			header, article, footer, modalTitle,
			...other
		} = style || {};
		
		super({style: other, parentId: outerFrameId});

		this.theme = {
			contentTop, contentBottom, submit, modalTitle,
			header, article, footer
		};
	}
	
	showModal = ({title, content, footer}, onCancel) => {
		// state 来自父级
		const {id} = this.state;
		// 配置弹窗回调
		if (onCancel && typeof onCancel === 'function') {
			this.state.onCancel = onCancel;
		} else {
			this.state.onCancel = null;
		}

		let modalElement = document.getElementById(id);
		const {
			contentTop, contentBottom, submit,
			modalTitle,
			header, article
		} = this.theme;
		const contentTopStyle = inlineStyle(contentTop);
		const contentBottomStyle = inlineStyle(contentBottom);
		const modalTitleStyle = inlineStyle(modalTitle);
		const submitStyle = inlineStyle(submit);
		const headerStyle = inlineStyle(header);
		const articleStyle = inlineStyle(article);
		const footerStyle = inlineStyle(this.theme.footer);
		const gamedom = `
			${contentBottomStyle ? `<div class="${s.bottom}" style="${contentBottomStyle}">&nbsp;</div>` : ''}
			${contentTopStyle ? `<div class="${s.top}" style="${contentTopStyle}">&nbsp;</div>` : ''}
			<div id="${id}_header" ${headerStyle ? `style="${headerStyle}"`:''}>
				${title ? `<div ${modalTitleStyle ? `style="${modalTitleStyle}"`:''}>${title}</div>` : ''}
			</div>
			<div id="${id}_article" ${articleStyle ? `style="${articleStyle}"`:''}>
				${content || ''}
			</div>
			<div id="${id}_footer" ${footerStyle ? `style="${footerStyle}"`:''}>
				${footer ? footer : `<button class="${s.button}" ${submitStyle ? `style="${submitStyle}"`:''}>确定</button>`}
			</div>
		`;

		if (!modalElement) {
			return this.create({
				article: `<div class="${s.mainid} successmodal__content">
					${gamedom}
				</div>`
			}, true)
				.then(() => new Promise(resolve => {
					modalElement = document.getElementById(id);
					const button = modalElement.querySelector(`.${s.button}`);
					if (!button) {
						resolve();
						return;
					}
					window.setTimeout(()=> {
						modalElement.querySelector(`.${s.button}`).onclick = () => {
							this.hideModal();
							resolve();
						};
					}, 500);
				}));
		}
		const mainElement = modalElement.querySelector(`.${s.mainid}`);
		mainElement.innerHTML = '';
		return this.show()
			.then(() => new Promise(resolve => {
				mainElement.innerHTML = gamedom;
				const button = mainElement.querySelector(`.${s.button}`);
				if (!button) {
					resolve();
					return;
				}
				window.setTimeout(()=> {
					modalElement.querySelector(`.${s.button}`).onclick = () => {
						this.hideModal();
						resolve();
					};
				}, 500);
			}));
	}

	hideModal = () => this.hide(true)
}

export default NoticeModal;
