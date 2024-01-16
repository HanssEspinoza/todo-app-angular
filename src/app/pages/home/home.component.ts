import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ],
  })

  color = signal('red');

  tasksService = inject(TaskService);

  changeHandler():void {
    // const input = event.target as HTMLInputElement;
    // const newTask = input.value;

    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
        this.color.set('blue');
      }
    }
  }

  addTask(title: string): void {
    this.tasksService.createTask(title);
  }

  deleteTask(index: number): void {
    this.tasksService.deleteTask(index);
    this.color.set('#000000');
  }

  updateTask(index: number): void {
    this.tasksService.updateTask(index);
    this.color.set('#8E44AD');
  }
}
