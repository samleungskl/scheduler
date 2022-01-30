# Interview Scheduler
!["main_page"](https://github.com/samskleung/scheduler/blob/master/docs/main_page.png)
!["form"](https://github.com/samskleung/scheduler/blob/master/docs/form.png)
!["confirm"](https://github.com/samskleung/scheduler/blob/master/docs/confirm.png)

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8000/>.
5. Go to <http://localhost:8000/> in your browser.
6. The website will run, however, it will be empty because there are no data from the API
7. [Install](https://github.com/samskleung/scheduler-api) Scheduler-API and run it on port 8001
8. Once you have Scheduler-API running, you will be able to see and make appointments

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies
- Axios 0.25.0 or above
- Classnames 2.2.6 or above
- Normalize.css: 8.0.1 or above
- React: 16.9.0 or above
- React-dom: 16.9.0 or above
- React-scripts: 3.0.0 or above