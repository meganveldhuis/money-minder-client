# Budget App

## Overview

What is your app? Give a brief description in a couple of sentences.

### Problem Space

I've never found a budget app or spreadsheet that is perfect. I want the option to add expenses offline, have separate trip expenses, and currencies.

### User Profile

- Users who are looking for a place to budget and track cash.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

## Implementation

### Tech Stack

- React
- JavaScript
- Scss
- MySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
  - react-router-dom
- Server libraries:
  - express
  - knex

### APIs

No external APIs are used.

### Sitemap

- _Overview/Summary Page_ : This page will have some different representations of the data. It will include a PI Chart, table, info cards, etc. Anything that gives an idea of budgeting progress at a glance.
- _Add Entry Page_ : This will be a page or sidebar with a form to input either an Income or an Expense line.
- _Expenses Page_ : Table of all expense items. Filters at the top for year, month, category, etc.
- _Income Page_ : Table of all income items. Filters at the top for year, month, category, etc.
- _Budget Page_ : View and edit all budget items
- _Settings Page_: Page to put the ugly stuff: to download data to csv file, dark/light themes, editing or adding categories, etc.

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

![Diagram showing the SQL tables and their relationships](sql-diagram.png)

### Endpoints

1. Expenses Routes (`http:localhost:8080/expense`)

- `get` all expense records
- `get` expense by id
- `post` new expense record
- `patch` edit expense record
- `delete` expense record

2. Income Routes (`http:localhost:8080/income`)

- `get` all income records
- `get` income by id
- `post` new income record
- `patch` edit income record
- `delete` income record

3. Categories Routes (`http:localhost:8080/category`)

- `get` all Expense categories
- `get` all Income categories
- `get` category by id
- `post` new category
- `delete` category

4. Budget Routes (`http:localhost:8080/budget`)

- `get` all budget lines
- `post` new budget line
- `patch` edit budget line
- `delete` budget line

5. Currency Routes (`http:localhost:8080/currency`)

- `get` all currency codes

6. Trips Routes

## Roadmap

### Back-End

_Goal: done by Feb 14th_

- [ ] set up all tables
- [ ] seed initial data
- [ ] set up all base routes/endpoints
- [ ] test they all work as expected

### Front-End

(MVP)

- [ ] Functionality: _Goal: done by Feb 18th_
  - [ ] Summary/Overview Page
  - [ ] Income Page
  - [ ] Expense Page
  - [ ] Add Entry Page/SideBar
- [ ] Styling: _Goal: done by Saturday Feb 20th_
  - [ ] Summary/Overview Page
  - [ ] Income Page
  - [ ] Expense Page
  - [ ] Add Entry Page/SideBar

### Testing

_Goal: done by Sunday Feb 23th_

- [ ] Test all pages, endpoints, situations

### Add Other Features

- [ ] Budget Page
  - [ ] add / edit budget item
  - [ ] change overview/summary to reflect progress vs the budget
- [ ] Schedule monthly payments
- [ ] Icons for categories
- [ ] Animations
- [ ] Component Reusability

---

## Future Implementations

- Login / Multiple users
- Option to upload data
- Trips
- Currency
