import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { Modal } from "../../components/ui/modal";
import FileInput from "../../components/form/input/FileInput";
import Form from "../../components/form/Form";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import MultiSelect from "../../components/form/MultiSelect";
import RadioButtons from "../../components/form/form-elements/RadioButtons";
import ComponentCard from "../../components/common/ComponentCard";
import RadioSm from "../../components/form/input/RadioSm";
import useApiService from "../../api/useApiService";
import api from "../../api/api";
import ResponsiveImage from "../../components/ui/images/ResponsiveImage";
import Button from "../../components/ui/button/Button";

const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [loadingState, setLoadingState] = useState({});
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [selectedValue, setSelectedValue] = useState("gcash");
  const { post } = useApiService();

  const [otherPaymentMethod, setOtherPaymentMethod] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const handleRadioChange = (value) => {
    setSelectedValue(value.split(" ").join("").toLowerCase());
  };

  const handleFileChange = (e) => {
    setQrCode(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("payment_method", selectedValue);
    if (selectedValue === "other") {
      formData.append("other_payment_method", otherPaymentMethod);
    }
    formData.append("account_name", accountName);
    formData.append("account_number", accountNumber);
    if (qrCode) {
      formData.append("qr_code", qrCode);
    }

    try {
      const response = await post("/add-payment-methods", formData);
      console.log("Success:", response);
      alert("Payment method added successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting payment method:", error);
      alert("Error adding payment method. Please try again.");
    }
  };

  const handleView = (transaction) => {
    try {
      setSelectedTransaction(transaction);
      setIsView(true);
      setLoadingState((prev) => ({
        ...prev,
        [transaction.transaction_id]: true,
      }));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingState((prev) => ({
        ...prev,
        [transaction.transaction_id]: false,
      }));
    }
  };

  //   const [selectedValues, setSelectedValues] = useState([]);

  //   const options = [
  //     { value: "GCash", text: "GCash" },
  //     { value: "BPI", text: "BPI" },
  //     { value: "Pay Maya", text: "Pay Maya" },
  //   ];

  const transactions = [
    {
      id: 1,
      transaction_date: "March 20, 2025",
      role: "User (Non-Admin)",
      name: "Lander Pelagio",
      transaction_id: "A1001F2DOP600",
      status: "Pending",
      payment_method: "GCash",
      account_name: "Lander Pelagio",
      account_number: "09636775414",
    },
    {
      id: 2,
      transaction_date: "March 21, 2025",
      role: "Guess",
      name: "Jayson Delos Santos",
      transaction_id: "A1001F2DOP601",
      status: "Pending",
      payment_method: "BPI",
      account_name: "Jayson Delos Santos",
      account_number: "0910562003228531",
    },
    {
      id: 3,
      transaction_date: "March 22, 2025",
      role: "Guess",
      name: "Xyrus Abucal",
      transaction_id: "A1001F2DOP602",
      status: "Pending",
      payment_method: "GCash",
      account_name: "Xyrus Abucal",
      account_number: "09636775414",
    },
    {
      id: 4,
      transaction_date: "March 23, 2025",
      role: "User (Non-Admin)",
      name: "Tom Oliver Chua",
      transaction_id: "A1001F2DOP603",
      status: "Pay Later",
      payment_method: "Pay Maya",
      account_name: "Tom Chua",
      account_number: "005523353911",
    },
    {
      id: 5,
      transaction_date: "March 24, 2025",
      role: "User (Non-Admin)",
      name: "Mark Angelo Hornido",
      transaction_id: "A1001F2DOP604",
      status: "Paid",
      payment_method: "GCash",
      account_name: "Mark Hornido",
      account_number: "09636775414",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Payment Method
        </button>
        {/* <label htmlFor="table-search" className="sr-only">
          Search
        </label> */}
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

      <Table>
        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
          <TableRow>
            <TableCell
              isHeader
              className="py-3 text-start text-gray-500 font-medium"
            >
              Transaction Date
            </TableCell>
            <TableCell
              isHeader
              className="py-3 text-start text-gray-500 font-medium"
            >
              Role
            </TableCell>
            <TableCell
              isHeader
              className="py-3 text-start text-gray-500 font-medium"
            >
              Name
            </TableCell>
            <TableCell
              isHeader
              className="py-3 text-start text-gray-500 font-medium"
            >
              Transaction ID
            </TableCell>
            <TableCell
              isHeader
              className="py-3 text-start text-gray-500 font-medium"
            >
              Status
            </TableCell>
            <TableCell
              isHeader
              className="py-3 text-start text-gray-500 font-medium"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                {transaction.transaction_date}
              </TableCell>
              <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                {transaction.role}
              </TableCell>
              <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                {transaction.name}
              </TableCell>
              <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                {transaction.transaction_id}
              </TableCell>
              <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                <Badge
                  size="sm"
                  color={
                    transaction.status === "Pending"
                      ? "warning"
                      : transaction.status === "Pay Later"
                      ? "primary"
                      : "success"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleView(transaction)}
                >
                  {loadingState[transaction.transaction_id]
                    ? "Viewing..."
                    : "View"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="pt-15 pb-10 px-10 max-w-[50%]"
      >
        <Form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <ComponentCard title={"Payment Method"}>
            <div className="flex gap-4">
              <RadioSm
                id="gcash"
                name="payment_method"
                value="GCash"
                label="GCash"
                onChange={handleRadioChange}
                checked={selectedValue === "gcash"}
              />
              <RadioSm
                id="bpi"
                name="payment_method"
                value="BPI"
                label="BPI"
                onChange={handleRadioChange}
                checked={selectedValue === "bpi"}
              />
              <RadioSm
                id="paymaya"
                name="payment_method"
                value="Pay Maya"
                label="Pay Maya"
                onChange={handleRadioChange}
                checked={selectedValue === "paymaya"}
              />
              <RadioSm
                id="other"
                name="payment_method"
                value="Other"
                label="Other"
                onChange={handleRadioChange}
                checked={selectedValue === "other"}
              />
            </div>
          </ComponentCard>

          {selectedValue === "other" && (
            <>
              <Label htmlFor="other_payout_method">Other Payment Method:</Label>
              <Input
                placeholder="Payment Method"
                name="other_payout_method"
                id="other_payout_method"
                value={otherPaymentMethod}
                onChange={(e) => setOtherPaymentMethod(e.target.value)}
              />
            </>
          )}

          <Label htmlFor="account_name">Account Name:</Label>
          <Input
            placeholder="Account Name"
            name="account_name"
            id="account_name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />

          <Label htmlFor="account_number">Account Number:</Label>
          <Input
            placeholder="Account Number"
            id="account_number"
            name="account_number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />

          <Label htmlFor="qr_code">Upload QR Code:</Label>
          <FileInput
            id="qr_code"
            accept="image/*"
            name="qr_code"
            onChange={handleFileChange}
          />

          <Input
            type="submit"
            value="Upload"
            className="uppercase cursor-pointer"
            success
          />
        </Form>
      </Modal>

      <Modal
        isOpen={isView}
        onClose={() => setIsView(false)}
        className="pt-10 pb-10 px-10 max-w-2xl max-h-[90vh] overflow-y-auto sm:mx-10"
      >
        <h1 className="text-blue-700 dark:text-blue-400 text-lg uppercase mb-2">
          Transaction Details
        </h1>
        <div className="w-full h-0.5 rounded-full bg-amber-500 mb-2"></div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 md:grid-cols-1">
          <div className="flex flex-col gap-2 overflow-hidden">
            <h3 className="grid grid-cols-2 text-gray-900 dark:text-gray-200">
              <span className="text-amber-700 dark:text-amber-500">
                Transaction ID:
              </span>{" "}
              {selectedTransaction.transaction_id}
            </h3>
            <h3 className="grid grid-cols-2 text-gray-900 dark:text-gray-200">
              <span className="text-amber-700 dark:text-amber-500">
                Transaction Date:
              </span>{" "}
              {selectedTransaction.transaction_date}
            </h3>
            <h3 className="grid grid-cols-2 text-gray-900 dark:text-gray-200">
              <span className="text-amber-700 dark:text-amber-500">Role:</span>{" "}
              {selectedTransaction.role}
            </h3>
            <h3 className="grid grid-cols-2 text-gray-900 dark:text-gray-200">
              <span className="text-amber-700 dark:text-amber-500">
                Status:
              </span>{" "}
              <Badge
                size="sm"
                color={
                  selectedTransaction.status === "Pending"
                    ? "warning"
                    : selectedTransaction.status === "Pay Later"
                    ? "primary"
                    : "success"
                }
              >
                {selectedTransaction.status}
              </Badge>
            </h3>
            <span className="w-full h-0.5 rounded-full bg-amber-500"></span>
            <h3 className="text-blue-700 dark:text-blue-400">Sender Details</h3>
            <h3 className="grid grid-cols-2 text-gray-900 dark:text-gray-200">
              <span className="text-amber-700 dark:text-amber-500">
                Payment Method:
              </span>{" "}
              {selectedTransaction.payment_method}
            </h3>
            <h3 className="grid grid-cols-2 text-gray-900 dark:text-gray-200">
              <span className="text-amber-700 dark:text-amber-500">
                Account Name:
              </span>{" "}
              {selectedTransaction.account_name}
            </h3>
            <h3 className="grid grid-cols-2 text-gray-900 dark:text-gray-200">
              <span className="text-amber-700 dark:text-amber-500">
                Account Number:
              </span>{" "}
              {selectedTransaction.account_number}
            </h3>
            <span className="lg:hidden w-full h-0.5 rounded-full bg-amber-500 sm:block"></span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-blue-700 dark:text-blue-400">
              Proof of Payment
            </h3>
            <ResponsiveImage path={"/images/user/sample_qr_code.png"} />
          </div>
        </div>
        <Button size="sm">Approve</Button>
      </Modal>
    </>
  );
};

export default Payment;
