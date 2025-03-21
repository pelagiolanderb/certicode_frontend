import { useEffect, useState } from "react";
import BeatLoader from "../../components/loading/loading";
import useApiService from "../../api/useApiService";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [isSendCertificate, setIsSendCertificate] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedSeminar, setSelectedSeminar] = useState("");

  const { loading, error, get, post } = useApiService();

  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(participants.length / 5);
  const currentItems = participants.slice(currentPage * 5, (currentPage + 1) * 5);

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const data = await get('/participants');
        setParticipants(data);
      } catch (err) {
        console.log("Failed to load participants.");
      }
    };

    loadParticipants();
  }, []);

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

  const sortedParticipants = [...participants].sort((a, b) => {
    const titleA = a.seminar?.name_of_seminar.toLowerCase() || "";
    const titleB = b.seminar?.name_of_seminar.toLowerCase() || "";
    return sortOrder === "asc"
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSendCertificate = async (participantId) => {
    setIsSendCertificate(true);
    setLoadingStates((prev) => ({...prev, [participantId]: true}));
    try {
      await get(`/certificate/${participantId}`);
      alert(`Certificate sent.`);
    } catch (error) {
      alert("Failed to send certificate.");
    } finally {
      setIsSendCertificate(false);
      setLoadingStates((prev) => ({...prev, [participantId]: false}));
    }
  };

  const handleSendAll = async () => {
    const seminarParticipants = participants.filter(
      (p) => p.seminar?.name_of_seminar === selectedSeminar
    );

    if (seminarParticipants.length === 0) {
      alert("No participants found for this seminar.");
      return;
    }

    try {
      for (const participant of seminarParticipants) {
        await get(`/certificate/${participant.id}`);
      }
      alert(`Certificates sent to all participants of "${selectedSeminar}"`);
    } catch (error) {
      alert("Failed to send certificates.");
    }
  };

  if (loading && !isSendCertificate) return <BeatLoader />
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="relative shadow-md sm:rounded-lg m-4 p-4">
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
        <div className="flex items-center justify-between w-full m-4">
          <select
            className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 dark:text-gray-100 dark:bg-gray-900"
            value={selectedSeminar}
            onChange={(e) => setSelectedSeminar(e.target.value)}
          >
              <option value="" >-- ALL SEMINAR --</option>
            {[
              ...new Set(participants.map((p) => p.seminar?.name_of_seminar)),
            ].map((seminar) => (
              <option key={seminar} value={seminar}>
                {seminar}
              </option>
            ))}
          </select>

          <button
            onClick={handleSendAll}
            className="text-white bg-blue-900 border border-blue-700 focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-blue-700 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            Send Certificates to All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 uppercase">
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 uppercase cursor-pointer hover:bg-gray-200 transition"
                onClick={toggleSortOrder}
              >
                Seminar Attended {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                Email
              </th>
              <th scope="col" className="px-6 py-3 uppercase text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {sortedParticipants
              .filter((participant) =>
                selectedSeminar ? participant.seminar?.name_of_seminar === selectedSeminar : true
              )
              .map((participant, index) => (
              <tr
                key={participant.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">
                  {participant.user?.name || participant.guest?.name}
                </td>
                <td className="px-6 py-4">
                  {participant.seminar?.name_of_seminar}
                </td>
                <td className="px-6 py-4">
                  {participant.user ? participant.user.email : participant.guest.email}
                </td>
                <td className="py-4 flex justify-center">
                  <button
                    onClick={() => handleSendCertificate(participant.id)}
                    className="text-white bg-blue-900 border border-blue-700 focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-blue-700 font-medium rounded-lg text-sm px-3 py-1.5"
                  >
                    {
                      loadingStates[participant.id] ? "📩 Sending..." : "📩 Send"
                    }
                  </button>
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
              {participants.length}
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
    </div>
  );
};

export default Participants;
