import type { Person } from "../types/person";
import { api } from "../../../config/api";

export const getPeople = async (): Promise<Person[]> => {
  const res = await api.get("person");
  return res.data;
};

export const createPerson = async (person: Person): Promise<Person> => {
  const res = await api.post("person", person);
  return res.data;
};

export const removePerson = async (id: number): Promise<Person> => {
  const res = await api.delete(`person/${id}`);
  return res.data;
};

export const getPersonById = async (id: number) => {
  const { data } = await api.get(`person/${id}`);
  return data;
};

export const updatePerson = async (person: any) => {
  const { data } = await api.put(`person`, person);
  return data;
};
