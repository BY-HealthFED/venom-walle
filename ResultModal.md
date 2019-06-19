## ResultModal

抽奖结果弹窗

> extend 底层模块Modal



#### parame

| 参数         | 说明                                                         | 是否必填 | 类型     |
| ------------ | ------------------------------------------------------------ | -------- | -------- |
| style        | 弹窗样式                                                     | 否       | Object   |
| modalTitle   | 弹窗标题，(ex：恭喜您)，不填隐藏                             | 否       |          |
| onCancel     | 关闭弹窗时调用                                               | 否       | Function |
| onEnsure     | onEnsure = (result) => console.log('确定后的结果参数', result), | 否       | Function |
| submitText   | 按钮文字                                                     | 否       | String   |
| outerFrameId | 弹窗所属父级ID                                               | 否       | String   |



#### Options

- ##### showModal: ƒ (prize)

  显示结果弹窗

  ```javascript
  prize = {
        prizeName: '蛋白粉', 
        prizeAlias: '别名', 
        awardMsg: '获奖感言', 
        prizeImg: '奖品图片', 
        memo: '奖品备注'
  }
  ```

- ##### hideModal()

  隐藏结果弹窗