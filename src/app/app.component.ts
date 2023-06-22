import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '@core/services/performance.service';

const MAX_ALLOWED_NODES = 300;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _performanceService: PerformanceService) {}

  ngOnInit(): void {
    // DO NOT TOUCH
    this._performanceService.getNodeCount().subscribe((nodeCount) => {
      if (nodeCount > MAX_ALLOWED_NODES) {
        console.error(
          `The test is a failure, the number of nodes cannot exceed ${MAX_ALLOWED_NODES}`
        );
      }
    });
  }
}
