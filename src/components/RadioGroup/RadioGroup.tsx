import { createSignal, For, onMount, Show, splitProps } from "solid-js";

type Rule = { message: string; validator: (value: string) => boolean };

type RadioOption = {
	label: string;
	value: string;
};

type RadioGroupProps = {
	label: string;
	name: string;
	options: RadioOption[];
	required?: boolean;
	value?: string;
	rules?: Rule[];
};

export const RadioGroup = (props: RadioGroupProps) => {
	let ref: HTMLFieldSetElement | undefined;

	const [local, rest] = splitProps(props, ["rules"]);
	const [value, setValue] = createSignal(props.value ?? "");

	onMount(() => {
		if (ref && local.rules) {
			for (const rule of local.rules) {
				validate(rule, ref, value());
			}
		}
	});

	function validate(rule: Rule, fieldset: HTMLFieldSetElement, value: string) {
		const valid = rule.validator(value);
		const input = fieldset.querySelector("input");
		input?.setCustomValidity(valid ? "" : rule.message);
		return valid;
	}

	return (
		<div class="field">
			<fieldset ref={ref}>
				<legend>{props.label}</legend>

				<div class="grid">
					<For each={props.options}>
						{(option) => (
							<label class="radio-button">
								<input
									name={props.name}
									type="radio"
									value={option.value}
									checked={props.value === option.value}
									required={props.required}
									onChange={(e) => {
										setValue(e.currentTarget.value);
									}}
								/>
								{option.label}
							</label>
						)}
					</For>

					<Show when={local.rules && local.rules.length > 0}>
						<ul class="errors" data-name={rest.name}>
							<For each={local.rules}>
								{(rule) => (
									<Show
										when={ref && !validate(rule, ref, props.value ?? value())}
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
			</fieldset>
		</div>
	);
};
