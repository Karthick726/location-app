import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import client from "./Commons/Clinet";


const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password");

  const [details, setDetails] = useState();

  const handleSpc = (e) => {
    if (e.key === " " && e.target.value.length === 0) {
      e.preventDefault();
    }
  };

  const submit = async (data) => {
    console.log(data);
    const userAdd = await client.post("/user/userAdd", data);
    console.log(userAdd);
  };

  const getUser = async () => {
    try {
      const getUser = await client.get("/user/getUser");
      console.log(getUser.data);
      if (getUser) {
        setDetails(getUser.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit(submit)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onKeyDown={handleSpc}
                  aria-describedby="emailHelp"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "please enter valid mail",
                    },
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  onKeyDown={handleSpc}
                  {...register("name", {
                    required: "name is required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "please enter valid password",
                    },
                  })}
                />
                {errors.name && <span>{errors.name.message}</span>}
              </div>
               
           

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
     
      </div>
    </>
  );
};

export default Form;