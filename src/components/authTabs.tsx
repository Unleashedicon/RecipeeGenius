import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignupForm, LoginForm, PasswordResetForm } from "@userfront/next/client";
import { FormEvent, useState } from 'react';
import Userfront from "@userfront/core";

export default function AuthTabs() {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVerify, setPasswordVerify] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [emailOrUsername, setEmailorUsername] = useState<string>('');

  Userfront.init(`${process.env.NEXT_PUBLIC_USERFRONT_WORKSPACE_ID}`);


  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset the alert message
    setAlertMessage(null);

    // Verify that passwords match
    if (password !== passwordVerify) {
      return setAlertMessage('Password verification must match.');
    }

    // Call Userfront.signup()
    try {
      await Userfront.signup({
        method: 'password',
        email,
        password,
        name,
        username,
      });
    } catch (error: any) {
      setAlertMessage(error.message);
    }
  };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset the alert message
    setAlertMessage(null);


    // Call Userfront.signup()
    try {
      await Userfront.login({
        method: 'password',
        emailOrUsername,
        password,
      });
    } catch (error: any) {
      setAlertMessage(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="password">Forgot password</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
        <form id="login-form" onSubmit={handleLogin} className="max-w-md mx-auto p-6 bg-green-500 rounded-lg shadow-md">
            <div id="alert" className="mb-4 text-red-500">
              {alertMessage}
            </div>

            <div className="mb-4">
              <label htmlFor="email-or-username" className="block text-white font-bold mb-2">Email address or Username</label>
              <input
                type="text"
                id="email-or-username"
                name="email-or-username"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Email address or Username"
                value={emailOrUsername} // You can adjust to handle both email and username
                onChange={(e) => setEmailorUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-white font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="w-full bg-white text-green-500 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300">
              Log in
            </button>
</form>

        </TabsContent>

        <TabsContent value="signup">
        <form onSubmit={handleSignup} className="max-w-md mx-auto p-6 bg-green-500 rounded-lg shadow-md">
        {alertMessage && <div className="mb-4 text-red-500">{alertMessage}</div>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-white font-bold mb-2">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-white font-bold mb-2">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-bold mb-2">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Email address"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white font-bold mb-2">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password-verify" className="block text-white font-bold mb-2">Verify password</label>
          <input
            id="password-verify"
            name="password-verify"
            type="password"
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Verify password"
            required
          />
        </div>
        <button type="submit" className="w-full bg-white text-green-500 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300">
          Sign up
        </button>
      </form>
        </TabsContent>

        <TabsContent value="password">
          <PasswordResetForm redirect="/profile" theme='{"colors":{"light":"#d2f3db","dark":"#0c6422","accent":"#13a0ff","lightBackground":"#7aa880","darkBackground":"#254130"},"colorScheme":"auto","fontFamily":"Avenir, Helvetica, Arial, sans-serif","size":"large","extras":{"rounded":true,"hideSecuredMessage":true}}' />
        </TabsContent>
      </Tabs>
    </div>
  );
}
