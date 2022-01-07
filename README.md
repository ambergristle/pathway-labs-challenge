### Instructions

1. clone repo
2. `cd` into project root
3. run `yarn install`
4. run `yarn start`

### Design

#### App

I chose to use the MUI component and icon libraries as a quick styling solution. While there are some advantages to custom components, libraries like MUI enable the creation of aesthetically-effective UIs at speed. Users' trust and engagement with websites and applications is empirically linked to styling and design, making these important aspects of any application at an early stage. Adjusting to MUI's new (post v5) styling paradigm was pretty easy, and so far I'm pleased with how much cleaner the sx prop is.

I abstracted the layout and features into distinct functions as a step towards scalability. Combining the layout with a router allows for multiple views to be presented within a static "nav context" (i.e., header, footer). The applicants table is one of many potential views, including applicant details and current students. I chose to display the new applicant form as a popup/overlay because its functionality seemed to be a subset of applicant management. There did not seem to be a good reason to unmount the table, only to return to it after an applicant has been added.

In an effort to reduce repetition and compartmentalize distinct components and functionality, I further abstracted these two features into more granular "compositional" components, though with more time I would have done so more aggressively. Compartmentalization is important for code hygiene, legibility, and scalability. Adding sort/filter functions to the table header, or making the table rows interactive, would increase the complexity of these "sub-components" to the point where managing them in a single file would be cumbersome at best. Splitting features into separate files also makes it easier to style them specifically/independently.

I used the `date-fns` library to convert dates to/from UNIX timestamps. My experience with the library has been overwhelming positive. Though it does not support timezones (as `luxon` does), it has a much richer selection of methods, and has a smaller bundle size (no tz data to include). When developing rapidly, I find it best to leverage existing solutions wherever project requirements do not require a custom approach. While this is not always the right choice when moving towards production (it can result in a bloated list of dependencies), it streamlines the prototyping/early development process.

#### ApplicantsTable

Leveraging MUI's table paradigm, I created a table template with dynamic rows and columns. Though column names are currently specified in the file itself, this could be moved to a parent, the env, or the backend, making the component more reusable and allowing the presented columns to be adjusted more easily and/or dynamically.
I passed applicant data as a prop, splitting the fetching functionality from the table's presentational role. I did, however, parse table data in the component itself, a function that should probably be escalated to the parent (or even the request handler).
Initially, I passed applicant data directly into the table. The "status" column value was evaluated by "concatenating" the boolean results of each check (i.e., `appComplete && docsReceived && payReceived`), but approach made it difficult to identify which requirements had not yet been met. I replaced this approach with a reducer function that checks each requirement, and returns both the consolidated "status" and an array of failed checks, if any, allowing me to identify these for the user.
Parsed data is presented literally, or converted to symbols for greater legibility. While I am not entirely satisfied with the design I chose, I am a strong proponent of visualizing data where possible.

#### NewApplicantForm

I chose to manage form values myself, though typically I would consider a form management library. These make it easier to integrate validation, handle field errors, and manage complex form state. They can also be restrictive, fairly prescriptive, and require some setup (creating context, plugging fields into context, etc.), so a custom solution seemed ideal in this case.
In addition to applicant name, I decided to collect their address. Names are split into first and last in the form, ensuring that both are added, and then consolidated on submission to match the provided data shape. Address seemed like a relevant value, and was also an opportunity to explore updating nested state. I planned to also collect age and field/industry of interest, but chose not to due to time constraints.
I opted for React's `useReducer` over `useState` as the former is better suited to updating objects, especially when nested. It was also necessary to write a recursive update function to modify specific nested properties. This approach will not scale well from a memory perspective, but was an effective solution in this context.

### Next Steps

My first two priorities would be to 1) add sort/filter functionality to the applicants table, and 2) to add validation to the form.

1. MUI provides table components that facilitate sorting and filtering interactions, making the addition fairly straightforward, and this feature would greatly improve the table's usability as the number of applicants scales. Identifying "stalled" applications (low progress, high lifetime) or missing payments will become increasingly difficult at scale without this feature, as will locating the data for a specific applicant.
2. The Yup library offers great infrastructure for data validation, especially for handling nested objects; this feature is critical for mitigating user input errors. This is important not only to ensure correct data entry, but also to minimize the likelihood of database errors triggered by the attempted insertion of invalid column values, and to provide some protection against injection attacks.

Lower on the priority list are 3) redesigning the "next step" UI, 4) improving error handling and adding user-facing error alerts, 5) visually indicating a loading state, and 6) adding a system for modifying existing applicant values.

3. While the "status" value reflects the application status as a whole, it does so without indicating which steps remain incomplete, making it difficult to follow up with applicants. While I like the visual approach I chose, as it makes it easier to evaluate applicants' progress at a glance, it is not necessarily clear what each symbol means. It also assumes a linear path through the application (apply > submit docs > pay), which may not accurately reflect the process, and which obscures "downstream" values. I chose to collect and store all missing values, in anticipation of a more complex representation thereof.
4. In its current state, the app only handles data fetching errors, and does little to guard against passing invalid values, or system failures. Errors are merely logged to the console, leaving users without a clear sense of what went wrong and why, creating a frustrating user experience.
5. It is generally advisable to communicate all important state changes to the user. This includes success (which can often, but not always, be implicit) and error messages, but also loading indicators. In a full-stack context, requests to the backend (for existing applicant data or the creation of a new applicant) would require time to complete, during which it is important to confirm to the user that a request is in progress.
6. While some values (e.g., application status) would ideally be updated automatically on submission, it will inevitably be necessary to make manual changes, either to applicant details (e.g., name or address) or to correct system errors (e.g., payment submission failed to trigger webhook).
