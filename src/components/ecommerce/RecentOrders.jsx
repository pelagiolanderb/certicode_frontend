import React, { useEffect, useState } from "react";
import useApiService from "../../api/useApiService"; 
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

export default function RecentSeminars() {
  const { get, loading, error } = useApiService();
  const [seminars, setSeminars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getRecentSeminars = async () => {
      try {
        const data = await get("/seminars"); 
        const sortedSeminars = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSeminars(sortedSeminars);
      } catch (err) {
        console.error("Failed to fetch seminars:", err);
      }
    };

    getRecentSeminars();
  }, []);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(seminars.length / itemsPerPage));
  const paginatedSeminars = seminars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Seminars</h3>
      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <Table>
              <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                <TableRow>
                  <TableCell isHeader className="py-3 text-start text-gray-500 font-medium">Seminar Name</TableCell>
                  <TableCell isHeader className="py-3 text-start text-gray-500 font-medium">Date</TableCell>
                  <TableCell isHeader className="py-3 text-start text-gray-500 font-medium">Participants</TableCell>
                  <TableCell isHeader className="py-3 text-start text-gray-500 font-medium">Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedSeminars.map((seminar) => (
                  <TableRow key={seminar.id}>
                    <TableCell className="py-3 flex items-center gap-3">
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                        <img src={`${import.meta.env.VITE_APP_BACKEND_URL}/storage/${seminar['seminar_image']}`} className="h-[50px] w-[50px]" alt={seminar.name_of_seminar} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white/90">{seminar.name_of_seminar}</p>
                        <span className="text-gray-500 dark:text-gray-400">{seminar['speaker_name']}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 dark:text-gray-400">{seminar.date}</TableCell>
                    <TableCell className="py-3 text-gray-500 dark:text-gray-400">001</TableCell>
                    <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                      <Badge size="sm" color="warning">On going</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>


            
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
