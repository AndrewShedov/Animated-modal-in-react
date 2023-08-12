import styles from "./modal.module.css";
import { useState, useEffect, useRef } from "react";
import CloseIcon from "../svg/CloseIcon/";
import Horse from "../svg/Horse/Horse";
export default function Modal({buttonShowModal, setButtonShowModal}) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (buttonShowModal) {
      setShowModal(true);
    }
  }, [buttonShowModal]);
  const [fadeOut, setFadeOut] = useState(false);
  const modalRef = useRef();
  // Click outside the modal window
  useEffect(() => {
    if (modalRef.current) {
      const handler = (e) => {
        if (!modalRef.current.contains(e.target)) {
          setFadeOut(true);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  });
  return (
    <>
      {showModal && (
        <div
          className={
            fadeOut
              ? `${styles.modal_wrap} ${styles.modal_wrap__fade_out}`
              : `${styles.modal_wrap}`
          }
          onAnimationEnd={(e) => {
            if (e.animationName === styles.fadeOut) {
              setFadeOut(false);
            }
          }}
        >
          <div
            ref={modalRef}
            className={
              fadeOut  
                ? `${styles.modal} ${styles.modal__fade_out}`
                : `${styles.modal}`
            }
            onAnimationEnd={(e) => {
              if (e.animationName === styles.fadeOut) {
                setShowModal(false);
                setFadeOut(false);
                setButtonShowModal(false);
              }
            }}
          >
            <Horse />
            <div  
              onClick={() => {
                setFadeOut(true);
                setButtonShowModal(false);
              }}
              className={styles.close_button_wrap}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
