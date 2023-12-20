import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const useRequestEditTodo = (newTitleTodo) => {
	const [isEditing, setIsEditing] = useState(false);

	const requestEditTodo = (id) => {
		setIsEditing(true);

		const todoEditDbRef = ref(db, `todos/${id}`);
		update(todoEditDbRef, {
			title: newTitleTodo,
		})
			.then((response) => {
				console.log('Дело изменено, ответ сервера:', response);
			})
			.finally(() => {
				setIsEditing(false);
			});
	};

	return {
		isEditing,
		requestEditTodo,
	};
};
