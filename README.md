# React Prisma Typescript Fullstack

### Backend

- [Express](https://www.npmjs.com/package/express)
- [Prisma](https://github.com/prisma/prisma) & [Nexus](https://www.npmjs.com/package/nexus) for generating schemas and resolvers
- [Yup](https://github.com/jquense/yup) for schema validation

### Frontend

- [Create-React-App](https://github.com/facebook/create-react-app)
- [Material-UI v4](https://www.npmjs.com/package/@material-ui/core), [AtomicCSS using Box](https://material-ui.com/components/box/)
- [React-apollo](https://www.npmjs.com/package/react-apollo), [react-apollo-hooks](https://www.npmjs.com/package/react-apollo-hooks)
- [Formik](https://www.npmjs.com/package/formik) for forms
- [Yup](https://github.com/jquense/yup) for form schema validation
- [React-Router](https://reacttraining.com/react-router/web/guides/quick-start) with route authentication verification

### Installation

- `yarn install`
- `cd backend`
- `yarn docker:up`

_in a new terminal / window_

- `yarn prisma:deploy`

#### Prisma version

This project targets **Prisma 1**, pinned to **1.33**:

- the Prisma server runs from the `prismagraphql/prisma:1.33` image (`backend/docker-compose.yml`)
- the Prisma 1 CLI is an exact devDependency of `backend` (`prisma@1.33.0`), so `yarn prisma:deploy` uses the matching CLI instead of whatever global `prisma` happens to be installed
- `prisma-client-lib` is pinned to the same `1.33.0`

Prisma 1 has no `version` key in `prisma.yml`. Keeping the CLI and the server in sync is done through the npm version and the Docker image tag, as described in the [Prisma 1 FAQ](https://v1.prisma.io/docs/1.34/faq/keep-prisma-server-and-cli-in-sync-fq07/). A newer 1.x CLI deploying against the 1.33 server is what produced the deploy errors reported in [issue #7](https://github.com/DylanMerigaud/react-prisma-typescript-fullstack/issues/7).

Prisma 1 reached end of life on September 1st, 2022. [Prisma 1 Cloud was sunset](https://github.com/prisma/prisma1/issues/5187) and [Prisma 1 (Open Source) was deprecated](https://github.com/prisma/prisma1/issues/5208) on that date, and the [prisma1](https://github.com/prisma/prisma1) repository is archived. This repository is a 2019 snapshot rather than a current starting point. The current Prisma ORM is documented at [prisma.io](https://www.prisma.io/docs).

### Usage

- `cd backend`
- `yarn dev`

_in a new terminal / window_

- `cd frontend`
- `yarn start`

### Hosting

- Front is hosted on [Firebase Hosting](https://firebase.google.com/docs/hosting)
- Back is hosted on [Google Cloud App Engine](https://cloud.google.com/appengine/)

### Workspace

- [Yarn Workspace](https://yarnpkg.com/en/docs/workspaces)

### Licence

MIT
