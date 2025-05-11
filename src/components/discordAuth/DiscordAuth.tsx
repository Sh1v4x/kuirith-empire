import { useState } from "react";

interface LoginProps {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function DiscordAuth({ isModalOpen, setModalOpen }: LoginProps) {
  const [isIdSend, setIsIdSend] = useState<boolean>(false);
  return (
    <>
      {isModalOpen && (
        <div
          id="authentication-modal"
          className="fixed top-0 left-0 right-0 z-60 flex justify-center items-center w-full h-full bg-black/50"
          aria-hidden="false"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isIdSend ? "Write your code" : "Write your Discord ID"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form className="space-y-4">
                  {!isIdSend ? (
                    <>
                      <div>
                        <label
                          htmlFor="discordId"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Discord ID
                        </label>
                        <input
                          type="text"
                          id="discordId"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="discord id"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsIdSend(true);
                        }}
                        className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                      >
                        Send Discord ID
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        <label
                          htmlFor="code"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Code
                        </label>
                        <input
                          type="text"
                          id="code"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="code"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                      >
                        Send Code
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
