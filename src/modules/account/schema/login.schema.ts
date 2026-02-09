import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Vui lòng nhập tên đăng nhập hoặc email"),

  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});
