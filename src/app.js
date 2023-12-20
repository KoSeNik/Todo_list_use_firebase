import { useState } from 'react';
import styles from './app.module.css';
import { useRequestGetTodo, useRequestAddTodo } from './hooks';
import { TodoItem } from './todoItem';
import { useDebounce } from '@uidotdev/usehooks';

export const App = () => {
	const [searchTodo, setSearchTodo] = useState('');
	const debouncedSearchTodo = useDebounce(searchTodo, 1000);

	const [sortTodoFlag, setSortTodoFlag] = useState(false);

	const { todos, setTodos, isLoading } = useRequestGetTodo(
		debouncedSearchTodo,
		setSortTodoFlag,
	);
	const { isCreating, requestAddTodo } = useRequestAddTodo();

	const handleSearch = (event) => {
		setSearchTodo(event.currentTarget.value);
	};

	const sortTodo = () => {
		const copyData = { ...todos };
		const sortData = Object.entries(copyData).sort((a, b) =>
			a[1].title.localeCompare(b[1].title),
		);
		setSortTodoFlag(true);

		setTodos(Object.fromEntries(sortData));
	};

	return (
		<div className={styles.app}>
			<div>Список дел</div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				Object.entries(todos).map(([id, todo]) => (
					<TodoItem key={id} {...todo} id={id} />
				))
			)}
			<button
				disabled={isCreating}
				onClick={requestAddTodo}
				className={styles.button}
			>
				Добавить дело
			</button>
			<input value={searchTodo} onChange={handleSearch} placeholder="Поиск дела" />
			<button
				onClick={sortTodo}
				className={`${styles.button} ${sortTodoFlag ? styles.buttonPressed : ''}`}
			>
				Сортировка дел по алфавиту
			</button>
		</div>
	);
};
