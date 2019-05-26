# React Prisma Typescript Fullstack

- [Yarn Workspace](https://yarnpkg.com/en/docs/workspaces)

### Backend

- [Express](https://www.npmjs.com/package/express)
- [Prisma](https://github.com/prisma/prisma) & [Nexus](https://www.npmjs.com/package/nexus) for generating schemas and resolvers
- [Yup](https://github.com/jquense/yup) for schema validation

### Frontend

- [Create-React-App](https://github.com/facebook/create-react-app)
- [Formik](https://www.npmjs.com/package/formik) for forms
- [Yup](https://github.com/jquense/yup) for form schema validation
- [Material-UI v4](https://www.npmjs.com/package/@material-ui/core), [AtomicCss using Box](https://material-ui.com/components/box/)
- [React-apollo](https://www.npmjs.com/package/react-apollo), [react-apollo-hooks](https://www.npmjs.com/package/react-apollo-hooks)
- Route authentication verification

### Installation

- `yarn install`
- `cd backend`
- `yarn docker:up`

_in a new terminal / window_

- `yarn prisma:deploy`

### Usage

- `cd backend`
- `yarn dev`

_in a new terminal / window_

- `cd frontend`
- `yarn start`

### Hosting

- Front is hosted on [Firebase Hosting](https://firebase.google.com/docs/hosting)
- Back is hosted on [Google Cloud App Engine](https://cloud.google.com/appengine/)

### Licence

MIT
