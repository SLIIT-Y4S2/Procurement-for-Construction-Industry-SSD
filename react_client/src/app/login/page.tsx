"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { getAuthenticatedUser } from "@/context/auth/authentication.service";
import { API_ROUTES, APP_ROUTES } from "@/utils/constants";
import { AuthContext } from "@/context/auth/AuthContext";
import { IAuthContext } from "@/types/auth.interface";

type FieldType = {
  email?: string;
  password?: string;
};

const { Item } = Form;
const { Password } = Input;

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext) as IAuthContext;

  const redirectIfAuthenticated = async () => {
    try {
      const isUserAuthenticated = await getAuthenticatedUser();
      if (isUserAuthenticated?.authenticated) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    redirectIfAuthenticated();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(values.email, values.password);
      setIsLoading(false);
      router.push(APP_ROUTES.HOME);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 401) {
        setError("Invalid Credentials");
      } else if (error?.message === "Network Error") {
        setError("Network Error");
      } else {
        setError("Something went wrong during signing in");
      }

      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center  h-screen">
      <h1 className="text-fuchsia-500 text-lg mb-5">Temp Login</h1>
      <Form
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your registration number !",
            },
          ]}
        >
          <Input />
        </Item>
        <Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Password />
        </Item>
        {error && (
          <Item>
            <p className="text-red-500 text-sm text-center">{error}</p>
          </Item>
        )}
        <Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-color-[#FFAE00]"
            loading={isLoading}
          >
            Submit
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default Login;
