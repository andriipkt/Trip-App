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
          <h2>Create trip</h2>

          <button type="button" className={styles.closeBtn} onClick={toggle}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.modalContent}>
          <form id="addTripForm" onSubmit={handleSubmit}>
            <label>
              <span>City</span>
              <select
                name="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="" disabled>
                  Please select a city
                </option>

                {topCities.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Start date</span>
              <input
                type="date"
                name="start-date"
                required
                min={todayString}
                max={maxDateString}
                onChange={(event) => setStartDate(event.target.value)}
                value={startDate && startDate}
              />
            </label>

            <label>
              <span>End date</span>
              <input
                type="date"
                name="end-date"
                required
                min={startDate}
                max={maxDateString}
                onChange={(event) => setEndDate(event.target.value)}
                value={endDate && endDate}
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
