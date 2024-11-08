import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  Button,
  Grid2 as Grid,
  Link,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  TextField,
  Paper,
} from "@mui/material";

import { GlobalContext } from "@/context/GlobalContext";
import axios from "@/utils/axios";
import { jwtKey } from "@/data/websiteInfo";
import Step1Form from "./step1Form";
import Step2Form from "./step2Form";

export default function SignUp({ onSuccess }) {
  const router = useRouter();
  const { user: globaluser, setAuth } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push("/");
    //return <Loading />;
  }
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    profile: "",
    password: "",
  });

  const SubmitHandler = async () => {
    setError({
      status: false,
      message: "",
    });
    if (
      user.firstName === "" ||
      user.lastName === "" ||
      user.email === "" ||
      !/(?:[a-z0-9!#$%&'*/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        user.email
      ) ||
      user.password === ""
    ) {
      setError({
        status: true,
        message: "Please fill all fields to continue",
      });
      return;
    }

    try {
      setLoading(true);
      let body = {
        ...user,
        name: user.firstName + " " + user.lastName,
      };
      if (body.profile !== null) {
        let formData = new FormData();
        Object.keys(body).map((key) => {
          formData.append(key, body[key]);
          return key;
        });
        body = formData;
      }
      const result = await axios.post("/users/signup", body);

      if (result.data.success) {
        await localStorage.setItem(jwtKey, result.data.token);
        setAuth({ ...result.data.data.user, token: result.data.token });
        if (onSuccess) onSuccess();
      } else {
        setError({
          status: true,
          message: result.data.message,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({
        status: true,
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return step === 1 ? (
    <Step1Form
      loading={loading}
      error={error.status}
      errorMessage={error.message}
      onSuccess={onSuccess}
      onSubmit={(step1Data) => {
        setUser((u) => {
          return {
            ...u,
            ...step1Data,
          };
        });
        setStep(2);
      }}
    />
  ) : (
    <Step2Form
      loading={loading}
      error={error.status}
      errorMessage={error.message}
      onSubmit={(step2Data) =>
        SubmitHandler({
          ...user,
          ...step2Data,
        })
      }
    />
  );
}
