import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TextService {
	formatText(text: string): string {
		const formattedText = text.replace(/\n/g, '<br>');
		return formattedText;
	}
}
