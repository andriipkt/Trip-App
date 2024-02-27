import styles from "./TripsFilter.module.css";
import { SearchIcon } from "../Icons/Icons";

const TripsFilter = ({ onFilter, value }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        name="trips-filter"
        className={styles.filterInput}
        type="text"
        placeholder="Search your trip"
        onChange={onFilter}
        value={value}
      />
      <span>
        <SearchIcon />
      </span>
    </div>
  );
};

export default TripsFilter;
