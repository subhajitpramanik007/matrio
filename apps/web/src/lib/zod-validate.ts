import z from "zod";

export const zodValidate = {
  schema<T>(schema: z.ZodType<T>) {
    return {
      data: (data: unknown) => {
        const { success, error, data: validateData } = schema.safeParse(data);
        if (!success) {
          throw error.issues[0].message;
        }

        return validateData;
      },
    };
  },
};
