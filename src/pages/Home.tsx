import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.some(task => task.title === newTaskTitle);

    if(taskAlreadyExists) {
      return Alert.alert("Task já cadastrada!", "Você não pode cadastrar uma task com o mesmo nome")
    }

    setTasks(oldTasks => [...oldTasks, {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    }]);
  };

  function handleToggleTaskDone(id: number) {
    setTasks(oldTasks => oldTasks.map(task => {
      if(task.id === id) {
        return {
          ...task,
          done: !task.done
        }
      } else {
        return task
      }
    }))
  }

  function handleEditTask(id: number, newValue: string) {
    setTasks(oldTasks => oldTasks.map(task => {
      if(task.id === id) {
        return {
          ...task,
          title: newValue
        }
      } else {
        return task
      }
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que vocẽ deseja remover esse item?",[
      {
        text: 'Não'
      },
      {
        text: 'Sim',
        onPress: () => setTasks(oldTasks => (oldTasks.filter(task => task.id !== id)))
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})