import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import img1 from "../../assets/images/house_3.jpg";
import { fetchSeminars } from "../../api/seminarAPI";

export default function RecentSeminars() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecentSeminars = async () => {
      setLoading(true);
      try {
        const data = await fetchSeminars();
        const sortedSeminars = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSeminars(sortedSeminars.slice(0, 5));
      } catch (error) {
        setError("Failed to fetch seminars.");
      } finally {
        setLoading(false);
      }
    };

    getRecentSeminars();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Seminars</h3>
        </div>

        <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              <svg
                className="stroke-current fill-white dark:fill-gray-800"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.29004 5.90393H17.7067"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.7075 14.0961H2.29085"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                  fill=""
                  stroke=""
                  strokeWidth="1.5"
                />
                <path
                  d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                  fill=""
                  stroke=""
                  strokeWidth="1.5"
                />
              </svg>
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              See all
            </button>
          
        </div>

      </div>
      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
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
              {seminars.map((seminar) => (
                <TableRow key={seminar.id}>
                  <TableCell className="py-3 flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img src={img1} className="h-[50px] w-[50px]" alt={seminar.name_of_seminar} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white/90">{seminar.name_of_seminar}</p>
                      <span className="text-gray-500 dark:text-gray-400">{seminar.speaker_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">{seminar.date}</TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">001</TableCell>
                  <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                    <Badge size="sm" color="warning">On going</Badge>
                    {/* <Badge
                      size="sm"
                      color={
                        seminar.status === "Done"
                          ? "success"
                          : seminar.status === "On going"
                          ? "warning"
                          : "error"
                      }
                    >
                      {seminar.status}
                    </Badge> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}