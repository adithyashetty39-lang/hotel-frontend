# UI/UX Design Document: Roomify (Web Application)

## 1. Project Overview & Design Philosophy
**Roomify** is a rigorous, highly-normalized Hotel Management System (HMS) built on advanced DBMS concepts. However, its frontend completely masks this technical complexity with a sleek, vibrant, and approachable user interface. 

Taking inspiration from the "Grow Smart. Trade Fresh." mobile concept, the Roomify Web Application adapts that fresh, modern, and organic aesthetic into a professional Desktop/SaaS dashboard. This design contrasts the heavy, data-dense reality of hotel management (SQL triggers, ACID transactions) with an airy, intuitive, and visually pleasing user experience.

---

## 2. UI/UX Visual Guidelines (The "Fresh" Aesthetic)
The visual language is designed to feel clean, modern, and data-driven, utilizing the aesthetic principles from the reference UI but applied to a hospitality context.

* **Color Palette:**
    * **Primary:** Vibrant 'Mint/Leaf' Green (`#2ecc71` or `#10B981`) - Used for primary actions (e.g., "Confirm Booking", "Check-In"), active status indicators, and success notifications.
    * **Secondary:** Earthy/Warm accents (soft terracotta or warm wood tones) to represent the hospitality aspect and premium room types.
    * **Backgrounds:** Clean off-white (`#F9FAFB`) to ensure high contrast for data tables, with crisp white (`#FFFFFF`) for elevated card components.
    * **Data Vis:** Cool blues for financial charts (revenue), warm oranges for occupancy alerts.
* **Typography:**
    * Modern, geometric Sans-Serif (e.g., *Inter*, *Outfit*, or *Plus Jakarta Sans*).
    * Emphasis on highly legible tabular numbers for financial and booking data.
* **Component Style:**
    * **Cards & Modals:** Soft, diffuse drop shadows with rounded corners (approx. 12px-16px radius) to maintain a friendly feel.
    * **Imagery:** High-quality imagery of hotel rooms utilizing subtle gradients to overlay clean white text.

---

## 3. Web Layout & Information Architecture
To accommodate the complex CRUD operations and complex queries outlined in the DBMS architecture, Roomify utilizes a widescreen dashboard layout.

### 3.1 Global Navigation (Persistent Left Sidebar)
* **Overview (Dashboard):** Real-time occupancy and revenue snapshots.
* **Front Desk:** Check-in/Check-out operations, daily arrivals/departures.
* **Bookings:** The core M:N relationship manager (Guest -> Room). 
* **Room Directory:** Status grid of all rooms (Available, Occupied, Maintenance).
* **Guests:** CRM view of guest profiles and history.
* **Finance & Reports:** Access to views powered by stored procedures (end-of-day revenue).

### 3.2 Top App Bar
* **Global Search:** Quick lookup for `booking_id`, `guest_id`, or `room_number`.
* **System Alerts (Bell Icon):** Real-time notifications triggered by DB events (e.g., "Room 302 needs maintenance").
* **Role Indicator:** Clear visual badge showing current RBAC level (Guest, Receptionist, Admin).

---

## 4. Key Page Breakdowns

### 4.1 The "Roomify" Dashboard (Admin/Receptionist View)
* **Layout:** Masonry or responsive grid card layout (mirroring the 'Smart Grow' dashboard).
* **Top Section (The "Metrics" Row):** Sparkline charts generated from complex SQL views showing: 
    * *Current Occupancy Rate*
    * *Today's Expected Arrivals/Departures*
    * *Real-time Revenue (Calling the `fn_CalculateTotalBilling` function)*
* **Main Section (Room Status Widget):** A highly visual grid. Instead of plants, these are "Room Cards".
    * Green dot for 'Available', Orange for 'Occupied', Red for 'Maintenance'.
    * Hovering reveals the current guest (pulled via `INNER JOIN`).

### 4.2 The Booking Interface (The "Trade Market" Adaptation)
* **Layout:** E-commerce catalog style for selecting rooms, transitioning into a strict form for data entry.
* **Filters (Left Panel):** Filter by Dates, Room Type (Deluxe, Suite), and Capacity.
* **Room Grid:** * Large imagery of the room.
    * Clear pricing.
    * "Book Now" button that initiates the `sp_ProcessBookingTransaction` stored procedure.

### 4.3 Guest Profile & Audit (Data Table View)
* A clean, paginated data table view taking advantage of the desktop width.
* Allows Receptionists to update guest info, which fires the `trg_AuditGuestChanges` trigger in the background. The UI gracefully handles any `CHECK` or `UNIQUE` constraint violations passed up from the database with friendly toast notifications.

---

## 5. Responsive Behavior (Web to Mobile-Web)
* **Desktop (>1024px):** Expanded sidebar. Complex data tables display all columns.
* **Tablet (768px - 1023px):** Sidebar collapses to icons. Data tables hide secondary columns (like 'phone' or 'payment_method') behind an "expand" toggle.
* **Mobile (<767px):** Sidebar moves to a Hamburger Menu. The UI closely resembles the original Dribbble mobile reference. Data tables convert into stacked vertical cards to maintain readability of database records.

---

## 6. Technical UI Interactivity
* **Micro-interactions:** Smooth transitions when a room status changes from 'Available' to 'Occupied' (reflecting the DB trigger execution). 
* **Empty States:** Friendly, illustrated empty states (e.g., "No arrivals today!" or "No guests found") that match the organic, clean brand identity.
