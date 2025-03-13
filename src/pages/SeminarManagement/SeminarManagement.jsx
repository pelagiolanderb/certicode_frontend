import React, { useEffect, useState } from "react";
import SeminarModal from "./SeminarModal.jsx";
import { Link } from "react-router";
import BeatSpinner from "../../components/loading/loading";
import useApiService from "../../api/useApiService.js";

const SeminarManagement = () => {
  const [seminars, setSeminars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, error, get, post } = useApiService();
  
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(seminars.length / 5);
  const currentItems = seminars.slice(currentPage * 5, (currentPage + 1) * 5);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    handleFetchSeminars();
  }, []);

  const handleFetchSeminars = async () => {
    try {
      const data = await get("/seminars");
      setSeminars(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleArchive = async (id) => {
    if (window.confirm("Are you sure you want to archive this seminar?")) {
      try {
        await post(`/seminars_archive/${id}`);
        setSeminars(seminars.filter((s) => s.id !== id));
        alert("Seminar archived successfully.");
      } catch (error) {
        alert("Failed to archive seminar.");
      }
    }
  };

  if (error) return <p>{error}</p>;

  return loading ? (
    <BeatSpinner />
  ) : (
    <div className="relative shadow-md sm:rounded-lg m-4">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
        <div className="flex items-center justify-between w-full m-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white bg-blue-900 border border-blue-700 focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-blue-700 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            + Create Seminar
          </button>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for seminar"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto p-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 uppercase">
                Name of Seminar
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                topics
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                date
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                location
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                speaker name
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                organization name
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((seminar) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={seminar.id}
              >
                <td className="px-6 py-4">{seminar.name_of_seminar}</td>
                <td className="px-6 py-4">{seminar.topics}</td>
                <td className="px-6 py-4">{seminar.date}</td>
                <td className="px-6 py-4">{seminar.location}</td>
                <td className="px-6 py-4">{seminar.speaker_name}</td>
                <td className="px-6 py-4">{seminar.organization_name}</td>
                <td className="py-4 flex flex-col">
                  <Link
                    to={`/seminar-management/${seminar.id}`}
                    className="font-medium text-green-600 hover:underline"
                  >
                    View Seminar
                  </Link>
                  <Link
                    to="#"
                    onClick={() => handleArchive(seminar.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Archive
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentItems.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {seminars.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className={`${
                  currentPage === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 hover:text-gray-700"
                } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg`}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: pageCount }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => handlePageClick(i)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    i === currentPage
                      ? "bg-blue-200 text-gray-700 font-medium"
                      : "bg-white text-gray-500"
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNext}
                disabled={currentPage === pageCount - 1}
                className={`${
                  currentPage === pageCount - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 hover:text-gray-700"
                } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>  
      </div>

      {isModalOpen && (
        <SeminarModal
          setIsModalOpen={setIsModalOpen}
          handleFetchSeminars={handleFetchSeminars}
        />
      )}
    </div>
  );
};

export default SeminarManagement;
