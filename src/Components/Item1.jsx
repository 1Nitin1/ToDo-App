import styles from "./Item1.module.css";
import { gsap } from "gsap";
import { useRef } from "react";

function Item1({ text, date, onDelete, deleteLabel }) {
  const itemRef = useRef(null);

  const handleDelete = () => {
    if (!itemRef.current) {
      onDelete();
      return;
    }

    gsap.to(itemRef.current, {
      x: 70,
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: "power2.in",
      onComplete: onDelete,
    });
  };

  const handleEnter = () => {
    if (!itemRef.current) return;
    const hoverShadow =
      getComputedStyle(document.body)
        .getPropertyValue("--shadow-hover")
        .trim() || "0 12px 24px rgba(31, 62, 108, 0.14)";
    gsap.to(itemRef.current, {
      y: -2,
      boxShadow: hoverShadow,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!itemRef.current) return;
    const softShadow =
      getComputedStyle(document.body)
        .getPropertyValue("--shadow-soft")
        .trim() || "0 6px 14px rgba(31, 62, 108, 0.08)";
    gsap.to(itemRef.current, {
      y: 0,
      boxShadow: softShadow,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={itemRef}
      className={`container text-center todo-item ${styles.itemWrap}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={`row ${styles.kgRow}`}>
        <div className={`col-6 ${styles.taskText}`}>{text}</div>
        <div className={`col-4 ${styles.taskDate}`}>{date}</div>
        <div className="col-2">
          <button
            type="button"
            className={`btn btn-danger button ${styles.deleteBtn}`}
            onClick={handleDelete}
          >
            {deleteLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Item1;
