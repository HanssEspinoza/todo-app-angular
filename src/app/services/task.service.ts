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
}
