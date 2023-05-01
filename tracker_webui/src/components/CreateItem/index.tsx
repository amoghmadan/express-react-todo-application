import { AxiosResponse } from "axios";
import { MutableRefObject, useRef } from "react";

import { axios } from "../../services";

export default function CreateItem(): JSX.Element {
  const textRef: MutableRefObject<never> = useRef(null!);

  const onSubmit = async (): Promise<void> => {
    const response: AxiosResponse = await axios.post("task/items", {
      text: textRef.current,
    });
    if (response.status !== 201) {
      if (response.status === 400) {
        alert(await response.data);
      } else {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="justify-center mt-4 flex">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="text"
          placeholder="Text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ref={textRef}
        />
        <button
          type="submit"
          className="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Add
        </button>
      </form>
    </div>
  );
}
