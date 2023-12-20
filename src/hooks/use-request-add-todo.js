import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTodo = () => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = () => {
		setIsCreating(true);

		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: 'новое дело',
			completed: 'false',
		})
			.then((response) => {
				console.log('Добавлено новое дело, ответ сервера:', response);
			})
			.finally(() => setIsCreating(false));
	};

	return {
		isCreating,
		requestAddTodo,
	};
};
