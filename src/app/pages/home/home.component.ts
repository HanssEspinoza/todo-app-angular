import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar Angular CLI',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear Proyecto con ng new',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear componente con ng g c',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear servicio con ng g s',
      completed: false
    },
  ])

  changeHandler(event: Event):void {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;

    this.addTask(newTask);
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    }

    this.tasks.update((task) => [...task, newTask]);
  }

  deleteTask(index: number): void {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index))
  }

  updateTask(index: number): void {
    this.tasks.update((tasks) => {
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
