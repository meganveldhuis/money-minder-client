import DatePicker from "react-datepicker";
import errorIcon from "../../assets/icons/error.svg";

function FormInput({
  modifier = "",
  label,
  id,
  type,
  options = {},
  inputFormResponse,
  errors,
  setFormResponse,
  handleInputChange,
}) {
  const capitalizedFirstLetter = label[0].toUpperCase() + label.slice(1);
  return (
    <div className={`form__item form__item--${modifier}`}>
      <label className="form__label" htmlFor={label}>
        {capitalizedFirstLetter}
      </label>
      {type === "date" ? (
        <DatePicker
          className="form__input"
          todayButton="TODAY"
          showIcon
          name={label}
          id={label}
          selected={inputFormResponse}
          onChange={(chosenDate) =>
            setFormResponse((prevState) => {
              return {
                ...prevState,
                [label]: chosenDate,
              };
            })
          }
        />
      ) : type === "number" ? (
        <input
          className="form__input"
          id={id}
          name={id}
          type="number"
          onChange={handleInputChange}
          value={inputFormResponse}
        ></input>
      ) : type === "select" ? (
        <select
          className="form__input"
          id={id}
          name={id}
          type="number"
          onChange={handleInputChange}
          value={inputFormResponse}
        >
          {label === "category" && (
            <option key={0} value={0}>
              --Select Category--
            </option>
          )}

          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.code ? option.code : option.category_name}
            </option>
          ))}
        </select>
      ) : type === "text" ? (
        <input
          className="form__input"
          id={id}
          name={id}
          type="text"
          onChange={handleInputChange}
          value={inputFormResponse}
        ></input>
      ) : (
        <></>
      )}

      {errors[id] && (
        <div className="error__container">
          <img className="error__icon" src={errorIcon} alt="Error" />
          <p className="error__text">{errors[id]}</p>
        </div>
      )}
    </div>
  );
}

export default FormInput;
