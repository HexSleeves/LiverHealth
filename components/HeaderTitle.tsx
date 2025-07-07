import { Text } from "~/components/ui/text";

export const HeaderTitle = ({ children }: { children: string }) => (
	<Text className="text-xl font-semibold">{toOptions(children)}</Text>
);

export function toOptions(name: string) {
	const title = name
		.split("-")
		.map((str: string) => str.replace(/\b\w/g, (char) => char.toUpperCase()))
		.join(" ");
	return title;
}
