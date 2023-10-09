// 组件类型
export const isTextComponent = 0b00000001; // 1
export const isImgComponent = 0b00000010; // 2
export const isGraphComponent = 0b00000011; // 3
export const isGroupComponent = 0b00001000; // 8
export const isUploadComponent = 0b00001001; // 



// 表单组件
export const isFormComponent_Input = 0b10000000; //128
export const isFormComponent_Button = 0b01000000; // 64
export const isFormComponent = isFormComponent_Input | isFormComponent_Button;

export const defaultComponentStyle_0 = {
  position: "absolute",
  top: 0,
  left: 0,
};

export const defaultComponentStyle = {
  ...defaultComponentStyle_0,
  width: 80,
  height: 80,
  borderRadius: "0%",
  borderStyle: "none",
  borderWidth: "0",
  borderColor: "#ffffff",
  transform: 0, //"rotate(0deg)"
  animationName: "",
  // ! 不让用户修改
  boxSizing: "border-box",
};


export const defaultImgStyle = {
  ...defaultComponentStyle,
  border: 'none',
  width: 375,
  height: 120,
}

export const defaultImgProps = {
  style: defaultImgStyle,
  props: {
    src: ''
  },
  type: isImgComponent
}

export const defaultTextProps = {
  style: defaultComponentStyle,
  props: {
    value: '双击编辑文案'
  },
  type: isTextComponent
}