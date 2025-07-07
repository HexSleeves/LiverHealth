import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type Path,
	type PathValue,
	type UseFormClearErrors,
	type UseFormRegister,
	type UseFormReset,
	type UseFormSetError,
	type UseFormSetValue,
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

interface UseAuthFormReturn<T extends AuthFormData> {
	control: Control<T>;

	formState: {
		errors: FieldErrors<T>;
		isSubmitting: boolean;
		isValid: boolean;
	};

	reset: UseFormReset<T>;
	handleSubmit: () => void;
	register: UseFormRegister<T>;
	setValue: UseFormSetValue<T>;
	setError: UseFormSetError<T>;
	clearErrors: UseFormClearErrors<T>;
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

	const {
		reset,
		control,
		setValue,
		formState,
		clearErrors,
		setError,
		register,
		handleSubmit: rhfHandleSubmit,
	} = form;

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

	return {
		reset,
		control,
		register,
		handleSubmit,
		clearErrors,
		setError,
		setValue: (name: Path<T>, value: PathValue<T, Path<T>>) =>
			setValue(name, value),
		formState: {
			errors: formState.errors,
			isSubmitting: formState.isSubmitting,
			isValid: formState.isValid,
		},
	};
}
