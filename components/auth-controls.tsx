import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function AuthControls() {
  return (
    <div className="home-auth-controls">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="home-auth-button home-auth-button--sign-in" type="button">
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="home-auth-button home-auth-button--sign-up" type="button">
            Sign up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <span className="home-user-button">
          <UserButton appearance={{ elements: { avatarBox: "home-clerk-avatar" } }} />
        </span>
      </Show>
    </div>
  );
}
