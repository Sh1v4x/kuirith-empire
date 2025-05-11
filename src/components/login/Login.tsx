interface LoginProps {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function Login({ isModalOpen, setModalOpen }: LoginProps) {
  return (
    <>
      {isModalOpen && (
        <div
          id="authentication-modal"
          className="fixed top-0 left-0 right-0 z-60 flex justify-center items-center w-full h-full bg-black/50"
          aria-hidden="false"
        >
          <div className="relative p-6 w-full max-w-md">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-primary dark:text-white">
                  Sign in to your account
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  type="button"
                  className="text-gray-400 hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-8 h-8 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4"
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

              <div className="px-6 py-5">
                <form className="space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-accent focus:border-accent"
                      placeholder="Your username"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-accent focus:border-accent"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        className="mr-2 w-4 h-4 text-accent border-gray-300 rounded dark:border-gray-500"
                      />
                      Remember me
                    </label>
                    <a href="#" className="text-accent hover:underline">
                      Lost Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                  >
                    Login
                  </button>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    Not registered?{" "}
                    <a href="#" className="text-accent hover:underline">
                      Create account
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
