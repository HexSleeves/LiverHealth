import {
	isClerkAPIResponseError,
	useAuth,
	useSignIn,
	useSignUp,
} from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useCallback, useState } from "react";

export interface AuthError {
	message: string;
	code?: string;
}

export interface SignInData {
	email: string;
	password: string;
}

export interface SignUpData {
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
}

export interface ForgotPasswordData {
	email: string;
}

export interface ResetPasswordData {
	code: string;
	password: string;
}

export function useClerkAuth() {
	const [isLoading, setIsLoading] = useState(false);
	const [secondFactor, setSecondFactor] = useState(false);
	const [error, setError] = useState<AuthError | null>(null);

	const { signIn, setActive } = useSignIn();
	const { signUp, setActive: setActiveSignUp } = useSignUp();

	const clerkAuth = useAuth();
	const { signOut, ...clerkAuthData } = clerkAuth;

	const clearError = useCallback(() => setError(null), []);

	// Sign in a user
	const handleSignIn = async (data: SignInData) => {
		if (!signIn) return;

		setIsLoading(true);
		setError(null);

		try {
			const result = await signIn.create({
				identifier: data.email,
				password: data.password,
			});

			if (result.status === "complete") {
				await setActive({ session: result.createdSessionId });
				router.replace("/(tabs)");
			} else {
				setError({
					message: "Sign in incomplete. Please try again.",
					code: "INCOMPLETE_SIGNIN",
				});
			}
		} catch (err: unknown) {
			console.error(err);

			if (isClerkAPIResponseError(err)) {
				setError({
					message:
						err.errors?.[0]?.message || "Failed to sign in. Please try again.",
					code: err.errors?.[0]?.code || "SIGNIN_ERROR",
				});
			} else {
				setError({
					message: "Failed to sign in. Please try again.",
					code: "SIGNIN_ERROR",
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	// Sign out the user
	const handleSignOut = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			await signOut({ redirectUrl: "/(auth)/sign-in" });
		} catch (err: unknown) {
			if (isClerkAPIResponseError(err)) {
				setError({
					message:
						err.errors?.[0]?.message || "Failed to sign out. Please try again.",
					code: err.errors?.[0]?.code || "SIGNOUT_ERROR",
				});
			} else {
				setError({
					message: "Failed to sign out. Please try again.",
					code: "SIGNOUT_ERROR",
				});
			}
		} finally {
			setIsLoading(false);
		}
	}, [signOut]);

	// Sign up a new user
	const handleSignUp = useCallback(
		async (data: SignUpData) => {
			if (!signUp) return;

			setIsLoading(true);
			setError(null);

			try {
				const result = await signUp.create({
					emailAddress: data.email,
					password: data.password,
					firstName: data.firstName,
					lastName: data.lastName,
				});

				if (result.status === "missing_requirements") {
					// Email verification required
					await signUp.prepareEmailAddressVerification({
						strategy: "email_code",
					});
					router.push("/(auth)/verify-email");
				} else if (result.status === "complete") {
					await setActiveSignUp({ session: result.createdSessionId });
					router.replace("/(tabs)");
				}
			} catch (err: unknown) {
				console.error(err);

				if (isClerkAPIResponseError(err)) {
					setError({
						message:
							err.errors?.[0]?.message ||
							"Failed to create account. Please try again.",
						code: err.errors?.[0]?.code || "SIGNUP_ERROR",
					});
				} else {
					setError({
						message: "Failed to create account. Please try again.",
						code: "SIGNUP_ERROR",
					});
				}
			} finally {
				setIsLoading(false);
			}
		},
		[signUp, setActiveSignUp],
	);

	// Send the password reset email with a 6-digit code
	const sendPasswordResetEmail = useCallback(
		async (data: ForgotPasswordData) => {
			if (!signIn) return;

			setIsLoading(true);
			setError(null);

			try {
				await signIn
					.create({
						strategy: "reset_password_email_code",
						identifier: data.email,
					})
					.then((_) => {
						setError(null);
					})
					.catch((err) => {
						console.error("error", err.errors[0].longMessage);
						setError(err.errors[0].longMessage);
					});
			} catch (err: unknown) {
				console.error(err);

				if (isClerkAPIResponseError(err)) {
					setError({
						message:
							err.errors?.[0]?.message ||
							"Failed to send reset email. Please try again.",
						code: err.errors?.[0]?.code || "RESET_ERROR",
					});
				} else {
					setError({
						message: "Failed to send reset email. Please try again.",
						code: "RESET_ERROR",
					});
				}
			} finally {
				setIsLoading(false);
			}
		},
		[signIn],
	);

	// Reset the user's password
	// Upon successful reset, the user will be signed in and redirected to the home page
	const resetPasswordWithCode = useCallback(
		async (data: ResetPasswordData) => {
			if (!signUp) return;

			setIsLoading(true);
			setError(null);

			await signIn
				?.attemptFirstFactor({
					strategy: "reset_password_email_code",
					code: data.code,
					password: data.password,
				})
				.then((result) => {
					// Check if 2FA is required
					if (result.status === "needs_second_factor") {
						setSecondFactor(true);
						setError(null);
					} else if (result.status === "complete") {
						// Set the active session to
						// the newly created session (user is now signed in)
						setActive({ session: result.createdSessionId });
						setError(null);
					} else {
						console.log(JSON.stringify(result, null, 2));
					}
				})
				.catch((err) => {
					console.error("error", err.errors[0].longMessage);
					setError({
						message:
							err.errors?.[0]?.message ||
							"Invalid verification code. Please try again.",
						code: err.errors?.[0]?.code || "VERIFICATION_ERROR",
					});
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		[setActive, signIn?.attemptFirstFactor, signUp],
	);

	return {
		...clerkAuthData,
		error,
		isLoading,
		clearError,
		secondFactor,
		signIn: handleSignIn,
		signUp: handleSignUp,
		sendPasswordResetEmail,
		resetPasswordWithCode,
		signOut: handleSignOut,
	} as const;
}
