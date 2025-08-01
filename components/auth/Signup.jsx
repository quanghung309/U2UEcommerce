import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import { useRouter } from "next/navigation";

const Signup = () => {
   const router = useRouter();
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
   });

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Handle signup logic here
      console.log("Signup form submitted:", formData);
      // After successful signup, you can redirect:
      // router.push('/login');
   };

   return (
      <AuthLayout
         title="Create your account"
         subtitle="Already have an account?"
         linkText="Sign in"
         linkTo="/login"
      >
         <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
               <div>
                  <label
                     htmlFor="firstName"
                     className="block text-sm font-medium text-gray-700"
                  >
                     Tên
                  </label>
                  <div className="mt-1">
                     <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     />
                  </div>
               </div>

               <div>
                  <label
                     htmlFor="lastName"
                     className="block text-sm font-medium text-gray-700"
                  >
                     Họ
                  </label>
                  <div className="mt-1">
                     <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     />
                  </div>
               </div>
            </div>

            <div>
               <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
               >
                  Địa chỉ email
               </label>
               <div className="mt-1">
                  <input
                     id="email"
                     name="email"
                     type="email"
                     autoComplete="email"
                     required
                     value={formData.email}
                     onChange={handleChange}
                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
               </div>
            </div>

            <div>
               <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
               >
                  Mật khẩu
               </label>
               <div className="mt-1">
                  <input
                     id="password"
                     name="password"
                     type="password"
                     autoComplete="new-password"
                     required
                     value={formData.password}
                     onChange={handleChange}
                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
               </div>
            </div>

            <div>
               <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
               >
                  Xác nhận mật khẩu
               </label>
               <div className="mt-1">
                  <input
                     id="confirmPassword"
                     name="confirmPassword"
                     type="password"
                     autoComplete="new-password"
                     required
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
               </div>
            </div>

            <div className="flex items-center">
               <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
               />
               <label
                  htmlFor="acceptTerms"
                  className="ml-2 block text-sm text-gray-900"
               >
                  Tôi đồng ý với{" "}
                  <a
                     href="#"
                     className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                     Điều khoản và điều kiện
                  </a>{" "}
                  and{" "}
                  <a
                     href="#"
                     className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                     Chính sách bảo mật
                  </a>
               </label>
            </div>

            <div>
               <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               >
                  Tạo tài khoản
               </button>
            </div>

            <div className="mt-6">
               <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                     <span className="px-2 bg-white text-gray-500">
                        Hoặc tiếp tục với
                     </span>
                  </div>
               </div>

               <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                     type="button"
                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                     <span className="sr-only">Đăng kí với Google</span>
                     Google
                  </button>
                  <button
                     type="button"
                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                     <span className="sr-only">Đăng kí với Facebook</span>
                     Facebook
                  </button>
               </div>
            </div>
         </form>
      </AuthLayout>
   );
};

export default Signup;
