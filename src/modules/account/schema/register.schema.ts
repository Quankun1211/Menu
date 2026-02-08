import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Họ tên quá ngắn"),
    username: z.string().min(3, "Tên đăng nhập ≥ 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu ≥ 8 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirm_password"],
  });
