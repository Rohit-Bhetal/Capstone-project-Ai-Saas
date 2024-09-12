import Image from "next/image";

export const Loader = () => {
	return (
		<div className="h-full flex flex-col gap-y-4 items-center justify-center">
			<div className="w-10 h-10 relative animate-spin">
				<Image alt="Logo" src="/icon.svg" fill className="bg-[#a80024] rounded-3xl p-2" />
			</div>
			<p className="text-muted-foreground text-sm">AetherAi is thinking...</p>
		</div>
	);
};