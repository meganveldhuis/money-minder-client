import { useEffect, useState } from "react";
import "./ProgressBar.scss";

function ProgressBar({ actualAmt, budgetAmt, filters }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (actualAmt / budgetAmt > 1) {
      setProgress(100);
    } else {
      setProgress(Math.floor((actualAmt / budgetAmt) * 100));
    }
  }, [actualAmt, filters]);

  return (
    <div className="progress-bar">
      <div
        className={`progress-bar__fill ${
          progress < 40
            ? "progress-bar__fill--green"
            : progress < 90
            ? "progress-bar__fill--orange"
            : "progress-bar__fill--red"
        }`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
