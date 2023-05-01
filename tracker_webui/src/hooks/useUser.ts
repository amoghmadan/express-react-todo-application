import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { AccountAPI } from "../constants";
import { IUser } from "../interfaces";
import { axios } from "../services";

export default function useUser(): [IUser, boolean] {
  const [user, setUser] = useState<IUser>(Object);
  const [loading, setLoading] = useState<boolean>(false);

  const retrieveUser = async (): Promise<void> => {
    const response: AxiosResponse = await axios.get(AccountAPI.DETAIL);
    const data: IUser = await response.data;
    setUser(data);
    setLoading(false);
  };

  useEffect((): void => {
    setLoading(true);
    retrieveUser();
  });

  return [user, loading];
}
