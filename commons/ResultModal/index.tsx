import { Modal } from "@mui/material";
import { useCallback, useState } from "react";
import Image from "next/image";
import Wrapbutton from "@/commons/Button";

export type TResultModalResult = {
  onClick?: () => void;
  buttonTitle?: string;
  titleModal?: string;
  classTextContent?: string;
};

const WrapResultModal = () => {
  const [modalType, setModalType] = useState<string>("success");
  const [content, setContent] = useState<string | JSX.Element>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const successMessage = useCallback((content?: string | JSX.Element) => {
    setIsOpen(true);
    setModalType("success");
    setContent(content || "Successfully");
  }, []);

  const errorMessage = useCallback((content?: string | JSX.Element) => {
    setIsOpen(true);
    setModalType("error");
    setContent(content || "Something went wrong. Please try again!");
  }, []);

  const warningMessage = useCallback((content?: string | JSX.Element) => {
    setIsOpen(true);
    setModalType("warning");
    setContent(content || "Warning!");
  }, []);

  const ResultModal = (props: TResultModalResult) => {
    const { onClick, buttonTitle, titleModal, classTextContent } = props;

    const handleButton = useCallback(() => {
      if (onClick) {
        onClick();
      }
      setIsOpen(false);
    }, [onClick]);

    const getIcon = useCallback(() => {
      switch (modalType) {
        case "success":
          return "/icons/successful.svg";
        case "error":
          return "/icons/failed.svg";
        case "warning":
          return "/icons/warning.svg";
        default:
          return "/icons/successful.svg";
      }
    }, [modalType]);
    return (
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div
          style={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            background: "white",
            padding: "24px",
            borderRadius: "12px",
          }}
        >
          <div className="relative">
            <div className="absolute top-0 right-0 cursor-pointer">
              <Image
                src={"/icons/close.svg"}
                alt="close"
                height={20}
                width={20}
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
          <div className="flex justify-center items-center flex-col gap-y-5">
            <Image src={getIcon()} height={50} width={50} alt="result" />

            <span className="text-black font-SpaceGrotesk font-[700] text-lg">
              {titleModal
                ? titleModal
                : modalType === "success"
                  ? "Successful"
                  : "Failed!"}
            </span>

            <div className={classTextContent || `text-center`}>{content}</div>

            <Wrapbutton
              title={buttonTitle || "Go back"}
              onClick={handleButton}
              styles="w-full"
            />
          </div>
        </div>
      </Modal>
    );
  };

  return {
    successMessage,
    errorMessage,
    warningMessage,
    ResultModal,
    modalType,
  };
};

export default WrapResultModal;
