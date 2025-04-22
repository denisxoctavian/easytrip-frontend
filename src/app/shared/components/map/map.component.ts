import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';


import '@maptiler/sdk/dist/maptiler-sdk.css';
import { DestinationsService } from '../../services/destinations.service';


@Component({
  selector: 'app-map',
  imports:[],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})

export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private destinationService = inject(DestinationsService);
  
  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = 'Ub3uHtMkgCWlP4xWId0g';
  }

  ngAfterViewInit() {
    let lat, lon;
    
    this.destinationService.getDestinationXandY('Romania').subscribe({
      next: (result)=>{
        console.log(result)
        if(result.length > 0){
           lat = +result[0].lat;
           lon = +result[0].lon;
           this.map = new Map({
            container: this.mapContainer.nativeElement,
            style: MapStyle.STREETS,
            center: [lon, lat],
            zoom: 6
          });
          new Marker({color: "#FF0000"})
          .setLngLat([lat,lon])
          .addTo(this.map);
        }
      }
    })

   
  }

  ngOnDestroy() {
    this.map?.remove();
  }

}

