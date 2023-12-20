import { useEffect, useState } from 'react';
import { ref, onValue, query, orderByChild, startAt, endAt } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodo = (debouncedSearchTodo, setSortTodoFlag) => {
	const [todos, setTodos] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const todosDbRef = query(
			ref(db, 'todos'),
			orderByChild('title'),
			startAt(debouncedSearchTodo),
			endAt(debouncedSearchTodo + '\uf8ff'),
		);

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};

			setTodos(loadedTodos);
			setIsLoading(false);
			setSortTodoFlag(false);
		});
	}, [debouncedSearchTodo, setSortTodoFlag]);
	return {
		todos,
		isLoading,
		setTodos,
	};
};
