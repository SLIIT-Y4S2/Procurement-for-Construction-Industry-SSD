"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAuthenticatedUser,
  storeTokenInLocalStorage,
} from "@/lib/authentication.services";
import { API_ROUTES, APP_ROUTES } from "@/utils/constants";
import axios from "axios";

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { Item } = Form;
  const { Password } = Input;
  const router = useRouter();

  const redirectIfAuthenticated = async () => {
    const isUserAuthenticated = await getAuthenticatedUser();
    if (isUserAuthenticated?.authenticated) {
      router.push("/");
    }
  };

  useEffect(() => {
    redirectIfAuthenticated();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = async (values: any) => {
    try {
      // await signIn("credentials", {
      //   userRegNo: values.userRegNo,
      //   password: values.password,
      //   callbackUrl: searchParams?.get("callbackUrl") || "/",
      // });
      setIsLoading(true);
      const response = await axios.post(API_ROUTES.LOGIN, {
        email: values.email,
        password: values.password,
      });
      if (!response?.data?.accessToken) {
        console.log("Something went wrong during signing in: ", response);
        setIsLoading(false);
        return;
      }
      storeTokenInLocalStorage(response.data.accessToken);
      router.push(APP_ROUTES.HOME);
    } catch (error) {
      console.log(error);
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
