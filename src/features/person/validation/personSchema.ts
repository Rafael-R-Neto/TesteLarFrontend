import { z } from "zod";

const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
};

export const personSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  cpf: z
    .string()
    .min(14, "CPF é obrigatório")
    .refine(validateCPF, { message: "CPF inválido" }),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  phone: z.array(
    z.object({
      number: z.string().refine(
        (val) => {
          const digits = val.replace(/\D/g, "");
          return digits.length === 10 || digits.length === 11;
        },
        { message: "Telefone inválido" }
      ),
      typeId: z.string().min(1, "Tipo obrigatório"),
    })
  ),
});

export type PersonInput = z.infer<typeof personSchema>;
