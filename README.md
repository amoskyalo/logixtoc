# Logixtoc System

This is a migration of the Logixtoc project to:

-   [ ] Typescript
-   [ ] React Query
-   [ ] Next.js
-   [ ] axios
-   [ ] Material UI

### Why the migration?

Initially, the app was built using `React`, `TailwindCSS`, `Material UI`, and `axios` for data fetching, all written in pure `JavaScript`. We are migrating to the latest technologies to improve the developer experience. This new version will also address the responsiveness issues present in the previous version.

In the previous version, we used a package called `NextGenMUI`. While it was useful, it would hinder scalability in the future and pose a challenge for anyone unfamiliar with `NextGenMUI` working on this project. Therefore, we decided to move all datagrid and forms code into the application codebase.

### **Project Architecture Diagram**

#### 1. **Frontend Architecture**

```
┌──────────────────────────────────────────────┐
│                                              │
│                   **App**                    │
│  ┌─────────────────────────────────────────┐ │
│  │                                         │ │
│  │       **Page Components**               │ │
│  │       (e.g., auth, dashboard,           │ │
│  │        finance, suppliers)              │ │
│  │                                         │ │
│  │  - Each folder represents a page or     │ │
│  │    feature-specific component that      │ │
│  │    utilizes reusable UI and hooks.      │ │
│  │                                         │ │
│  └─────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

- The `app` folder contains primary page components organized by business domains (e.g., `dashboard`, `finance`, `suppliers`). Each subfolder is responsible for rendering specific pages or views within the application and organizing related files (`page.tsx`, `layout.tsx`, `loading.tsx`) into isolated units for each feature.

---

#### 2. **Component Library**

```
┌──────────────────────────────────────────────┐
│                                              │
│                 **Components**               │
│  ┌─────────────────────────────────────────┐ │
│  │                                         │ │
│  │       **Reusable Components**           │ │
│  │       (e.g., Buttons, Dialogs,          │ │
│  │        DataGrids, Inputs, etc.)         │ │
│  │                                         │ │
│  │  - These are UI components designed      │ │
│  │    to be reused across multiple pages.   │ │
│  │                                         │ │
│  └─────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

- The `components` folder acts as a UI library, containing reusable UI components like buttons, grids, inputs, dialogs, and navigational elements. Each subfolder groups similar components together, enabling modular and consistent UI development.

---

#### 3. **Data and API Layer**

```
┌──────────────────────────────────────────────┐
│                                              │
│                     **API**                  │
│  ┌─────────────────────────────────────────┐ │
│  │                                         │ │
│  │   **apiClient.ts**                      │ │
│  │   - Configuration for Axios instance,   │ │
│  │     authentication, and request hooks.  │ │
│  │                                         │ │
│  │   **urls.ts**                           │ │
│  │   - Centralized endpoint URLs for the   │ │
│  │     API.                                │ │
│  │                                         │ │
│  │   **types.ts**                          │ │
│  │   - API-specific type definitions.      │ │
│  └─────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

- The `api` folder is dedicated to managing API requests and handling configuration for HTTP requests. The `apiClient.ts` file is the central file for configuring `axios` with custom headers and interceptors, while `urls.ts` centralizes the API endpoints, and `types.ts` provides typings for API responses.

---

#### 4. **UI Model Layer**

```
┌──────────────────────────────────────────────┐
│                                              │
│                **UI Model**                  │
│  ┌─────────────────────────────────────────┐ │
│  │                                         │ │
│  │       **UIModel.tsx**                   │ │
│  │       - Main model for managing CRUD    │ │
│  │         operations and data grids.      │ │
│  │                                         │ │
│  │       **UIConstructor.tsx**             │ │
│  │       - Class or factory functions      │ │
│  │         for constructing UI models.     │ │
│  │                                         │ │
│  │       **types.ts**                      │ │
│  │       - Type definitions for the UI     │ │
│  │         models.                         │ │
│  └─────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

- The `UIModel` folder encapsulates components and classes responsible for managing data grids, forms, and CRUD interactions within the UI. This includes `UIModel.tsx` as the main component for UI data management, and `UIConstructor.tsx` for constructing model instances or configurations. Types are defined within `types.ts` to support these components.

---

#### 5. **State and Context Management**

```
┌──────────────────────────────────────────────┐
│                                              │
│                 **Context**                  │
│  ┌─────────────────────────────────────────┐ │
│  │                                         │ │
│  │       - Contains context providers      │ │
│  │         and hooks for managing global   │ │
│  │         state across components.        │ │
│  │                                         │ │
└──────────────────────────────────────────────┘
```

- The `Context` folder contains files related to React Context and global state management. It provides global state to components where needed, facilitating state-sharing across deeply nested component trees.

---

#### 6. **Custom Hooks**

```
┌──────────────────────────────────────────────┐
│                                              │
│                  **Hooks**                   │
│  ┌─────────────────────────────────────────┐ │
│  │                                         │ │
│  │       - Contains custom hooks like      │ │
│  │         `useFetch` and `useMutate`      │ │
│  │         for handling API calls.         │ │
│  │                                         │ │
└──────────────────────────────────────────────┘
```

- The `hooks` folder centralizes custom hooks.
---

#### 7. **Utilities and Constants**

```
┌──────────────────────────────────────────────┐
│                                              │
│              **Utilities (utils)**           │
│  ┌─────────────────────────────────────────┐ │
│  │                                         │ │
│  │   - Utility functions and helpers,      │ │
│  │     such as formatting functions        │ │
│  │     or common validation.               │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│               **Constants**                  │
│  ┌─────────────────────────────────────────┐ │
│  │                                         │ │
│  │   - Stores constants like colors,       │ │
│  │     countries, routes, and other        │ │
│  │     fixed values.                       │ │
│  └─────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

- The `utils` folder contains utility functions that can be reused across the project, such as formatters, validators, and general-purpose helpers.

### Running the project

To run this project in your local machine, make sure you clone the repository.
After cloning, run the following commands

-   `yarn` | `npm install` to install dependancies.
-   `yarn dev` | `npm run dev` to run the project.

### Contribution

Here is a list of all [issues](https://github.com/amoskyalo/logixtoc/issues)
