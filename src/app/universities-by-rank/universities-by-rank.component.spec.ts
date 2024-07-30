import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {UniversitiesByRankComponent} from './universities-by-rank.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, Type} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('UniversitiesByRankComponent', () => {
  let component: UniversitiesByRankComponent;
  let fixture: ComponentFixture<UniversitiesByRankComponent>;
  let input;
  let searchBtn;
  let compiled;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const pushValue = async (value) => {
    input.value = value;
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input'));
    searchBtn.click();
    await fixture.whenStable();
  };

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [UniversitiesByRankComponent],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(UniversitiesByRankComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitiesByRankComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    injector = getTestBed();
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    input = getByTestId('app-input');
    searchBtn = getByTestId('submit-button');
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should render the Initial UI', async () => {
    expect(input.value.trim()).toBeFalsy();
    expect(searchBtn.innerHTML).toBe('Search');
    expect(getByTestId('no-result')).toBeNull();
    expect(getByTestId('universities-list')).toBeNull();
  });

  it('Should show No Results Found when there are no results from API', async () => {
    await pushValue(200);
    await fixture.whenStable();

    const url = 'https://jsonmock.hackerrank.com/api/universities?rank_display=200';
    let req = httpMock.expectOne(url);
    req.flush({page: 1, per_page: 10, total: 0, total_pages: 0, data: []});
    expect(req.request.url).toBe(url);

    await fixture.detectChanges();
    await fixture.whenStable();

    expect(getByTestId('universities-list')).toBeNull();
    expect(getByTestId('no-result')).toBeTruthy();
    expect(getByTestId('no-result').innerHTML.trim()).toEqual('No Results Found');
  });

  it('Should search and render the results correctly - 1', async () => {
    await pushValue(3);
    await fixture.whenStable();

    const url = 'https://jsonmock.hackerrank.com/api/universities?rank_display=3';
    let req = httpMock.expectOne(url);
    req.flush({
      page: 1,
      per_page: 10,
      total: 0,
      total_pages: 0,
      data: [{
        "university": "Stanford University",
        "rank_display": "3",
        "score": 98.7,
        "type": "Private",
        "student_faculty_ratio": 3,
        "international_students": "3,879",
        "faculty_count": "4,725",
        "location": {
          "city": "Stanford",
          "country": "United States",
          "region": "North America"
        }
      },
      {
        "university": "University of Cambridge",
        "rank_display": "3",
        "score": 98.7,
        "type": "Public",
        "student_faculty_ratio": 4,
        "international_students": "7,925",
        "faculty_count": "5,800",
        "location": {
          "city": "Cambridge",
          "country": "United Kingdom",
          "region": "Europe"
        }
      }]
    });
    expect(req.request.url).toBe(url);

    await fixture.detectChanges();
    await fixture.whenStable();

    const universitiesList = getByTestId('universities-list');
    expect(universitiesList.children.length).toEqual(2);
    expect(universitiesList.children[0].innerHTML.trim()).toEqual('Stanford University');
    expect(universitiesList.children[1].innerHTML.trim()).toEqual('University of Cambridge');
    expect(getByTestId('no-result')).toBeNull();
  });

  it('Should search and render results correctly - 2', async () => {
    await pushValue(8);
    await fixture.whenStable();

    const url = 'https://jsonmock.hackerrank.com/api/universities?rank_display=8';
    let req = httpMock.expectOne(url);
    req.flush({
      page: 1,
      per_page: 10,
      total: 0,
      total_pages: 0,
      data: [{
        "university": "ETH Zurich - Swiss Federal Institute of Technology",
        "rank_display": "8",
        "score": 95.4,
        "type": "Public",
        "student_faculty_ratio": 7,
        "international_students": "7,733",
        "faculty_count": "2,719",
        "location": {
          "city": "Z\u00FCrich",
          "country": "Switzerland",
          "region": "Europe"
        }
      },
      {
        "university": "UCL",
        "rank_display": "8",
        "score": 95.4,
        "type": "Public",
        "student_faculty_ratio": 5,
        "international_students": "21,824",
        "faculty_count": "7,195",
        "location": {
          "city": "London",
          "country": "United Kingdom",
          "region": "Europe"
        }
      },
      {
        "university": "University of Chicago",
        "rank_display": "8",
        "score": 95.4,
        "type": "Private",
        "student_faculty_ratio": 6,
        "international_students": "4,696",
        "faculty_count": "2,703",
        "location": {
          "city": "Chicago",
          "country": "United States",
          "region": "North America"
        }
      }]
    });
    expect(req.request.url).toBe(url);

    await fixture.detectChanges();
    await fixture.whenStable();

    const universitiesList = getByTestId('universities-list');
    expect(universitiesList.children.length).toEqual(3);
    expect(universitiesList.children[0].innerHTML.trim()).toEqual('ETH Zurich - Swiss Federal Institute of Technology');
    expect(universitiesList.children[1].innerHTML.trim()).toEqual('UCL');
    expect(universitiesList.children[2].innerHTML.trim()).toEqual('University of Chicago');
    expect(getByTestId('no-result')).toBeNull();
  });
});
