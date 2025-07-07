import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import {
	type DefaultValues,
	type UseFormReturn,
	useForm,
} from "react-hook-form";
import type { ZodType } from "zod/v4";
import type {
	EmailVerificationFormData,
	ForgotPasswordFormData,
	LoginFormData,
	SignupFormData,
} from "~/types/auth";

type AuthFormData =
	| LoginFormData
	| SignupFormData
	| ForgotPasswordFormData
	| EmailVerificationFormData;

interface UseAuthFormProps<T extends AuthFormData> {
	// biome-ignore lint/suspicious/noExplicitAny: ZodType requires any for generic type parameters
	schema: ZodType<T, any, any>;
	onSubmit: (data: T) => Promise<void>;
	defaultValues?: DefaultValues<T>;
}

interface UseAuthFormReturn<T extends AuthFormData>
	extends Omit<UseFormReturn<T>, "handleSubmit"> {
	handleSubmit: () => void;
}

export function useAuthForm<T extends AuthFormData>({
	schema,
	onSubmit,
	defaultValues,
}: UseAuthFormProps<T>): UseAuthFormReturn<T> {
	const form = useForm<T>({
		defaultValues,
		mode: "onSubmit",
		resolver: zodResolver(schema),
	});

	const { handleSubmit: rhfHandleSubmit } = form;

	const handleSubmit = useCallback(() => {
		rhfHandleSubmit(async (data) => {
			try {
				await onSubmit(data);
			} catch (error) {
				// Error handling is done in the onSubmit function
				console.error("Form submission error:", error);
			}
		})();
	}, [rhfHandleSubmit, onSubmit]);

	return { ...form, handleSubmit };
}
