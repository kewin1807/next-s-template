"use client";

import { Input } from "@/commons/Input";
import { signIn } from "next-auth/react";
import axiosInstance from "@/configs/axios.config";

export default function RegisterForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const { data } = await axiosInstance.post("/register", {});
      // const response = await axiosInstance.post ({
      //   method: "POST",
      //   url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/register",
      //   body: JSON.stringify(Object.fromEntries(formData)),
      // });

      const credentials = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      signIn("credentials", credentials);
    } catch (error) {
      if (error instanceof Response) {
        const response = await error.json();

        if (!response.errors) {
          throw error;
        }

        return Object.keys(response.errors).map((errorKey) => {
          const input = document.querySelector(
            `[name="${errorKey}"]`
          ) as HTMLInputElement;
          input.setCustomValidity(response.errors[errorKey]);
          input.reportValidity();
        });
      }

      throw new Error("An error has occurred during registration request");
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Emails
          </label>
          <Input id="email" name="email" type="email" defaultValue="testing" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue="******************"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password_confirmation">Password confirmation</label>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            defaultValue="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
