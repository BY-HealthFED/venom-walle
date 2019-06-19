## 可定义样式



| 底层模块UI订制                                               | 游戏模块UI订制包含以下属性                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [AddressPicker 地址选择](<#g>)<br />[Message 弱提醒](<#h>)<br />[Loading 加载](<#i>)<br />[Modal 弹窗](<#j>) | [GameTheme 游戏皮肤](<#a>)<br /> [FailedModalTheme 失败弹窗皮肤](<#b>) <br />[SuccessModalTheme 成功弹窗皮肤](<#b>)<br /> [NoticeModalTheme 消息提醒弹窗皮肤](<#c>)<br /> [AddressModalTheme 地址选择弹窗皮肤](<#d>) <br />[MessageTheme 弱提示皮肤](<#e>) <br />[LoadingTheme Loading皮肤](<#f>) |





AddressPicker

#### <span id="g">AddressPicker</span>

```javascript
"style": {
    "confirmBtn": {
        确定按钮
    },
	"cancelBtn": {
        取消按钮
    },
	"overlay": {
		遮罩层
	},
	"popularCities": {
		热门城市
	},
	"popularCitiesTitle": {
        热门城市标题
	},
	"popularCitiesItem": {
        热门城市项
	}
}
```



#### <span id="h">Message</span>

```javascript
"style": {
    "wrap": {
        包裹层
    },
    "main": {
        内容层
    }
},
```



#### <span id="i">Loading</span>

```javascript
"style": {
    "overlay": {
        遮罩层
    },
	"content": {
		内容区域
	},
	"vertices": {
        节点定义
        
		// size可以设置Loading的大小
		"size": "30%", 
            
		// elements用来定义是节点数目与颜色，elements为数字时定义节点数目
        // elements为数组时，数组的长度定义节点的数目，数组子项为颜色属性时代表每个节点的颜色，用来定制彩色Loading
		"elements": ["red", "green", "blue", "yellow", "orange"] //
	}
}
```



#### <span id="j">Modal</span>

```javascript
"style": {
	"overlay": {遮罩层}, 
	"content": {内容区域}, 
	"close": {关闭按钮}, 
	"header": {头部}, 
	"article": {文本内容}, 
	"footer": {脚部},
    "modify": [{
		修饰层 
    }]
}
```





#### <span id="a">GameTheme</span>

根据不同抽奖形式而不同，参考对应抽奖模块的样式定义



#### <span id="b">FailedModalTheme、SuccessModalTheme</span>

```javascript
"FailedModalTheme": {
      "overlay": {
        遮罩层
      },
      "modalTitle": {
        标题
      },
      "content": {
        内容
      },
      "contentTop": {
        内容顶部
      },
      "contentBottom": {
        内容底部
      },
      "close": {
        关闭按钮
      },
      "submit": {
        提交按钮
      },
      "article": {
        文本内容
      },
      "prizeAlias": {
		奖品别名	
      },
      "prizeName": {
        奖品名称
      },
      "prizeImg": {
        奖品图片
      },
      "memo": {
        奖品备注
      },
      "modify": [{
		修饰层 
      }]
    },
```



#### <span id="c">NoticeModalTheme</span>

```javascript
"NoticeModalTheme": {
      "overlay": {
        遮罩层
      },
      "content": {
        内容
      },
      "contentTop": {
        内容顶部
      },
      "contentBottom": {
        内容底部
      },
      "close": {
        关闭按钮
      },
      "submit": {
        提交按钮
      },
      "article": {
        文本内容
      },
      "modalTitle": {
        模块标题
      },
      "modify": [{
		修饰层 
      }]
    }
```



#### <span id="d">AddressModalTheme</span>

```javascript
"AddressModalTheme": {
      "overlay": {
        遮罩层
      },
      "content": {
        内容
      },
      "contentTop": {
        内容顶部
      },
      "contentBottom": {
        内容底部
      },
      "header": {
        头部
      },
      "article": {
        文本内容
      },
      "footer": {
        脚部
      },
      "close": {
        关闭按钮
      },
      "row": {
        表单行
      },
      "label": {
        表单标签
      },
      "input": {
        输入input
      },
      "textarea": {
        输入textarea
      },
      "codeButton": {
        获取验证码按钮
      },
      "codeButtonDisable": {
        获取验证码按钮禁用状态
      },
      "submit": {
        提交按钮
      },
      "regions": 
        "confirmBtn": {地址选择-确定按钮},
        "cancelBtn": {地址选择-取消按钮},
        "overlay": {地址选择-遮罩层},
        "popularCities": {地址选择-热门城市},
		"popularCitiesTitle": {地址选择-热门城市-标题},
		"popularCitiesItem": {地址选择-热门城市-项},
      }
    }
```



#### <span id="e">MessageTheme</span>

```JavaScript
"MessageTheme": {
    "wrap": {
        包裹层
    },
    "main": {
        内容层
    }
},
```



#### <span id="f">LoadingTheme</span>

```javascript
"LoadingTheme": {
    "overlay": {
        遮罩层
    },
	"content": {
		内容区域
	},
	"vertices": {
        节点定义
        
		// size可以设置Loading的大小
		"size": "30%", 
            
		// elements用来定义是节点数目与颜色，elements为数字时定义节点数目
        // elements为数组时，数组的长度定义节点的数目，数组子项为颜色属性时代表每个节点的颜色，用来定制彩色Loading
		"elements": ["red", "green", "blue", "yellow", "orange"] //
	}
}
```

