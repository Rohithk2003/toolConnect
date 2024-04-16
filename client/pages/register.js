import NavBar from "@/components/navBar";
import Link from "next/link";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function InputComponent({
  placeholder,
  value,
  onChangeHandler,
  label,
  type,
  name,
  id,
}) {
  return (
    <div>
      <label
        htmlFor="username"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChangeHandler}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#191919] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

function ErrorMessageComponent({ errormessage, forId }) {
  return (
    <label
      htmlFor={forId}
      className=" italic mt-0 pt-0 text-base font-medium dark:text-red-900"
    >
      {`${errormessage}`}
    </label>
  );
}

const SignUpPage = () => {
  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirm_password: "",
    address: "",
    email: "",
    first_name: "",
    last_name: "",
    type: "Buyer",
  });
  const [displaygif, changeDisplayGif] = useState("hidden");
  const router = useRouter();
  const [csrftoken, setToken] = useState(null);
  const [errorMessage, setError] = useState({
    passwordError: "",
    usernameError: "",
    emailError: "",
  });
  const [type, setType] = useState([
    { id: "Buyer", value: "Buyer" },
    { id: "Seller", value: "Seller" },
  ]);
  useEffect(() => {
    fetch("https://toolconnect.onrender.com/api/get_csrf", {
      credentials: "include",
    }).then((response) => {
      let token = response.headers.get("X-CSRFToken");
      setToken(token);
    });
  }, []);

  function HandleSubmit(e) {
    changeDisplayGif("block");
    setTimeout(() => {
      changeDisplayGif("hidden");
      fetch("https://toolconnect.onrender.com/api/register_user", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: details.username,
          password: details.password,
          address: details.address,
          confirm_password: details.confirm_password,
          email: details.email,
          type: details.type,
          first_name: details.first_name,
          last_name: details.last_name,
        }),
      })
        .then((response) => response.json())
        .then((r) => {
          if (r["status"] === "0") {
            localStorage.setItem("status", "true");
            localStorage.setItem("username", details.username);
            router.push("/");
          } else if (r["status"] === "1") {
            setError((values) => {
              return { ...values, emailError: "! Please enter correct email" };
            });
          } else if (r["status"] === "2") {
            setError((values) => {
              return { ...values, emailError: "! Passwords must not match" };
            });
          } else if (r["status"] === "3") {
            setError((values) => {
              return { ...values, emailError: "! Username already exists" };
            });
          }
        });
    }, 3000);
  }

  const updateInputs = (input) => {
    if (input.target.name === "username") {
      setDetails((previousValues) => {
        return { ...previousValues, username: input.target.value };
      });
    } else if (input.target.name === "firstname") {
      setDetails((previousValues) => {
        return { ...previousValues, first_name: input.target.value };
      });
    } else if (input.target.name === "lastname") {
      setDetails((previousValues) => {
        return { ...previousValues, last_name: input.target.value };
      });
    } else if (input.target.name === "email") {
      setDetails((previousValues) => {
        return { ...previousValues, email: input.target.value };
      });
    } else if (input.target.name === "password") {
      setDetails((previousValues) => {
        return { ...previousValues, password: input.target.value };
      });
    } else if (input.target.name === "confirmpassword") {
      setDetails((previousValues) => {
        return { ...previousValues, confirm_password: input.target.value };
      });
    } else if (input.target.name === "address") {
      setDetails((previousValues) => {
        return { ...previousValues, address: input.target.value };
      });
    } else {
      setDetails((previousValues) => {
        return { ...previousValues, type: input.target.value };
      });
    }
  };
  return (
    <>
      <section className="bg-gray-50 pt-40 pb-52 dark:bg-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
          <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <span className="material-symbols-outlined pl-0 ml-0 h-auto align-baseline pr-2  ">
              handyman
            </span>
            ToolConnect
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <InputComponent
                  type="text"
                  placeholder="Username"
                  label="Username"
                  name="username"
                  onChangeHandler={updateInputs}
                  value={details.username}
                  id="username"
                />
                <ErrorMessageComponent
                  errormessage={errorMessage.usernameError}
                  htmlfor={"username"}
                />
                <InputComponent
                  type="text"
                  placeholder="Email"
                  label="Email Address"
                  name="email"
                  onChangeHandler={updateInputs}
                  value={details.email}
                  id="email"
                />
                <ErrorMessageComponent
                  errormessage={errorMessage.emailError}
                  htmlfor={"email"}
                />
                <div className="grid  gap-4 grid-cols-2 grid-rows-1">
                  <InputComponent
                    type="text"
                    placeholder="First name"
                    label="First name"
                    name="firstname"
                    value={details.first_name}
                    onChangeHandler={updateInputs}
                    id="firstname"
                  />
                  <InputComponent
                    type="text"
                    placeholder="Last name"
                    label="Last name"
                    name="lastname"
                    value={details.last_name}
                    onChangeHandler={updateInputs}
                    id="lastname"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#191919] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Address"
                    value={details.address}
                    onChange={updateInputs}
                    required=""
                  />
                </div>
                <InputComponent
                  type="password"
                  placeholder="••••••••"
                  label="Password"
                  name="password"
                  onChangeHandler={updateInputs}
                  value={details.password}
                  id="password"
                />
                <ErrorMessageComponent
                  errormessage={errorMessage.passwordError}
                  htmlfor={"password"}
                />

                <InputComponent
                  type="password"
                  placeholder="••••••••"
                  label="Confirm password"
                  onChangeHandler={updateInputs}
                  value={details.confirm_password}
                  name="confirmpassword"
                  id="confirm-password"
                />
                <ErrorMessageComponent
                  errormessage={errorMessage.passwordError}
                  htmlfor={"password"}
                />
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select type of user
                  </label>
                  <select
                    id="type"
                    onChange={updateInputs}
                    name="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#191919] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {type.map((type, id) => (
                      <option key={type.id}>{type["value"]}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="/terms-and-conditions"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <div className={`relative `}>
                  <div className={`absolute right-24 top-2 ${displaygif}`}>
                    <img
                      src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
                      width={24}
                      height={24}
                      className="ml-5 text-white"
                      alt={"loading"}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={HandleSubmit}
                    className="w-full  hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-50 dark:text-black dark:hover:bg-red-200 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
