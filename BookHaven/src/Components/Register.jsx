import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useSelector,useDispatch} from 'react-redux'
import { storeFormData } from "../utils/Redux/action";
import {Link} from 'react-router-dom'
export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm();
  const dispatch = useDispatch()
  const formData = useSelector((data)=>{
    return data.formData
  })

  //^ Function that will execute for the data which is submitted
  const FormSubmitHandler = (data) => {
    console.log("data:", data);
    localStorage.setItem("user-data", JSON.stringify(data))
    dispatch(storeFormData(data))
    reset();
  };
  const clearData = ()=>{
    dispatch(storeFormData({}))
    localStorage.clear()
  }
  const confirmPass = watch("password");
  console.log(formData)
  return (
    <div id="home">
      {Object.keys(formData).length !=0 ? (
        <div id="successful">
          <div className="msg">Registration successfull!</div>
          <div id="buttons">
            <Link><button onClick={clearData} id="success-btn-1">Clear Data</button></Link>
            <Link to={"/"}><button id="success-btn-2">Home</button></Link>
          </div>
        </div>
      ) : (
        <div id="form">
          <fieldset>
            <legend>Register</legend>

            <form onSubmit={handleSubmit(FormSubmitHandler)}>
              <div id="fields">
                <label id="label-1"> Name </label>
                <input
                  type="text"
                  name="firstName" className="input-field"
                  {...register("firstName", {
                    required: "Fill First Name",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximun 30 characters only",
                    },
                  })}
                />
                {errors.firstName && <p className="err">{errors.firstName.message}</p>}
                {/* <p className="err">{errors.firstName?.message}</p> */}
              </div>

              <div id="fields">
                <label id="label-2"> Email  </label>
                <input
                  type="email"
                  name="email" className="input-field"
                  {...register("email", {
                    required: "Email Required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid Email",
                    },
                  })}
                />
                <p className="err">{errors.email?.message}</p>
              </div>

              <div id="fields">
                <label id="label-3"> Password  </label>
                <input
                  type="password"
                  name="password" className="input-field"
                  {...register("password", {
                    required: "Password Required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters required",
                    },
                    pattern: {
                      value: /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/,
                      message:
                        "Password Not Valid (Use at least one Special Character)",
                    },
                  })}
                />
                <p className="err">{errors.password?.message}</p>
              </div>

              <div id="fields">
                <label id="label-4"> Confirm Password  </label>
                <input
                  type="password"
                  name="password" className="input-field"
                  {...register("confirmPassword", {
                    required: "Re-Type Password",
                    validate: (value) =>
                      value == confirmPass || "Password doesn't match",
                  })}
                />
                <p className="err">{errors.confirmPassword?.message}</p>
              </div>

              <div id="fields">
                <input type="submit" value="Register" />
              </div>
            </form>
          </fieldset>
        </div>
      )}
    </div>
  );
}
