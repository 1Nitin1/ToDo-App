import styles from "./Item1.module.css";
function Item1({ text, date, delElement }) {
  return (
    <div className="container text-center">
      <div className={`row ${styles.kgRow}`}>
        <div className="col-6">{text}</div>
        <div className="col-4">{date}</div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger button"
            onClick={() => delElement(text, date)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default Item1;
