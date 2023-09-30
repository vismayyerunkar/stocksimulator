import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-goal-report',
  templateUrl: './goal-report.component.html',
  styleUrls: ['./goal-report.component.scss'],
})
export class GoalReportComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Goal Created Succesfully',
      detail: '43,546.00',
    });
  }

  ngOnInit(): void {}
}
