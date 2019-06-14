### 瓦力

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

```javascript
    import {
        /**
         *
         * 地址弹窗
         * @class AddressModal
         * @extends {Modal}
         */
        AddressModal,
        /**
         * 中奖结果弹窗
         * @class ResultModal
         * @extends {Modal}
         */
        ResultModal,
        /**
         * 弱提示
         * @class Msg
         * @extends {Message}
         */
        Msg,
        /**
         * 消息弹窗
         * @class NoticeModal
         * @extends {Modal}
         */
        NoticeModal,
        Loading,
        AddressPicker,
        validate,
        Message,
        Modal,
        htmlFactory: {
            createDom, // createDom: (dom: HTMLElement, target: string, parentId: any, emBase: any) => Promise<any>
            removeDom, // removeDom: (target: string) => Promise<any>
            combineDomByClass, // combineDomByClass: (dom: any, classes: any) => Promise<any>
            inlineStyle // inlineStyle: (style: any) => any
        },
        tools: {
            isPC, // isPC: boolean
            isObject, // isObject: (value: any) => boolean
            countDown, // countDown: (times: any, callback: any) => void
            dormancyFor, // dormancyFor: (time: any) => Promise<any>
            fixpx, // fixpx: (px: any) => string | 0
            setEmBase // setEmBase: (dom: HTMLElement, emBase: any) => void
        },
        regionsDataFormat: {
            formatWheelsData, // formatWheelsData: (data: any) => { id: string; value: any; childs: any[]; }[]
            getPositionByDefaultValue //  getPositionByDefaultValue: (defaultData: any, wheels: any) => number[]
        },
        webAnimation: {
            onceTransitionEnd, // onceTransitionEnd: (element: any, options?: {}) => Promise<any>
            onceAnimationEnd // onceAnimationEnd: (element: any, options?: {}) => Promise<any>
        }
    } from '@eightfeet/walle';


    // 收获地址模块
    const address = new AddressModal({
        AddressModalTheme: window.themedata.AddressModalTheme, // 弹窗皮肤
        outerFrameId: 'wrap', // 弹窗所属父级ID
        MessageTheme: window.themedata.MessageTheme,
        playerPhone: 13111121112,
        receiverInfo: {
        idCard: 123123123123123123,
        address: '省市区详细地址',
        regionName: ['广东省','广州市','天河区'],
        region: ['15', '1513', '151315'],
        receiverPhone: 13555555555,
        receiverName: 'name'
        },
        cardIdRequest: 1, // 1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
        checkVerificationCode: () => new Promise((resolve, reject) => {
        resolve();
        })
    });

    // 活动失败弹窗
    const falied = new ResultModal({
        style: window.themedata.FailedModalTheme, 
        modalTitle: '很遗憾', 
        onCancel: () => console.log('关闭失败弹窗'), 
        onEnsure: (prize) => console.log('确定失败弹窗', prize),
        submitText: '知道了', 
        outerFrameId: 'wrap', // 弹窗所属父级ID
    });

    // 活动获奖弹窗
    const success = new ResultModal({
        style: window.themedata.SuccessModalTheme, 
        modalTitle: '恭喜您', 
        onCancel: () => console.log('关闭成功弹窗'), 
        onEnsure: (prize) => console.log('确定成功弹窗', prize),
        submitText: '知道了', 
        outerFrameId: 'wrap', // 弹窗所属父级ID
    });

    // 消息弹窗
    const notice = new NoticeModal(window.themedata.NoticeModalTheme, 'wrap');

    // 弱提示
    const message = new Msg(window.themedata.MessageTheme, 'wrap');
```


```html
    <body>
    <div id="wrap">
    </div>
    <button onclick="address.showModal(data => console.log('提交地址弹窗', data), 
      () => console.log('关闭地址弹窗'));">
      填写收货人地址
    </button>
    <button onclick="falied.showModal({
      prizeName: '谢谢参与', 
      prizeAlias: '别名', 
      awardMsg: '获奖感言', 
      prizeImg: '奖品图片', 
      memo: '奖品备注'}).then(() => console.log('falied Go!'));">
        失败弹窗模块
    </button>
    <button onclick="success.showModal({
      prizeName: '蛋白粉', 
      prizeAlias: '别名', 
      awardMsg: '获奖感言', 
      prizeImg: '奖品图片', 
      memo: '奖品备注'}).then(() => console.log('success Go!'));">
        成功弹窗模块
    </button>
    <button onclick="notice.showModal({
        title: '对不起', 
        content: '文本内容',
      }, () => console.log('关闭消息弹窗')).then(() => console.log('notice Go!'));">
        消息弹窗
    </button>
    <button onclick="message.create('这是弱提示！');">
      弱提示
    </button>
  </body>
```
