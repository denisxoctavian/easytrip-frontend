import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Section } from '../../models/deals';
import { Deal } from '../../models/deals';
import { DealService } from '../../shared/services/deals.service';


@Component({
  selector: 'app-deals',
  imports: [MatCardModule],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss'
})


export class DealsComponent implements OnInit {
  private dealService = inject(DealService);
  deals: Deal[] = [];
  sections: Section[] = [];

  ngOnInit(): void {
    this.dealService.getDeals().subscribe({
      next: (res)=>{
        this.deals = res;
        this.sections = [
          {
            title: "Best Deals",
            deals: this.deals
          }
        ];
      }
    })
  }


}
