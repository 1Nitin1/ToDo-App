import styles from "./Input.module.css";
import { useState } from "react";
function Input({ addElement }) {
  const [work, setWork] = useState("");
  const [date, setDate] = useState("");

  return (
    <div classNameName="container text-center">
      <div classNameName={`row ${styles.kgRow}`}>
        <div classNameName="col-6">
          <input
            classNameName={styles.text}
            type="text"
            placeholder="Enter Work"
            value={work}
            onChange={(e) => setWork(e.target.value)}
          />
        </div>
        <div classNameName="col-4">
          <input
            classNameName={styles.date}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div classNameName="col-2">
          <button
            type="button"
            classNameName="btn btn-success button"
            onClick={() => {
              if (!work.trim() || !date) {
                alert("Enter all info.");
                return;
              }
              addElement(work, date);
              setWork("");
              setDate("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
export default Input;
