"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {} from "../firebase";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { auth, createUserDocumentFromAuth } from "../firebase";
import { postalCodes, churches } from "../utils";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [church, setChurch] = useState("");
  const router = useRouter();
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail) || newEmail === "");
  };
  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserDocumentFromAuth(
        userCredential.user,
        postalCode,
        address,
        church
      );
      console.log(userCredential.user.uid);
      // Send a request to the backend to create a user node in Neo4j
      await axios.post("http://localhost:3002/createUser", {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        postalCode,
        address,
        church,
      });
      // Sign in the user using Next.js Authentication
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/chat",
      });
      if (result?.error) {
        console.error(result.error);
        // Handle error
      } else {
        router.push("/chat");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
            Regístrate
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-400"
              >
                Correo elegrónico*
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  required
                  placeholder="example@upc.com"
                  className="pl-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
              {!isValidEmail && email !== "" && (
                <p className="mt-2 text-sm text-red-400">
                  Por favor, introduce una dirección de correo electrónico
                  válida.
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Contraseña*
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Al menos 8 caracteres"
                  className="pl-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {password.length > 0 && password.length < 8 && (
              <p className="mt-2 text-sm first-line:text-red-400">
                La contraseña debe tener al menos 8 caracteres.
              </p>
            )}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Confirma contraseña*
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  placeholder="Repetir la contraseña"
                  className="pl-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {password != passwordAgain && (
              <p className="mt-2 text-sm text-red-400">
                La confirmacion debe ser igual a la contraseña.
              </p>
            )}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Código Postal*
                </label>
              </div>
              <div className="mt-2">
                <select
                  id="postalCode"
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  className="pl-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                >
                  <option value="">Seleccione un código postal</option>
                  {postalCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Dirección*
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="pl-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Iglesia local*
                </label>
              </div>
              <div className="mt-2">
                <select
                  id="church"
                  name="church"
                  onChange={(e) => setChurch(e.target.value)}
                  required
                  className="pl-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                >
                  <option value="">Seleccione una iglesia</option>
                  {churches
                    .sort((a, b) => a.parroquia.localeCompare(b.parroquia))
                    .map((church) => (
                      <option key={church.parroquia} value={church.parroquia}>
                        {church.parroquia}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <button
                disabled={
                  !email ||
                  !isValidEmail ||
                  !password ||
                  !passwordAgain ||
                  password.length < 8 ||
                  password !== passwordAgain ||
                  !postalCode ||
                  !church
                }
                onClick={signup}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Registrarse
              </button>
            </div>
            <p className="text-sm  text-red-400">* Campos Obligatorios</p>
          </div>
        </div>
      </div>
    </>
  );
}
