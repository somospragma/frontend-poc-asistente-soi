import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'a-custom-input-text',
	standalone: true,
	imports: [],
	templateUrl: './a-custom-input-text.component.html',
	styleUrl: './a-custom-input-text.component.scss'
})
export class ACustomInputTextComponent {
	@Input() disableInput = false;
	@Output() debouncedInput = new EventEmitter<string>();
	@Output() inputChanged = new EventEmitter<boolean>();

	@ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;
	private inputSubject = new Subject<string>();
	public currentValue = '';
	private isResetting = false; // Nueva bandera

	onInputChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.inputSubject.next(input.value);
		this.currentValue = input.value;
		if (!this.isResetting) {
			this.autoResize();
		} else {
			this.isResetting = false;
		}
		if (this.currentValue.length <= 0) {
			this.inputChanged.emit(false);
		} else {
			this.inputChanged.emit(true);
		}
	}

	onKeyDown(event: KeyboardEvent): void {
		const input = event.target as HTMLInputElement;
		if (event.key === 'Enter' && input.value.trim()) {
			this.debouncedInput.emit(input.value);
			this.clearInput(input);
			this.focusInput();
			this.resetHeight();
		}
	}

	clearInput(input: HTMLInputElement): void {
		input.value = '';
		this.currentValue = '';
		this.inputSubject.next('');
		this.inputChanged.emit(false);
	}

	clearInputValue(): void {
		this.textInput.nativeElement.value = '';
		this.currentValue = '';
		this.inputSubject.next('');
		this.inputChanged.emit(false);
	}

	focusInput(): void {
		if (this.textInput) {
			this.textInput.nativeElement.focus();
		}
	}

	autoResize() {
		const textArea = this.textInput.nativeElement;
		textArea.style.height = 'auto';
		textArea.style.height = `${textArea.scrollHeight}px`;
	}

	resetHeight() {
		this.isResetting = true;
		const textArea = this.textInput.nativeElement;
		textArea.style.height = 'auto';
		textArea.style.height = `${64}px`;
		textArea.style.overflow = 'hidden';
	}
}
