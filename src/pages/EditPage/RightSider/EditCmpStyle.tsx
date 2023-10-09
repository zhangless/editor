import Item from "src/lib/Item";
import styles from "./edit.module.less";
import { Style } from "src/store/editStoreTypes";
import type { HandleAttributesChangeType } from "./EditCmp";
import InputColor from "src/lib/InputColor";
import { updateSelectedCmpStyle } from "src/store/editStore";
import {
  InputNumber,
  ColorPicker,
  Select,
  Input,
  Slider,
  Button,
  Space,
} from "antd";
import type { Color } from "antd/es/color-picker";

interface Props {
  value?: string;
  placeholder?: string;
  inputType?: string;
  action?: string;
  onClick?:
    | string
    | {
        url: string;
        afterSuccess: "pop" | "url";
        popMsg?: string;
        link?: string;
      };
  styleName: string;
  styleValue: Style;
  label?: string;
  handleAttributesChange: HandleAttributesChangeType;
}

const afterSuccessOption = [
  {
    value: "pop",
    lable: "弹窗提示",
  },
  {
    value: "url",
    lable: "跳转链接",
  },
];

export default function EditCmpStyle({
  value,
  placeholder,
  inputType,
  onClick,
  styleName,
  styleValue,
  label,
  handleAttributesChange,
}: Props) {
  const handleAnimationStyleChange = ({
    name,
    value,
    action,
  }: {
    name?: string;
    value?: string | number;
    action?: string;
  }) => {
    let newStyle = {
      animationName: value,
      animationIterationCount:
        styleValue.animationIterationCount == undefined
          ? 1
          : styleValue.animationIterationCount,
      animationDuration:
        styleValue.animationDuration == undefined
          ? "1s"
          : styleValue.animationDuration,
      animationDelay:
        styleValue.animationDelay == undefined ? 0 : styleValue.animationDelay,
      animationPlayState: "running",
    };

    updateSelectedCmpStyle(newStyle);
  };

  return (
    <>
      {label !== undefined && (
        <Item label="标签: ">
          <input
            type="text"
            className={styles.itemRight}
            value={label}
            onChange={(e) => {
              handleAttributesChange({ label: e.target.value });
            }}
          />
        </Item>
      )}

      {/* 宽高 */}
      {styleValue.width !== undefined && (
        <Item label="宽度: ">
          <InputNumber
            className={styles.itemRight}
            type="number"
            value={styleValue.width}
            onChange={(value) =>
              handleAttributesChange({
                [styleName]: {
                  width: value,
                },
              })
            }
          />
        </Item>
      )}
      {styleValue.height !== undefined && (
        <Item label="高度: ">
          <InputNumber
            className={styles.itemRight}
            type="number"
            value={styleValue.height}
            onChange={(value) =>
              handleAttributesChange({
                [styleName]: {
                  height: value,
                },
              })
            }
          />
        </Item>
      )}

      {placeholder !== undefined && (
        <Item label="提示输入: ">
          <input
            type="text"
            className={styles.itemRight}
            value={placeholder}
            onChange={(e) => {
              handleAttributesChange({ placeholder: e.target.value });
            }}
          />
        </Item>
      )}
      {inputType !== undefined && (
        <Item label="文本类型: ">
          <select
            className={styles.itemRight}
            value={inputType}
            onChange={(e) => {
              handleAttributesChange({ inputType: e.target.value });
            }}
          >
            <option value="text">文本</option>
            <option value="number">数字</option>
            <option value="password">密码</option>
            <option value="date">日期</option>
            <option value="checkbox">checkbox</option>
          </select>
        </Item>
      )}

      {/* 字体 */}
      {styleValue.fontSize !== undefined && (
        <>
          <Item label="字体大小: ">
            <InputNumber
              className={styles.itemRight}
              value={styleValue.fontSize}
              onChange={(e) => {
                handleAttributesChange({
                  [styleName]: {
                    fontSize: parseInt(e.target.value) - 0,
                  },
                });
              }}
            />
          </Item>

          <Item label="字体粗细: ">
            <select
              className={styles.itemRight}
              value={styleValue.fontWeight}
              onChange={(e) => {
                handleAttributesChange({
                  [styleName]: {
                    fontWeight: e.target.value,
                  },
                });
              }}
            >
              <option value="normal">normal</option>
              <option value="bold">bold</option>
              <option value="lighter">lighter</option>
            </select>
          </Item>

          <Item label="行高: ">
            <input
              type="number"
              className={styles.itemRight}
              value={parseInt(styleValue.lineHeight)}
              onChange={(e) => {
                handleAttributesChange({
                  [styleName]: {
                    lineHeight: e.target.value + "px",
                  },
                });
              }}
            />
          </Item>
          <Item label="对齐: ">
            <Select
              className={styles.itemRight}
              value={styleValue.textAlign}
              onChange={(value) => {
                handleAttributesChange({
                  [styleName]: {
                    textAlign: value,
                  },
                });
              }}
            >
              <option value="left">居左</option>
              <option value="center">居中</option>
              <option value="right">居右</option>
            </Select>
          </Item>
          <Item label="字体颜色: ">
            <InputColor
              className={styles.itemRight}
              color={styleValue.color}
              onChangeComplete={(e: any) =>
                handleAttributesChange({
                  [styleName]: {
                    color: `rgba(${Object.values(e.rgb).join(",")})`,
                  },
                })
              }
            />
          </Item>
          <Item
            label="装饰线: "
            tips="如果设置完还是看不到装饰线，调整下行高试试~"
          >
            <select
              className={styles.itemRight}
              value={styleValue.textDecoration || "none"}
              onChange={(e) => {
                handleAttributesChange({
                  [styleName]: {
                    textDecoration: e.target.value,
                  },
                });
              }}
            >
              <option value="none">无</option>
              <option value="underline">下划线</option>
              <option value="overline">上划线</option>
              <option value="line-through">删除线</option>
            </select>
          </Item>
        </>
      )}

      {/* 边框 */}
      {styleValue.borderStyle !== undefined && (
        <>
          <Item label="边框样式: ">
            <Select
              className={styles.itemRight}
              value={styleValue.borderStyle}
              onChange={(value) => {
                handleAttributesChange({
                  [styleName]: {
                    borderStyle: value,
                  },
                });
              }}
            >
              <option value="none">none</option>
              <option value="dashed">dashed</option>
              <option value="dotted">dotted</option>
              <option value="double">double</option>
              <option value="groove">groove</option>
              <option value="hidden">hidden</option>
              <option value="solid">solid</option>
            </Select>
          </Item>

          <Item label="边框宽度: ">
            <InputNumber
              className={styles.itemRight}
              value={styleValue.borderWidth}
              onChange={(value) =>
                handleAttributesChange({
                  [styleName]: {
                    borderWidth: parseInt(value) - 0,
                  },
                })
              }
            />
          </Item>

          <Item label="边框颜色: ">
            <ColorPicker
              value={styleValue.borderColor || "#ffffff00"}
              onChange={(color: Color) => {
                handleAttributesChange({
                  [styleName]: {
                    borderColor: color.toRgbString(),
                  },
                });
              }}
              style={{
                height: 32,
              }}
              showText
            />
          </Item>
          <Item label="圆角: ">
            <Input
              className={styles.itemRight}
              value={styleValue.borderRadius}
              onChange={(e) =>
                handleAttributesChange({
                  [styleName]: {
                    borderRadius: e.target.value,
                  },
                })
              }
            />
          </Item>
        </>
      )}
      {styleValue.backgroundColor !== undefined && (
        <Item label="背景颜色: ">
          <InputColor
            className={styles.itemRight}
            color={styleValue.backgroundColor}
            onChangeComplete={(e: any) => {
              handleAttributesChange({
                [styleName]: {
                  backgroundColor: `rgba(${Object.values(e.rgb).join(",")})`,
                },
              });
            }}
          />
        </Item>
      )}

      {/* 旋转 */}
      {styleValue.transform !== undefined && (
        <Item label="旋转: ">
          <InputNumber
            className={styles.itemRight}
            type="number"
            value={styleValue.transform}
            onChange={(value) =>
              handleAttributesChange({
                [styleName]: {
                  transform: value,
                },
              })
            }
          />
        </Item>
      )}

      <Item label="动画名称">
        <Select
          className={styles.itemRight}
          value={styleValue.animationName || ""}
          onChange={(value) => {
            handleAnimationStyleChange({
              name: "animationName",
              value: value,
            });
          }}
        >
          <option value="">无动画</option>
          <option value="toggle">闪烁</option>
          <option value="jello">果冻</option>
          <option value="shake">抖动</option>
          <option value="wobble">左右摇摆</option>
        </Select>
      </Item>

      {/* 动画 */}
      {styleValue.animationName !== undefined && (
        <>
          {/* 用户定义了动画名称，以下动画属性才是有效的 */}
          {styleValue.animationName && (
            <>
              <Item label="动画持续时长(s)">
                <InputNumber
                  type="number"
                  className={styles.itemRight}
                  value={parseInt(styleValue.animationDuration)}
                  onChange={(value) => {
                    handleAttributesChange({
                      [styleName]: {
                        animationDuration: value + "s",
                      },
                    });
                  }}
                />
              </Item>

              <Item label="动画循环次数" tips="999表示无数次">
                <InputNumber
                  className={styles.itemRight}
                  value={
                    styleValue.animationIterationCount === "infinite"
                      ? 999
                      : styleValue.animationIterationCount
                  }
                  onChange={(value) =>
                    handleAttributesChange({
                      [styleName]: {
                        animationIterationCount:
                          parseInt(value) === 999 ? "infinite" : value,
                      },
                    })
                  }
                />
              </Item>
              <Item label="动画延迟时间(s)">
                <InputNumber
                  className={styles.itemRight}
                  value={parseInt(styleValue.animationDelay)}
                  onChange={(value) => {
                    handleAttributesChange({
                      [styleName]: {
                        animationDelay: value + "s",
                      },
                    });
                  }}
                />
              </Item>
              <Item label="动画控制">
                <Space>
                  <Button
                    type="primary"
                    onClick={(e) => {
                      const value = styleValue.animationName;

                      handleAttributesChange({
                        [styleName]: {
                          animationName: "",
                        },
                      });

                      setTimeout(() => {
                        handleAttributesChange({
                          [styleName]: {
                            animationName: value,
                            animationPlayState: "running",
                          },
                        });
                      }, 0);
                    }}
                  >
                    重新演示动画
                  </Button>

                  <Button
                    type="default"
                    onClick={(e) => {
                      handleAttributesChange({
                        [styleName]: {
                          animationPlayState: "paused",
                        },
                      });
                    }}
                  >
                    暂停演示动画
                  </Button>
                </Space>
              </Item>
            </>
          )}
        </>
      )}

      {/* 跳转页面 | 服务端请求 */}
      {typeof onClick === "object" ? (
        <>
          <Item label="post地址: ">
            <Input
              className={styles.itemRight}
              value={onClick.url}
              onChange={(e) =>
                handleAttributesChange({
                  onClick: { ...onClick, url: e.target.value },
                })
              }
            />
          </Item>

          <Item label="成功事件">
            <Select
              options={afterSuccessOption}
              onChange={(value) =>
                handleAttributesChange({
                  onClick: { ...onClick, afterSuccess: value },
                })
              }
              value={onClick.afterSuccess}
              className={styles.itemRight}
              // placeholder="选择对齐页面方式--"
            />
          </Item>

          {onClick.afterSuccess === "pop" && (
            <Item label="弹窗提示: ">
              <Input
                className={styles.itemRight}
                value={onClick.popMsg}
                onChange={(e) => {
                  handleAttributesChange({
                    onClick: { ...onClick, popMsg: e.target.value },
                  });
                }}
              />
            </Item>
          )}

          {onClick.afterSuccess === "url" && (
            <Item label="跳转链接: ">
              <Input
                className={styles.itemRight}
                value={onClick.link}
                onChange={(e) => {
                  handleAttributesChange({
                    onClick: { ...onClick, link: e.target.value },
                  });
                }}
              />
            </Item>
          )}
        </>
      ) : (
        <Item label="点击跳转: ">
          <Input
            className={styles.itemRight}
            value={onClick}
            onChange={(e) =>
              handleAttributesChange({ onClick: e.target.value })
            }
          />
        </Item>
      )}
    </>
  );
}
