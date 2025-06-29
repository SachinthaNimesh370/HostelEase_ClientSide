
# Hostel Ease - Frontend

A React-based frontend application for **Hostel Ease**, a hostel management system designed to streamline administration, room allocation, visitor logs, payments, and complaints management for various roles like Admin, Warden, Student, and Security.

---

## Demo

*(Add your deployed app link or screenshots here)*

---

## Features

- User authentication: Sign In and Sign Up pages
- Role-based dashboards and layouts for Admin, Student, Security, Warden, etc.
- Room management and allocation
- Visitor logs and security management
- Payment tracking and complaint handling
- Responsive UI with Material-UI (MUI)
- Client-side form validation and alerts
- Nested routing using React Router v6

---

## Tech Stack

- React 18
- React Router v6
- Material-UI (MUI) v5
- Axios for HTTP requests
- JavaScript (ES6+)

---

## Installation

1. Clone the repo

```bash
git clone https://github.com/your-username/hostel-ease-frontend.git
cd hostel-ease-frontend
````

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Project Structure

```
src/
 ├── App.jsx                 # Main routing & app structure
 ├── index.jsx               # Entry point with theme provider
 ├── main_pages/             # Pages for SignIn, SignUp, and role-based Drawers
 ├── drawer_pages/           # Nested pages for dashboard, rooms, payments, etc.
 └── component/              # Reusable UI components (e.g., Alert)
```

---

## Usage

* Navigate to `/` for Sign In
* Use `/signup` to create a new user account
* After login, access role-specific dashboards and pages under `/drawer/*`, `/drawerstu/*`, or `/drawersec/*`
* The app communicates with backend API at `http://localhost:8090/api/v1/` (ensure backend is running)

---

## Customization

* Theme is set in `index.jsx` with MUI's `createTheme`. Change typography or palette as needed.
* Add more routes and components under `drawer_pages` and `main_pages` following existing patterns.
* Improve form validation and error handling in SignUp and other forms.

---

## Contributing

Contributions are welcome! Please:

* Fork the repo
* Create your feature branch (`git checkout -b feature/my-feature`)
* Commit your changes (`git commit -m 'Add some feature'`)
* Push to your branch (`git push origin feature/my-feature`)
* Open a Pull Request

---

## Contact

Your Name - \[[Sachintha Nimesh](mailto:sachinthanimesh370@gmail.com)]
Project Link: [https://github.com/SachinthaNimesh370/HostelEase_ClientSide.git](https://github.com/SachinthaNimesh370/HostelEase_ClientSide.git)

---

## Acknowledgments

* [React](https://reactjs.org/)
* [Material-UI](https://mui.com/)
* [React Router](https://reactrouter.com/)
* Backend API (Your backend repo link if any)


