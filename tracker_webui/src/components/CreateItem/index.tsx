import { AxiosResponse } from "axios";
import { FormEvent, MutableRefObject, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { TaskAPI } from "../../constants";
import { axios } from "../../services";

export default function CreateItem(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const textRef: MutableRefObject<HTMLInputElement> = useRef(null!);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response: AxiosResponse = await axios.post(TaskAPI.ITEM, {
      text: textRef.current.value,
    });
    if (response.status !== 201) {
      if (response.status === 400) {
        alert(await response.data);
      } else {
        alert("Something went wrong!");
      }
    }
    navigate(0);
  };

  return (
    <div className="justify-center mt-4 flex">
      <form onSubmit={onSubmit}>
        <div className="flex items-center py-2">
          <input
            type="text"
            id="text"
            placeholder="Text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={textRef}
            required={true}
          />
          <button
            type="submit"
            className="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
