import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasksService = inject(TaskService);

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
    this.tasksService.createTask(title);
  }

  deleteTask(index: number): void {
    this.tasksService.deleteTask(index);
  }

  updateTask(index: number): void {
    this.tasksService.updateTask(index);
  }
}
