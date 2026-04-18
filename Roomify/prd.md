# Product Requirements Document (PRD): Roomify

## 1. Project Overview & Objectives
**Roomify** is a centralized Hotel Management System web application. While the system includes a functional frontend and backend, the primary engineering focus of Roomify is the demonstration of advanced Database Management System (DBMS) concepts. The application is designed to act as a robust interface for a highly normalized, secure, and transactional database architecture.

**Core DBMS Skills Demonstrated:**
* Implementation of a 3rd Normal Form (3NF) relational schema.
* Execution of Server-Side Objects (Triggers, Stored Procedures, Functions).
* Enforcement of Data Integrity (Advanced constraints, ACID-compliant transactions).
* Implementation of Role-Based Access Control (RBAC) at the database layer.

---

## 2. Target Users & Roles (RBAC)
Access control will be managed via application logic but strictly enforced through database-level permissions and views to ensure data isolation.

* **Guest:** * *Capabilities:* View available rooms, manage personal profile, view own booking history.
  * *DB Access:* Limited `SELECT` on `Rooms_View` (masking sensitive data); scoped `CRUD` restricted to their own `guest_id` in `Guests` and `Bookings` tables.
* **Receptionist:** * *Capabilities:* Manage daily operations, process check-ins/check-outs, create walk-in bookings, process payments.
  * *DB Access:* `INSERT`, `UPDATE`, `SELECT` on `Bookings`, `Payments`, and `Guests`. Cannot delete historical records or drop tables.
* **Admin/Manager:** * *Capabilities:* System configuration, staff management, financial oversight, revenue analytics.
  * *DB Access:* Full `CRUD` across all operational tables. Execution privileges for reporting Stored Procedures and access to all `Audit_Views`.

---

## 3. Core Database Architecture (The Schema)
The database is strictly modeled in 3rd Normal Form (3NF) to eliminate data redundancy and prevent update anomalies.

### Entities and Attributes

* **Guests**
  * `guest_id` (INT, Primary Key)
  * `first_name` (VARCHAR)
  * `last_name` (VARCHAR)
  * `email` (VARCHAR, UNIQUE)
  * `phone` (VARCHAR)
  * `password_hash` (VARCHAR)

* **Room_Types**
  * `type_id` (INT, Primary Key)
  * `type_name` (VARCHAR) - e.g., Deluxe, Standard, Suite
  * `base_price` (DECIMAL)
  * `capacity` (INT)

* **Rooms**
  * `room_id` (INT, Primary Key)
  * `room_number` (VARCHAR, UNIQUE)
  * `type_id` (INT, Foreign Key references `Room_Types`)
  * `status` (ENUM: 'Available', 'Occupied', 'Maintenance')

* **Bookings**
  * `booking_id` (INT, Primary Key)
  * `guest_id` (INT, Foreign Key references `Guests`)
  * `room_id` (INT, Foreign Key references `Rooms`)
  * `check_in_date` (DATE)
  * `check_out_date` (DATE)
  * `total_amount` (DECIMAL)
  * `status` (ENUM: 'Pending', 'Confirmed', 'Checked_In', 'Checked_Out', 'Cancelled')

* **Payments**
  * `payment_id` (INT, Primary Key)
  * `booking_id` (INT, Foreign Key references `Bookings`)
  * `amount` (DECIMAL)
  * `payment_method` (VARCHAR)
  * `payment_date` (TIMESTAMP)

* **Staff**
  * `staff_id` (INT, Primary Key)
  * `role_id` (INT, Foreign Key)
  * `first_name` (VARCHAR)
  * `last_name` (VARCHAR)
  * `shift` (VARCHAR)

### Relationships Mapping
* **1:N (One-to-Many):** One `Guest` can have many `Bookings`. One `Room_Type` can describe many `Rooms`. One `Booking` can have many `Payments` (e.g., deposit + final settlement).
* **M:N (Many-to-Many):** Conceptually, `Guests` to `Rooms` is Many-to-Many over time. This is successfully resolved into two 1:N relationships via the junction entity `Bookings`.

---

## 4. Required DBMS Features
Roomify goes beyond simple tables by utilizing the database engine to handle core business logic and maintain strict integrity.

* **Triggers:**
  * `trg_UpdateRoomStatus`: `AFTER INSERT ON Bookings` OR `AFTER UPDATE ON Bookings`. Automatically changes the corresponding `Rooms.status` to 'Occupied' upon check-in, and 'Available' upon check-out or cancellation.
  * `trg_AuditGuestChanges`: `AFTER UPDATE ON Guests`. Logs previous values to a `Guest_Audit` table for security tracking.

* **Constraints:**
  * **UNIQUE:** Applied to `Guests.email` and `Rooms.room_number`.
  * **CHECK:** Applied to `Bookings` to ensure logical chronological order: `CHECK (check_out_date > check_in_date)`.
  * **NOT NULL:** Applied to critical fields like `first_name`, `email`, `room_number`, and `base_price`.

* **Stored Procedures & Functions:**
  * `sp_ProcessBookingTransaction(guest_id, room_id, dates)`: Handles the creation of a booking, validation of room availability, and initial invoice calculation in a single atomic transaction.
  * `fn_CalculateTotalBilling(booking_id)`: A scalar function that computes the final bill by looking up room rates, duration of stay, and subtracting any partial deposits found in the `Payments` table.
  * `sp_GenerateEndOfDayReport(date)`: Aggregates revenue, counts check-ins/check-outs, and returns a summarized dataset for the Admin dashboard.

* **Complex Queries & Views:**
  * `vw_CurrentOccupancy`: A view utilizing `INNER JOIN` across `Rooms`, `Bookings`, and `Guests` to provide a real-time snapshot of currently occupied rooms and the respective guest details.
  * `vw_AvailableRooms`: Utilizing `LEFT JOIN` and subqueries to filter out rooms that have active bookings overlapping with user-specified date ranges.

---

## 5. Application Security & Integrity

* **ACID Properties:** The booking and payment workflows must be wrapped in explicit transaction blocks (`BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`). If a payment fails, the booking status update must roll back to ensure atomicity and consistency.
* **SQL Injection Prevention:** The backend application must strictly use Parameterized Queries (or an ORM utilizing prepared statements) for all database interactions. String concatenation for SQL queries is strictly prohibited.
* **Data Privacy:** Sensitive data, specifically user passwords, must be hashed at the application layer using a modern cryptographic algorithm (e.g., bcrypt or Argon2) before being passed to the `INSERT` or `UPDATE` statements. Plaintext passwords will never touch the database.

---

## 6. Functional Requirements (CRUD Operations)

* **Create (C):** Register new guests, create new room bookings, record payment transactions, add new staff members (Admin).
* **Read (R):** Fetch available rooms based on dates, view guest booking history, generate admin revenue reports, view room details.
* **Update (U):** Modify guest profiles, update booking status (e.g., Pending -> Confirmed -> Checked_In), update room maintenance status.
* **Delete (D):** Cancel bookings (soft delete or status update preferred), remove decommissioned rooms (Admin only).

---

## 7. Tech Stack Assumptions

* **Database:** PostgreSQL or MySQL (Required to support Triggers, SPs, and advanced relational features).
* **Backend:** Lightweight framework (e.g., Node.js with Express, or Python with FastAPI/Flask) acting as a secure API layer.
* **Frontend:** HTML/CSS/Vanilla JS or a lightweight React/Vue setup to interface with the API.
