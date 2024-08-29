import { useRouter } from 'next/router';
import { useUserfront } from "@userfront/next/client";
import { LogoutButton } from "@userfront/next/client"; // Importing LogoutButton

export default function Profile() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUserfront();

  const handleSignInClick = () => {
    router.push('/signup'); // Redirect to signup page
  };

  // Render nothing while checking authentication status
  if (isLoading) {
    return null;
  }

  return (
    <>
      {isAuthenticated ? (
        <LogoutButton theme='{"colors":{"light":"#d2f3db","dark":"#0c6422","accent":"#13a0ff","lightBackground":"#7aa880","darkBackground":"#254130"},"colorScheme":"auto","fontFamily":"Avenir, Helvetica, Arial, sans-serif","size":"large","extras":{"rounded":true,"hideSecuredMessage":true}}' />
      ) : (
        <button onClick={handleSignInClick}>
          Sign in
        </button>
      )}
    </>
  );
}
