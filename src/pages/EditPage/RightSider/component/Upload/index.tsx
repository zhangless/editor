import { Button, message, Modal, Image, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { myAxios } from "src/request/end";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "./index.module.less";
import { errFallBack } from "./errorPic";

interface Iprops {
  value: string;
  onChange: (value: string) => void;
  canClear?: boolean;
}

export default ({ value, onChange, canClear }: Iprops) => {
  const fileref = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [pictureUrl, setPictureUrl] = useState(value);
  const [cachePic, setCache] = useState("");
  const [formData, setformData] = useState<FormData>();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [findAllLoading, setFindAllLoading] = useState(false);
  const [totolPic, setTotalPic] = useState([]);

  const getCropData = async () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper?.getCroppedCanvas()?.toBlob(async (blob: Blob | null) => {
      if (blob) {
        const formData = new FormData();
        formData.append("file", blob, "test.jpeg");
        setformData(formData);
      }
    });
  };

  const submit = async () => {
    var formData = new FormData();
    if (!fileref.current?.files) return;

    for (const file of fileref.current.files) {
      formData.append("file", file);
    }
    const data: {
      address: string;
      realPath: string;
    } = await myAxios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setPictureUrl(data.realPath);
  };

  const findAll = async () => {
    setFindAllLoading(true);
    const data = await myAxios.get("api/upload");
    setFindAllLoading(false);
    if (!data.data.length) {
      return message.warning("未找到已经上传的图片");
    }

    setTotalPic(data.data);
  };

  const delpic = (address: string) => {
    myAxios
      .delete(`api/upload/${address}`)
      .then(() => {
        findAll();
      })
      .catch(console.log);
  };

  const selectPic = () => {
    if (fileref.current) {
      fileref.current?.click();
    }
  };

  const editImg = () => {
    // Modal
    setModalOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    const data: {
      address: string;
      realPath: string;
    } = await myAxios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setPictureUrl(data.realPath);
    setModalOpen(false);
    setConfirmLoading(false);
  };

  useEffect(() => {
    setPictureUrl(value);
  }, [value]);

  useEffect(() => {
    if (!pictureUrl) return;
    onChange(pictureUrl);
  }, [pictureUrl]);

  return (
    <div>
      <input
        type="file"
        ref={fileref}
        className="upload_inp"
        accept=".png,.jpg,.jpeg"
        onChange={submit}
        hidden
      />
      <img src={pictureUrl} className={styles.uploadPic} onClick={editImg} />
      <Space.Compact
        style={{
          marginTop: 5,
        }}
      >
        <Button type="primary" onClick={selectPic}>
          选择图片
        </Button>
        {canClear && (
          <Button type="default" onClick={() => onChange("")}>
            清除图片
          </Button>
        )}
        <Button type="default" loading={findAllLoading} onClick={findAll}>
          查看已有图片
        </Button>
      </Space.Compact>

      <Modal
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Cropper
          src={pictureUrl}
          style={{ height: 400, width: 400 }}
          initialAspectRatio={1}
          guides={false}
          ref={cropperRef}
          onInitialized={getCropData}
          crop={getCropData}
        />
      </Modal>
      <Modal
        centered
        open={!!totolPic.length}
        onCancel={() => setTotalPic([])}
        destroyOnClose
        onOk={() => {
          setTotalPic([]);
          setPictureUrl(cachePic);
        }}
        width={800}
      >
        <div className={styles.imageGrid}>
          {totolPic.map((item: { realPath: string; address: string }) => {
            return (
              <div key={item.realPath}>
                <Image width={200} src={item.realPath} fallback={errFallBack} />
                <div className={styles.picBtnBox}>
                  <Button
                    type="primary"
                    onClick={() => setCache(item.realPath)}
                  >
                    选择
                  </Button>
                  <Button
                    danger
                    onClick={() => {
                      delpic(item.address);
                    }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};
