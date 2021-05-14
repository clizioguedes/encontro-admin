import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const getUsers = async () => {
  const { data } = await api.get("users", {
    params: {
      _limit: 12,
      _sort: "created_at",
      _order: "desc",
    },
  });
  const users = data.map((user) => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    contacted: user.contacted,
    createdAt: format(parseISO(user.created_at), "d MMM yy hh:mm", {
      locale: ptBR,
    }),
    updatedAt: format(parseISO(user.updated_at), "d MMM yy hh:mm", {
      locale: ptBR,
    }),
  }));

  return users;
};
