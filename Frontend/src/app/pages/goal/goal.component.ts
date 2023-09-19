import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
})
export class GoalComponent implements OnInit {
  riskPercentage: number = 50; // Initialize the risk percentage
  riskMeterWidth: number = 0; // Width of the risk meter fill
  isDragging: boolean = false;
  checked: boolean = false;
  formGroup: FormGroup | undefined;
  value1: number = 42723;
  value2: number = 43546;
  value3: number = 23;
  cities: City[] | undefined;
  selectedCity: City | undefined;

  constructor(private messageService: MessageService) {}

  value4: number = 50;
  startDragging(event: MouseEvent) {
    this.isDragging = true;
    this.updateRiskMeterWidth(event);
  }

  stopDragging() {
    this.isDragging = false;
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Goal Added',
      detail: 'Richin',
    });
  }
  updateRiskMeterWidth(event: MouseEvent) {
    if (this.isDragging) {
      const containerRect = document
        .querySelector('.risk-meter-bar')
        ?.getBoundingClientRect();
      if (containerRect) {
        const mouseX = event.clientX - containerRect.left;
        const maxWidth = containerRect.width;
        const newWidth = Math.min(maxWidth, Math.max(0, mouseX));
        this.riskMeterWidth = (newWidth / maxWidth) * 100;
        this.riskPercentage = Math.round((newWidth / maxWidth) * 100);
      }
    }
  }

  goalPeriodOptions: SelectItem[] = [
    { label: '6 Months', value: 1 },
    { label: '1 Year', value: 2 },
    { label: '2 Year', value: 3 },
    { label: '3 Year', value: 4 },
    { label: '4 Year', value: 5 },
    { label: '5 Year', value: 6 },
    { label: '6 Year', value: 7 },
    { label: '7 Year', value: 8 },
  ];

  selectedGoalPeriod: number | null = null;

  ngOnInit(): void {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null),
    });
  }
}
