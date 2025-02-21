import "./EntryDetailPage.scss";
import EditEntryModal from "../../components/EditEntryModal/EditEntryModal";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import APIService from "../../services/APIService";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import leftArrowIcon from "../../assets/icons/left-arrow.svg";

function EntryDetailPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reloadData, setReloadData] = useState(true);
  const [data, setData] = useState([]);
  const [isIncome, setIsIncome] = useState(false);
  const [photoDetails, setPhotoDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsIncome(pathname.includes("/income"));
  }, []);

  useEffect(() => {
    async function getPhoto() {
      const searchTerm = data.name;
      const photoResponse = await APIService.getPhoto(searchTerm);
      setPhotoDetails({
        alt_description: photoResponse.alt_description,
        url: photoResponse.urls.regular,
        credit: photoResponse.user.name,
      });
    }
    if (data) {
      getPhoto();
    }
  }, [data]);

  useEffect(() => {
    async function getRecord() {
      const responseData = pathname.includes("/income")
        ? await APIService.getSingleIncome(id)
        : await APIService.getSingleExpense(id);
      console.log(responseData);
      setData(responseData);
    }
    getRecord();
  }, [reloadData]);

  return (
    <div className="page-content details-page">
      <div className="details-page__header">
        <img
          className="details-page__header-icon icon"
          src={leftArrowIcon}
          onClick={() => navigate(-1)}
        />
        <h1 className="details-page__header-text">
          {isIncome ? "Income" : "Expense"} Details
        </h1>
      </div>

      <div className="details">
        {photoDetails.url && (
          <div className="details__image-div">
            <img
              className="details__img"
              src={photoDetails.url}
              alt={`${photoDetails.alt_description}. Photo by ${photoDetails.credit}`}
            />
          </div>
        )}

        <div className="details__content">
          <div className="details__buttons">
            <button
              className="details__btn details__btn--edit"
              onClick={() => setIsEditModalOpen(true)}
            >
              <img src={editIcon} />
            </button>
            <button
              className="details__btn details__btn--delete"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <img src={deleteIcon} />
            </button>
          </div>
          <div className="details__item">
            <h4 className="details__title">Name:</h4>
            <p className="details__text">{data.name}</p>
          </div>
          <div className="details__item">
            <h4 className="details__title">Date:</h4>
            <p className="details__text">
              {String(new Date(data.date).toLocaleDateString())}
            </p>
          </div>
          <div className="details__row">
            <div className="details__item">
              <h4 className="details__title">
                {isIncome ? "Amount" : "Spent"}:
              </h4>
              <p className="details__text">{data.amount}</p>
              <p className="details__text">
                {data.currency_code}
                {data.code}
              </p>
            </div>
          </div>
          <div className="details__item">
            <h4 className="details__title">Category:</h4>
            <p className="details__text">{data.category_name}</p>
          </div>
          <div className="details__item">
            <h4 className="details__title">Created at:</h4>
            <p className="details__text">{String(new Date(data.created_at))}</p>
          </div>
          <div className="details__item">
            <h4 className="details__title">Updated at:</h4>
            <p className="details__text">{String(new Date(data.updated_at))}</p>
          </div>
        </div>
      </div>
      {photoDetails.credit && (
        <p className="details__image-credit">Photo by {photoDetails.credit}</p>
      )}

      {isEditModalOpen && (
        <EditEntryModal
          setReloadData={setReloadData}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isIncome={isIncome}
          details={data}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default EntryDetailPage;
