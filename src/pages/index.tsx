import type { NextPage } from "next";
import React, { useEffect } from "react";
import Marble from "../assets/Marble";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import Loader from "../components/Loader";
import AuthFlow from "../components/AuthFlow";
import Overview from "../components/Overview";
import Transactions from "../components/Transactions";
import { useLoading } from "../hooks/useLoading";
import { useUser } from "../hooks/useUser";
import QR from "../assets/QR";
import { useModal } from "../hooks/useModal";
import QRGenerator from "../components/QRGenerator";

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
  const { loading } = useLoading();
  const { user } = useUser();
  const { modal, setModal } = useModal();

  return (
    <>
      {modal && (
        <div className="w-screen h-screen absolute z-50 flex justify-center items-center">
          <div className="w-1/2 bg-neutral-900 border-2 border-neutral-200 rounded-lg p-6">
            {modal}
          </div>
        </div>
      )}
      <div
        className={`h-screen flex flex-col justify-start items-center ${
          modal ? "opacity-50 bg-black" : ""
        }`}
      >
        <div className="w-10/12 max-w-lg flex flex-col items-center justify-center">
          <div className="w-full flex justify-between items-center my-12">
            <Marble className="cursor-pointer" />
            <QR
              className="cursor-pointer"
              onClick={() => {
                setModal(<QRGenerator />);
              }}
            />
          </div>
          {loading && <Loader className="w-full flex justify-center" />}
          <div className={`w-full ${loading ? "hidden" : ""}`}>
            {user?.isCompleted ? (
              <div className="w-full text-neutral-200">
                <Overview />
                <Leaderboard className="mt-6" />
                <Transactions className="mt-6" />
              </div>
            ) : (
              <div className="w-full text-neutral-200">
                <AuthFlow />
              </div>
            )}
          </div>
          <Footer className="my-12" />
        </div>
      </div>
    </>
  );
};

export default Index;
