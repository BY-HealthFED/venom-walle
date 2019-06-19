## AddressModal

收货地址弹窗

> extend 底层模块Modal
> 包含底层模块与工具 （AddressPicker、 Modal、 Message、 validate）

#### parame

| 参数                  | 说明                                                         | 是否必填 | 类型     |
| --------------------- | ------------------------------------------------------------ | -------- | -------- |
| AddressModalTheme     | 填写地址弹窗的样式                                           | 否       | Object   |
| MessageTheme          | 弱提示弹窗的样式                                             | 否       | Object   |
| cardIdRequest         | 身份证信息验证<br />1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证 | 否       | Number   |
| receiverInfo          | 默认收货人信息<br />{<br />    idCard: 身份证号, <br />    receiverName: 收货人姓名, <br />    receiverPhone: 收货人电话, <br />    region: ['15', '1513', '151315'] 收货省市区id, <br />    regionName: ['广东省','广州市','天河区'] 收货省市区, <br />    address: 详细地址<br />} | 否       | Object   |
| playerPhone           | 参与人电话号码                                               | 否       | String   |
| checkVerificationCode | 检查短信验证码，验证参与人                                   | 否       | Function |
| outerFrameId          | 弹窗所属父级ID                                               | 否       | String   |



#### Options

- ##### showModal( onConfirma,  onCancel )   

  ```javascript
  onConfirma = function(data){
  	console.log('表单通过验证后收集到的数据', data)
  }
  ```

  ```javascript
  onCancel = function(){
  	console.log('关闭地址填写的回调')
  }
  ```

- ##### hideModal()  

  隐藏地址填写弹窗

- ##### AddressPicker

  参考AddressPicker的Option

- ##### Msg

  参考Msg的Option

