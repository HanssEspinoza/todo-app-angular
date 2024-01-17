import { Injectable, computed, signal } from '@angular/core';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Signal privada
  #_tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar Angular CLI',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear Proyecto con ng new',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear componente con ng g c',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear servicio con ng g s',
      completed: false,
    },
  ]);
  // Signal para el mundo
  tasks = computed(() => this.#_tasks());

  filter = signal<'all' | 'pending' | 'completed'>('all');

  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.#_tasks();

    if(filter === 'pending') {
      return tasks.filter((task) => !task.completed)
    }

    if(filter === 'completed') {
      return tasks.filter((task) => task.completed)
    }

    return tasks;
  })

  createTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    this.#_tasks.update((task) => [...task, newTask]);
  }

  deleteTask(index: number): void {
    this.#_tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }

  updateTask(index: number): void {
    this.#_tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }

        return task;
      })
    })
  }

  editionModeActivate(index: number): void {
    this.#_tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }

        return {
          ...task,
          editing: false,
        };
      })
    })
  }

  updateTaskTitle(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;

    this.#_tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          }
        }

        return task;
      })
    })
  }
}
