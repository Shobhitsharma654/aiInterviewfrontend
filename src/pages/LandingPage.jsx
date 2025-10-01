import { useContext, useState } from 'react';
import HERO from "../assets/image.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from "react-icons/lu";
import Modal from '../components/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Main Yellow Wrapper */}
      <div className="w-full min-h-screen bg-yellow-100 overflow-hidden relative">
        {/* Blurred Yellow Glow */}
        <div className="w-[500px] h-[500px] bg-yellow-300 blur-[300px] absolute top-0 left-0" />

        {/* Header + Hero Section */}
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-32 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-yellow-900 font-bold">
              Interview Prep AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-700 hover:text-white border border-yellow-200 transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Text + CTA */}
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-full md:w-1/2">
              <div className="flex justify-center md:justify-start mb-2">
                <div className="flex items-center gap-2 text-sm text-yellow-800 font-semibold bg-yellow-100 px-3 py-1 rounded-full border border-yellow-500">
                  <LuSparkles /> AI Powered
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl text-yellow-900 font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-[length:200%_200%] animate-gradient-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-base md:text-[17px] text-yellow-900 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is here.
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-200 hover:border-yellow-500 transition-colors cursor-pointer w-full sm:w-auto"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="w-full shadow-xs bg-yellow-50 py-10 flex items-center justify-center -mt-24 z-10 relative">
        <div className="w-full max-w-6xl px-4">
          <div className="bg-yellow-100 rounded-lg overflow-hidden">
            <img
              src={HERO}
              alt="Hero showcasing interview AI"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-yellow-100 mt-0 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">
          <h2 className="text-2xl font-medium text-center text-yellow-900 mb-12">
            Features That Make You Shine
          </h2>

          <div className="flex flex-col items-center gap-8">
            {/* First 3 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-yellow-200 p-6 rounded-xl shadow-xs hover:shadow-lg shadow-yellow-600 transition border border-yellow-500"
                >
                  <h3 className="text-base font-semibold mb-3 text-yellow-900">
                    {feature.title}
                  </h3>
                  <p className="text-yellow-800">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Last 2 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-yellow-200 p-6 rounded-xl shadow-xs hover:shadow-lg shadow-yellow-600 transition border border-yellow-500"
                >
                  <h3 className="text-base font-semibold mb-3 text-yellow-900">
                    {feature.title}
                  </h3>
                  <p className="text-yellow-800">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-sm  text-center p-5 mt-5">
        Made with ❤️ by Shobhit Sharma
      </footer>

      {/* Modal for Login / Sign Up */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" && (
          <Login setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "signup" && (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </Modal>
    </>
  );
};

export default LandingPage;
