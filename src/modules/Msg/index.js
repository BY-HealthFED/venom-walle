import Message from '@eightfeet/message';

class Msg extends Message {
	constructor(MessageTheme, outerFrameId){
		super({directionFrom: 'top', style: MessageTheme, parentId: outerFrameId});
	}
    
    showMsg = content => this.create(content, null, true)
    
	hideMsg = () => {
		try {
			this.hide();
		} catch (error) {
			console.log(error);
		}
	}
}

export default Msg;