import { useEffect } from "react";

import { useListItem } from "../../hooks";
import { IItem } from "../../interfaces";

export default function ListItem(): JSX.Element {
  const [items, loading] = useListItem();

  useEffect((): void => {
    if (loading) {
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="bg-black text-white">
                  <th scope="col" className="px-6 py-4">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: IItem): JSX.Element => {
                  return (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={item._id}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.done ? <s>{item.text}</s> : <>{item.text}</>}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.done ? (
                          <>{item.text}</>
                        ) : (
                          <button
                            type="button"
                            className="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          >
                            Mark Done
                          </button>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          type="button"
                          className="middle none center rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
