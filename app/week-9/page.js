"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Shopping List App</h1>
        
        {user ? (
          <div className="text-center space-y-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
              <p className="text-gray-700">
                {user.displayName} ({user.email})
              </p>
            </div>
            
            <div className="space-y-3">
              <Link
                href="/week-9/shopping-List"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors text-center"
              >
                Go to Shopping List
              </Link>
              
              <button
                onClick={handleSignOut}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-700 mb-6">
              Please sign in to access your shopping list.
            </p>
            
            <button
              onClick={handleSignIn}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Sign in with GitHub</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}