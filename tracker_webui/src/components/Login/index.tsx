import { AxiosResponse } from "axios";
import { FormEvent, MutableRefObject, useEffect, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { AccountAPI, Browser, LOCAL_STORAGE_KEY } from "../../constants";
import { IToken } from "../../interfaces";
import { axios } from "../../services";

export default function Login(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const emailRef: MutableRefObject<HTMLInputElement> = useRef(null!);
  const passwordRef: MutableRefObject<HTMLInputElement> = useRef(null!);

  useEffect((): void => {
    const token: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!token) return;
    navigate(Browser.TODO);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response: AxiosResponse = await axios.post(AccountAPI.LOGIN, {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    console.log(response);
    if (response.status !== 201) {
      if (response.status === 400) {
        alert("Invalid credentials!");
      } else {
        alert("Something went wrong!");
      }
      return;
    }
    const data: IToken = await response.data;
    localStorage.setItem(LOCAL_STORAGE_KEY, data.token);
    navigate(Browser.TODO);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={Browser.FAVICON_32} alt="logo" />
          Todo
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  ref={emailRef}
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ref={passwordRef}
                  required={true}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
