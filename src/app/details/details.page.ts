import { EventsService } from './../events.service';
import { EventResponse, EmergenyEvent, Acknowledgement } from './../interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  eventId: number;
  eventResponse: EventResponse;
  event: EmergenyEvent;
  acknowledgments: Acknowledgement[] = [];
  newNote = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService
  ) { }

  async ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    this.eventId = +this.route.snapshot.params['eventId'];
    this.eventResponse = await this.eventService.getById(this.eventId).toPromise();
    this.event = this.eventResponse.event;
    this.acknowledgments = await this.eventService.getAcknowledgements(this.eventResponse).toPromise();
  }

}
