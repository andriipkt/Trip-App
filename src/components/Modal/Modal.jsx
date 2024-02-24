import { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "../Icons/Icons";
import topCities from "../../data/topCities.json";

const Modal = ({ toggle, onSave }) => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const handleKeyEsc = (event) => {
      if (event.code === "Escape") {
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyEsc);
      document.body.style.overflow = "auto";
    };
  }, [toggle]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      toggle();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave(city, startDate, endDate);
    setCity("");
    setStartDate("");
    setEndDate("");
    toggle();
  };

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <p>Create trip</p>

          <button type="button" className={styles.closeBtn} onClick={toggle}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.modalContent}>
          <form id="addTripForm" onSubmit={handleSubmit}>
            <label>
              <span>City</span>
              <input
                list="cities"
                required
                placeholder="Please select a city"
                onChange={(event) => setCity(event.target.value)}
                value={city}
              />
              <datalist id="cities">
                {topCities.map((city) => (
                  <option key={city.name} value={city.name} />
                ))}
              </datalist>
            </label>

            <label>
              <span>Start date</span>
              <input
                type="date"
                required
                min={todayString}
                max={maxDateString}
                onChange={(event) => setStartDate(event.target.value)}
                value={startDate}
              />
            </label>

            <label>
              <span>End date</span>
              <input
                type="date"
                required
                min={startDate}
                max={maxDateString}
                onChange={(event) => setEndDate(event.target.value)}
                value={endDate}
              />
            </label>
          </form>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={toggle}>
            Cancel
          </button>
          <button type="submit" form="addTripForm" className={styles.saveBtn}>
            Save
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#popup-root")
  );
};

export default Modal;
