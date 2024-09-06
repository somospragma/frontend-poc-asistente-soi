// question.service.ts
import { Injectable, signal } from '@angular/core';
import { Request } from '@core/interfaces/question.interface';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user/user.service';

@Injectable({
	providedIn: 'root'
})
export class QuestionService {
	user = signal<User | null>(null);
	constructor(private userService: UserService) {
		this.user.set(this.userService.getUser());
	}

	getDefaultQuestions(): Request[] {
		this.user.set(this.userService.getUser());
		return [
			{
				user_id: this.user()?.documentNumber || '',
				session_id: this.user()?.sessionId || '',
				prompt: 'Quiero modificar mi planilla como independiente'
			},
			{
				user_id: this.user()?.documentNumber || '',
				session_id: this.user()?.sessionId || '',
				prompt: 'Quiero reportar una novedad cómo independiente'
			},
			{
				user_id: this.user()?.documentNumber || '',
				session_id: this.user()?.sessionId || '',
				prompt: 'Quiero pagar mis aportes vencidos cómo independiente'
			}
		];
	}

	setUser(user: User): void {
		this.user.set(user);
	}
}
