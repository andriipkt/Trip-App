import styles from "./CountdownTimer.module.css";

const CountdownTimer = ({ remainingTime }) => {
  return (
    <div className={styles.timer}>
      <div className={styles.timerEl}>
        <span>{remainingTime.days}</span>
        <p>days</p>
      </div>
      <div className={styles.timerEl}>
        <span>{remainingTime.hours}</span>
        <p>hours</p>
      </div>
      <div className={styles.timerEl}>
        <span>{remainingTime.minutes}</span>
        <p>minutes</p>
      </div>
      <div className={styles.timerEl}>
        <span>{remainingTime.seconds}</span>
        <p>seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
