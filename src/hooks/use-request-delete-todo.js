import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const requestDeleteTodo = (id) => {
		setIsDeleting(true);

		const todoDeleteDbRef = ref(db, `todos/${id}`);

		remove(todoDeleteDbRef)
			.then((response) => {
				console.log('Дело удалено, ответ сервера:', response);
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		isDeleting,
		requestDeleteTodo,
	};
};
