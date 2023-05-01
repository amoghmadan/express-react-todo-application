import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { TaskAPI } from "../constants";
import { IItem } from "../interfaces";
import { axios } from "../services";

export default function useListItem(): [IItem[], boolean] {
  const [users, setUsers] = useState<IItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const retrieveUser = async (): Promise<void> => {
    const response: AxiosResponse = await axios.get(TaskAPI.ITEM);
    const data: IItem[] = await response.data;
    setUsers(data);
    setLoading(false);
  };

  useEffect((): void => {
    setLoading(true);
    retrieveUser();
  });

  return [users, loading];
}
