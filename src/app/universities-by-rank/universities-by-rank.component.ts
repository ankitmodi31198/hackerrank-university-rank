import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-universities-by-rank',
  templateUrl: './universities-by-rank.component.html',
  styleUrls: ['./universities-by-rank.component.scss']
})

export class UniversitiesByRankComponent implements OnInit {

  universityRank: number = null;

  universitiesList: University[] = null;

  // shouldShowNoResultFound: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  searchClickHandler() {
    if (this.universityRank != null || this.universityRank != undefined) {
      this.http.get('https://jsonmock.hackerrank.com/api/universities?rank_display=' + this.universityRank)
        .pipe(take(1))
        .subscribe((response: ApiResponse) => {
          if (response.data?.length) {
            this.universitiesList = response.data;
          } else {
            this.universitiesList = [];
            // this.shouldShowNoResultFound = true;
          }
          this.universityRank = null;
        })
    } else {
      this.universitiesList = [];
      // this.shouldShowNoResultFound = true;
    }
  }
}

export interface University {
  university: string;
  rank_display: string;
  score: number;
  type: string;
  student_faculty_ratio: number;
  international_students: string;
  faculty_count: string;
  location: {
    city: string;
    country: string;
    region: string
  }
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: University[];
}
