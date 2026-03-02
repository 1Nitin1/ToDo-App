import styles from "./Heading.module.css";

function Heading({ title }) {
  return <h1 className={`${styles.title} todo-title`}>{title}</h1>;
}
export default Heading;
