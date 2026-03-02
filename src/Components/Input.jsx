import styles from "./Input.module.css";
import { useState } from "react";
function Input({ addElement, placeholder, addLabel, validationMessage }) {
  const [work, setWork] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="container text-center todo-form">
      <div className={`row ${styles.kgRow}`}>
        <div className="col-6">
          <input
            className={styles.text}
            type="text"
            placeholder={placeholder}
            value={work}
            onChange={(e) => setWork(e.target.value)}
          />
        </div>
        <div className="col-4">
          <input
            className={styles.date}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button
            type="button"
            className={`btn btn-success button ${styles.addBtn}`}
            onClick={() => {
              if (!work.trim() || !date) {
                alert(validationMessage);
                return;
              }
              addElement(work, date);
              setWork("");
              setDate("");
            }}
          >
            {addLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Input;
