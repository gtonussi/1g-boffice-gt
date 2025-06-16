### Stack choice

I wanted to present a very modern stack, with libs that are being heavily used on the last couple of years/months. The approach for styling and quering is based on recent standard practices.

---

#### Routing

NextJS seemed a good choice for this case for a couple of reasons:

- It is already on React documentation as an official bootstrap
- The routing permits ease creation of middlewares, which makes it easy to validate if user is logged in.

#### Query

I have chosen TanStack Query for a simple reason: Scalability.
It is very rare that a project will use just the native fetch API, as it does not contain any caching or mutation feature. Using a lib for caching results of API is wise and may prove worth when application grows and need more data manipulation.

#### Styling

This project was built from scratch with Next which already induces to use Tailwind and is also my best choice. Tailwind has proven one of the best CSS libs ever created and increases the speed of component creation.

The project also uses ShadCN as component library. Shad is a Headless UI with a very modern approach to how components are built. It is very easy to customize since each component is actually built inside the project under the "components/ui" folder.
