<p align="center" style="text-align: center;">
  <span style="font-size: 18px;">Welcome to the Back-Office application</span>
</p>

## Stack:

<p>
  This project was created using the following stack:
  <br />
  <samp>
    React v19 - Next v15 - Typescript v5 - Tailwind v4 - ShadCN v2 - TanStack Query v5
    <br /> Check the <a href="./JUSTIFY.md">Justification</a> page for more info on why those libs.
  </samp>
</p>

## How to run it:

Use the following commands on directory root to install and run it:

```bash
npm install

#then

npm run dev
```

If you want to open it using Docker, use the following command:

```bash
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test suites

This project features e2e tests created with Cypress:

```bash
npx cypress open
```

## Folder structure

<p>The project is divided into the following folders:</p>

<p>
<samp>
|-- cypress (Contains all test files)
<br />|-- app (Main directory containing the entrance files for NextJS)
<br />|-- components (React components)
<br />|-- lib (Sources like API, instances of objects and util functions)
<br />|-- types (Typescript types that are shared across application)
<br />|-- hooks (Custom hooks)
</samp>
</p>
