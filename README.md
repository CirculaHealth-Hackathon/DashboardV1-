
# Circula - Blood Supply Dashboard

Circula is a web application designed to help manage and track blood supply data. It provides a platform for hospitals and organizations to input blood supply information, and for users to search for available blood, request it, and manage their orders.

## Features

*   **User Authentication:** Secure sign-up and login functionality.
*   **Splash Screen:** An initial loading screen for a better user experience.
*   **Blood Supply Database:**
    *   View available blood supply data in a tabular format.
    *   Search and filter blood supply by type, location, or hospital.
    *   View detailed information for each blood supply entry.
    *   Link to on-chain transaction details (example for Solana).
*   **Input Data:** A form for authorized users/organizations to input new blood supply data.
*   **Blood Request Workflow:**
    *   Request blood through the Circula platform.
    *   Confirmation of blood request details.
    *   Selection of payment methods.
    *   Order confirmation.
*   **Order Management:**
    *   "My Orders" page to track ongoing and past blood requests.
    *   Detailed view for each order.
    *   Notifications for ongoing orders.
*   **User Wallet:**
    *   View current wallet balance.
    *   Transaction history with date filtering.
    *   Deposit funds into the wallet using various payment methods.
*   **User Profile Management:**
    *   Avatar and username display.
    *   Logout functionality.
*   **Responsive Design:** UI adapts to different screen sizes.
*   **Modern UI/UX:** Built with ShadCN UI components and Tailwind CSS for a clean and professional look.

## Tech Stack

*   **Frontend:**
    *   Next.js (App Router)
    *   React
    *   TypeScript
*   **UI Components:**
    *   ShadCN UI
    *   Lucide React (Icons)
*   **Styling:**
    *   Tailwind CSS
*   **State Management:** React Hooks (`useState`, `useEffect`, `useRouter`, etc.)
*   **Form Handling:** React Hook Form with Zod for validation.
*   **Data Storage (Client-Side):** LocalStorage (for dummy user data and orders)
*   **Generative AI (Placeholder):** Genkit (setup, but no active GenAI features implemented in the current user-visible flows)

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
2.  Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json`) in your browser to see the application.

## Folder Structure (Key Directories)

```
.
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── (auth)/             # Authentication related pages (grouping) - Not currently used for routing
│   │   ├── blood-request-confirmation/
│   │   ├── blood-supply/
│   │   ├── confirm-order/
│   │   ├── deposit-funds/
│   │   ├── input-data/
│   │   ├── login/
│   │   ├── my-orders/
│   │   ├── my-wallet/
│   │   ├── order-details/
│   │   ├── select-payment-method/
│   │   ├── signup/
│   │   ├── globals.css         # Global styles and Tailwind CSS theme
│   │   └── layout.tsx          # Root layout
│   │   └── page.tsx            # Splash screen
│   ├── components/
│   │   ├── auth/               # Authentication-related components (login/signup forms)
│   │   └── ui/                 # ShadCN UI components
│   ├── hooks/                  # Custom React hooks (e.g., useToast)
│   ├── lib/                    # Utility functions, constants
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── ai/                     # Genkit related files (AI flows, instance) - Placeholder for future AI features
│   │   ├── ai-instance.ts
│   │   └── dev.ts
├── public/                     # Static assets
├── .env                        # Environment variables (empty by default)
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Available Pages & Routes

*   `/`: Splash Screen
*   `/signup`: User Sign Up Page
*   `/login`: User Login Page
*   `/blood-supply`: Main dashboard to view available blood supply.
*   `/blood-supply/[bloodCode]`: Details for a specific blood supply entry.
*   `/input-data`: Page to input new blood supply data.
*   `/blood-request-confirmation/[bloodCode]`: Page to confirm details before requesting blood.
*   `/select-payment-method`: Page to choose a payment method for a blood request.
*   `/confirm-order`: Page to review and confirm the final order details.
*   `/my-orders`: Lists all orders placed by the user.
*   `/order-details/[orderId]`: Shows detailed information for a specific order.
*   `/my-wallet`: User's wallet page showing balance and transaction history.
*   `/deposit-funds`: Page to deposit funds into the user's wallet.
*   `/on-chain-tx/[bloodCode]`: Placeholder for on-chain transaction details page (first row links to Solana explorer).

## Dummy User for Testing

*   **Email:** `test@example.com`
*   **Password:** `password123`

This user data is stored in `localStorage` after signup and used for the login flow.

## Future Enhancements (Ideas)

*   Implement backend services for actual data storage and user authentication.
*   Integrate real payment gateways.
*   Develop the AI features using Genkit for tasks like:
    *   Predicting blood demand.
    *   Optimizing delivery routes.
    *   Providing insights from blood supply data.
*   Real-time notifications for order status updates.
*   Admin panel for managing users and data.
*   Full implementation of on-chain transaction tracking.

## Contributing

This is currently a prototyped project. For contributions, please follow standard GitHub flow (fork, branch, pull request) if this project becomes open source.

## License

This project is currently under development. A specific open-source license will be applied if and when the project is publicly released. For now, all rights are reserved.
```
