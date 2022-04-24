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
import { useAuth } from "../hooks/useAuth";

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
  const { loading } = useLoading();
  const { auth } = useAuth();

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="w-10/12 max-w-lg flex flex-col items-center justify-center">
        <Marble className="my-12" />
        {loading && <Loader className="w-full flex justify-center" />}
        <div className={`w-full ${loading ? "hidden" : ""}`}>
          {auth?.isComplete ? (
            <div className="w-full text-neutral-200">
              <Overview />
              {/* <Leaderboard className="mt-6" />
              <Transactions className="mt-6" /> */}
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
  );
};

export default Index;
