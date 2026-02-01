import styles from "./Item1.module.css";
function Item1({ text, date, delElement }) {
  return (
    <div classNameName="container text-center">
      <div classNameName={`row ${styles.kgRow}`}>
        <div classNameName="col-6">{text}</div>
        <div classNameName="col-4">{date}</div>
        <div classNameName="col-2">
          <button
            type="button"
            classNameName="btn btn-danger button"
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
