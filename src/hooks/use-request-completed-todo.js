import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const useRequestCompletedTodo = () => {
	const [isCompleted, setIsCompleted] = useState(false);
	const requestCompletedTodo = (id) => {
		setIsCompleted(true);

		const todoDbRef = ref(db, `todos/${id}`);
		update(todoDbRef, {
			completed: 'true',
		})
			.then((response) => {
				console.log('Дело сделано, ответ сервера:', response);
			})
			.finally(() => setIsCompleted(false));
	};

	return {
		isCompleted,
		requestCompletedTodo,
	};
};
