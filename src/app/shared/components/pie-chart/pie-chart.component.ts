import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Todo } from '../../models/todo';
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() completedTodos: number;
  @Input() notCompletedTodos: number;

  public chart;
  private chartDate;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initChartData();
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.completedTodos && !changes.completedTodos.firstChange) ||
      (changes.notCompletedTodos && !changes.notCompletedTodos.firstChange)
    ) {
      this.updateChartData(this.completedTodos, this.notCompletedTodos);
    }
  }

  private initChartData() {
    this.chartDate = {
      labels: ['Not completed todo', 'Completed todo'],
      datasets: [
        {
          label: 'My Todo list',
          data: [this.completedTodos || 0, this.notCompletedTodos || 0],
          backgroundColor: ['#97A4FA', '#FF964D'],
          hoverOffset: 4,
        },
      ],
    };
  }

  private initChart() {
    this.chart = new Chart('pie-chart', {
      type: 'doughnut',
      data: this.chartDate,
    });
  }

  private updateChartData(completed: number, notCompleted: number) {
    this.chart.data.datasets[0].data[0] = completed || 0;
    this.chart.data.datasets[0].data[1] = notCompleted || 0;
    this.chart.update();
  }
}
