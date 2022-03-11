import type { NextPage } from "next";
import React from "react";
import Marble from "../assets/Marble";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import Loader from "../components/Loader";
import Login from "../components/Login";
import Overview from "../components/Overview";
import Transactions from "../components/Transactions";
import { useUser } from "../hooks/useUser";

interface IndexProps {}

const Index: NextPage<IndexProps> = () => {
  const { user, loading } = useUser();

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="w-10/12 max-w-lg flex flex-col items-center justify-center">
        <Marble className="my-12" />
        {loading && <Loader className="w-full flex justify-center" />}
        <div className={`w-full ${loading && "hidden"}`}>
          {user ? (
            <div className="w-full text-neutral-200">
              <Overview />
              <Leaderboard className="mt-6" />
              <Transactions className="mt-6" />
            </div>
          ) : (
            <div className="w-full text-neutral-200">
              <Login />
            </div>
          )}
        </div>
        <Footer className="my-12" />
      </div>
    </div>
  );
};

export default Index;
