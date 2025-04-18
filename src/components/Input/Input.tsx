import type { JSX } from "solid-js/jsx-runtime";
import {
	createUniqueId,
	splitProps,
	For,
	Show,
	createSignal,
	onMount,
} from "solid-js";

type Rule = { message: string } & (
	| {
			validator: (value: string) => boolean;
			type?: "string";
	  }
	| {
			validator: (value: number) => boolean;
			type: "number";
	  }
	| {
			validator: (value: Date | null) => boolean;
			type: "date";
	  }
);

type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "value"> & {
	label: string;
	name: string;
	value?: string | number;
	type:
		| "date"
		| "datetime-local"
		| "email"
		| "month"
		| "number"
		| "password"
		| "search"
		| "tel"
		| "text"
		| "time"
		| "url"
		| "week";
	rules?: Rule[];
};

export const Input = (props: InputProps) => {
	const [local, rest] = splitProps(props, [
		"label",
		"rules",
		"ref",
		"value",
		"onInput",
	]);

	let ref: HTMLInputElement | undefined;
	const id = createUniqueId();
	const [value, setValue] = createSignal(local.value?.toString() ?? "");

	onMount(() => {
		if (ref && local.rules) {
			for (const rule of local.rules) {
				validate(rule, ref, value());
			}
		}
	});

	function validate(rule: Rule, input: HTMLInputElement, value: string) {
		switch (rule.type) {
			case "date": {
				const valid = rule.validator(new Date(value));
				input.setCustomValidity(valid ? "" : rule.message);
				return valid;
			}

			case "number": {
				const valid = rule.validator(Number(value));
				input.setCustomValidity(valid ? "" : rule.message);
				return valid;
			}

			default: {
				const valid = rule.validator(value);
				input.setCustomValidity(valid ? "" : rule.message);
				return valid;
			}
		}
	}

	return (
		<div class="field">
			<label for={id}>{local.label}</label>
			<input
				id={id}
				ref={(element) => {
					ref = element;

					if (typeof local.ref === "function") {
						local.ref(element);
					}
				}}
				value={local.value ?? value()}
				onInput={(e) => {
					setValue(e.currentTarget.value);

					if (typeof local.onInput === "function") {
						local.onInput(e);
					}
				}}
				{...rest}
			/>

			<Show when={local.rules && local.rules.length > 0}>
				<ul class="errors" data-name={rest.name}>
					<For each={local.rules}>
						{(rule) => (
							<Show
								when={
									ref &&
									!validate(rule, ref, local.value?.toString() ?? value())
								}
							>
								<li>
									<span aria-live="polite">{rule.message}</span>
								</li>
							</Show>
						)}
					</For>
				</ul>
			</Show>
		</div>
	);
};
