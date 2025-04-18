import type { JSX } from "solid-js/jsx-runtime";
import {
	createUniqueId,
	splitProps,
	For,
	Show,
	createSignal,
	onMount,
} from "solid-js";

type Rule = { message: string; validator: (value: string) => boolean };

type TextAreaProps = Omit<
	JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
	"value"
> & {
	label: string;
	name: string;
	value?: string;
	rules?: Rule[];
};

export const Textarea = (props: TextAreaProps) => {
	const [local, rest] = splitProps(props, [
		"label",
		"rules",
		"ref",
		"value",
		"onInput",
		"onInvalid",
	]);

	let ref: HTMLTextAreaElement | undefined;
	const id = createUniqueId();
	const [value, setValue] = createSignal(local.value ?? "");

	onMount(() => {
		if (ref && local.rules) {
			for (const rule of local.rules) {
				validate(rule, ref, value());
			}
		}
	});

	function validate(rule: Rule, input: HTMLTextAreaElement, value: string) {
		const valid = rule.validator(value);
		input.setCustomValidity(valid ? "" : rule.message);
		return valid;
	}

	return (
		<div class="field">
			<label for={id}>{local.label}</label>
			<textarea
				id={id}
				ref={(element) => {
					ref = element;

					if (typeof local.ref === "function") {
						local.ref(element);
					}
				}}
				value={local.value ?? value()}
				onInvalid={(e) => {
					if (typeof local.onInvalid === "function") {
						local.onInvalid(e);
					}
				}}
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
							<Show when={ref && !validate(rule, ref, local.value ?? value())}>
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
