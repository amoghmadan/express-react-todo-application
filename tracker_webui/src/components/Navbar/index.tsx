import { AxiosResponse } from "axios";
import { MouseEvent, useEffect } from "react";

import { useUser } from "../../hooks";
import { AccountAPI, Browser, LOCAL_STORAGE_KEY } from "../../constants";
import { axios } from "../../services";

export default function Navbar(): JSX.Element {
  const [user, loading] = useUser();

  const performLogout = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const response: AxiosResponse = await axios.delete(AccountAPI.LOGOUT);
    if (response.status !== 204) {
      console.error("Something went wrong!");
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  useEffect((): void => {
    if (loading) {
    }
  }, [loading]);

  return (
    <nav className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href={Browser.TODO} className="flex items-center">
          <img src={Browser.FAVICON_32} className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Todo
          </span>
        </a>
        <p
          className="block py-2 pl-3 pr-4 text-white bg-black-700 rounded md:bg-transparent"
          aria-current="page"
        >
          {user.firstName} {user.lastName}
        </p>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
            onClick={performLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
