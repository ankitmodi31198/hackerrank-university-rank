# Universities By Rank

## API to hit

*JSON API URL :*
`https://jsonmock.hackerrank.com/api/universities?rank_display={rank}`

## Expected Output when results found

`<li>{university}</li>` inside `<ul data-test-id="universitiesList"></ul>`

## Expected Output when No results found

In case of no results, render below div
`<div data-test-id="no-result">No Results Found</div>`

## Environment 

- Angular CLI Version: 15.2.8
- Angular Core Version: 15.2.8
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/PHnuYfNhF_fYgmAcQnfyiQ/univeristiesByRank.gif)

## Functionality Requirements

The component must have the following functionalities:

- The input should initially be empty. The user can type a rank into this input box to search for universities holding this rank. 

- Clicking on the `Search` button should make an API GET call to the URL `https://jsonmock.hackerrank.com/api/universities?rank_display={rank}` using the Angular HttpClient module. Here, `{rank}` is the rank entered into the text box. For example, for the number 8, the API hit has to be `https://jsonmock.hackerrank.com/api/universities?rank_display=8`.

- The response contains a `data` field, where data is an array of objects, and each object is a university record.  A sample data field for rank 8 is below:

```
  "data": [
    {
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
    }
  ]
```
- Each university record contains a university field. Retrieve all the university names from the response and, for each record, display the university name as `<li>{university}</li>` inside `<ul data-test-id="universitiesList"></ul>`, in the order they appear in the `data` field.

- If there are no universities returned for the rank by the API, you must render `<div data-test-id="no-result">No Results Found</div>` instead, and this element must be visible only when the data field is an empty array. This div should not be rendered initially since no API has been hit yet.

- Please note that the input field accepts only numbers. Test cases take care of calling the API with valid input, so writing input validation is not required.

## Testing Requirements

The following data-test-id attributes are required in the component for the tests to pass:

- The input should have the data-test-id attribute `app-input`.

- The `Search` button should have the data-test-id attribute `submit-button`.

- The `<ul>` should have the data-test-id attribute `universities-list`.

- The `No Results Found` div should have the data-test-id attribute `no-result`.

## Project Specifications

**Read Only Files**
- src/app/universities-by-rank/universities-by-rank.component.spec.ts

**Commands**
- run: 
```bash
 npm start
```
- install: 
```bash
 npm install
```
- test: 
```bash
 npm test
```
