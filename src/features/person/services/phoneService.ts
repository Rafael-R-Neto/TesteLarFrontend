import { api } from "../../../config/api";

export interface PhoneType {
  id: string;
  name: string;
}

export const getPhoneTypes = async (): Promise<PhoneType[]> => {
  const { data } = await api.get("phoneType");
  return data;
};
