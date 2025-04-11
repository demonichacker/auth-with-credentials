"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res.error) {
        setError("Invalid Credentials")
        setLoading(false)
        return
      }

      router.replace("dashboard")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="grid place-items-center h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="shadow-lg p-4 rounded-lg border-t-4 border-yellow-400 bg-gray-800 w-full max-w-xs sm:max-w-sm mx-auto transform transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-lg sm:text-xl font-bold my-3 text-yellow-400 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
          />
          <button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold cursor-pointer px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="loader border-t-2 border-white border-solid rounded-full w-4 h-4 animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-2 rounded-md mt-2 animate-pulse">
              {error}
            </div>
          )}

          <Link
            className="text-xs mt-2 text-right text-gray-300 hover:text-yellow-400 transition-colors"
            href={"/register"}
          >
            {"Don't have an account? "}
            <span className="underline text-yellow-400">Register</span>
          </Link>
        </form>
      </div>
    </div>
  )
}